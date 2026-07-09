import type { CitizenAction, CitizenRecord, CitizenRegistryState, CitizenRiskMarker, CitizenStatus, GameState, PopulationState, Sector, Stats } from '../types/game';
import { representativeCitizenTemplates, seedCitizenNames } from '../data/citizenRegistry';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

function statAverage(records: CitizenRecord[], key: 'antiCitizenRisk' | 'loyaltyScore' | 'fearScore') {
  if (!records.length) return 0;
  return clamp(records.reduce((sum, record) => sum + record[key], 0) / records.length);
}

function summarize(records: CitizenRecord[], previous?: Partial<CitizenRegistryState>): CitizenRegistryState {
  const total = records.length;
  const count = (status: CitizenStatus) => records.filter((record) => record.status === status).length;
  const falseDenunciationIndex = clamp(
    records.filter((record) => record.markers.includes('false_denunciation_risk')).length * 4 +
    records.filter((record) => record.status === 'informant' && record.reliability < 45).length * 7,
  );
  return {
    records,
    selectedId: previous?.selectedId && records.some((record) => record.id === previous.selectedId) ? previous.selectedId : records[0]?.id ?? null,
    total,
    compliantCount: count('compliant') + count('collaborator'),
    suspectCount: count('suspect'),
    informantCount: count('informant'),
    lambdaCount: count('lambda_sympathizer'),
    xenExposedCount: count('xen_exposed'),
    novaFlaggedCount: records.filter((record) => record.novaProspektFlag).length,
    transferredCount: count('transferred'),
    averageRisk: statAverage(records, 'antiCitizenRisk'),
    averageLoyalty: statAverage(records, 'loyaltyScore'),
    averageFear: statAverage(records, 'fearScore'),
    falseDenunciationIndex,
    lastGeneratedDay: previous?.lastGeneratedDay ?? 1,
    log: previous?.log ?? ['Registre civil représentatif initialisé : dossiers COAN indexés par secteur.'],
  };
}

function markerUnique(markers: CitizenRiskMarker[], add: CitizenRiskMarker[] = []) {
  return Array.from(new Set([...markers, ...add]));
}

function statusFromSector(sector: Sector, index: number): CitizenStatus {
  if (sector.xen > 65 && index % 3 === 0) return 'xen_exposed';
  if (sector.rebel > 68 && index % 2 === 0) return 'lambda_sympathizer';
  if (sector.rebel > 45 && index % 3 === 0) return 'suspect';
  if (sector.surveillance > 72 && index % 4 === 0) return 'informant';
  if (sector.loyalty > 62 && index % 5 === 0) return 'collaborator';
  if (sector.loyalty > 55) return 'compliant';
  return 'neutral';
}

function markersFor(sector: Sector, status: CitizenStatus, index: number): CitizenRiskMarker[] {
  const markers: CitizenRiskMarker[] = [];
  if (sector.rebel > 35) markers.push('radio_contact');
  if (['canals', 'sewers', 'hospital'].includes(sector.id)) markers.push('tunnel_proximity');
  if (sector.fear > 65 || sector.status === 'Scellé' || sector.status === 'Bombardé') markers.push('family_disappeared');
  if (sector.xen > 30 || status === 'xen_exposed') markers.push('xen_contact');
  if (sector.role.toLowerCase().includes('industri') || sector.id === 'factory') markers.push('industrial_access');
  if (status === 'informant' && index % 2 === 0) markers.push('false_denunciation_risk');
  if (status === 'lambda_sympathizer' && index % 4 === 0) markers.push('cp_abuse_witness');
  return markerUnique(markers);
}

function buildCitizen(sector: Sector, index: number, day = 1): CitizenRecord {
  const template = representativeCitizenTemplates[index % representativeCitizenTemplates.length];
  const status = index < representativeCitizenTemplates.length ? (template.status ?? statusFromSector(sector, index)) : statusFromSector(sector, index);
  const id = `C${sector.id.toUpperCase().slice(0, 3)}-${String(index + 1).padStart(4, '0')}`;
  const markers = markerUnique(markersFor(sector, status, index), template.markers ?? []);
  const riskBase = sector.rebel * 0.45 + sector.xen * 0.25 + (100 - sector.loyalty) * 0.2 + markers.length * 6;
  const xenExposure = status === 'xen_exposed' ? Math.max(45, sector.xen + 20) : sector.xen + (markers.includes('xen_contact') ? 20 : 0);
  return {
    id,
    name: template.name ?? seedCitizenNames[(index + sector.id.length) % seedCitizenNames.length],
    sectorId: sector.id,
    status,
    ageBand: (['18-25', '26-40', '41-60', '60+'] as const)[(index + sector.id.length) % 4],
    workAssignment: sector.role.toLowerCase().includes('industri') ? 'Chaîne industrielle' : sector.zone === 'Citadelle' ? 'Logistique Citadel' : sector.zone === 'Souterrain' ? 'Maintenance conduite' : 'Bloc résidentiel / service civique',
    rationStatus: template.rationStatus ?? (status === 'informant' ? 'Bonus informateur' : status === 'xen_exposed' ? 'Quarantaine' : status === 'suspect' || status === 'lambda_sympathizer' ? 'Restreint' : sector.loyalty > 62 ? 'Prioritaire' : 'Standard'),
    loyaltyScore: clamp(template.loyaltyScore ?? sector.loyalty + (status === 'collaborator' ? 22 : status === 'lambda_sympathizer' ? -25 : status === 'informant' ? -5 : 0)),
    fearScore: clamp(template.fearScore ?? sector.fear + (status === 'xen_exposed' ? 20 : status === 'informant' ? 12 : 0)),
    antiCitizenRisk: clamp(riskBase + (status === 'lambda_sympathizer' ? 25 : status === 'suspect' ? 16 : status === 'informant' ? 8 : status === 'collaborator' ? -20 : 0)),
    reliability: clamp(status === 'informant' ? 55 - (markers.includes('false_denunciation_risk') ? 18 : 0) + index * 2 : 42 + sector.loyalty * 0.2 - sector.fear * 0.1),
    familyLinks: [`${sector.name} / unité familiale ${((index + 3) % 9) + 1}`, index % 5 === 0 ? 'Lien avec disparu non confirmé' : 'Aucun lien prioritaire'],
    lastCpCheck: `Jour ${String(Math.max(1, day - ((index * 3) % 8))).padStart(3, '0')} — contrôle ${sector.surveillance > 65 ? 'complet' : 'visuel'}`,
    novaProspektFlag: markers.includes('nova_transfer_flag') || status === 'transferred',
    xenExposure: clamp(xenExposure),
    markers,
    notes: status === 'lambda_sympathizer' ? 'Surveiller radios, tunnels et contacts familiaux.' : status === 'xen_exposed' ? 'Observation sanitaire ou transfert recommandé.' : status === 'informant' ? 'Source utile mais fiabilité dépendante des rations.' : 'Dossier représentatif du bloc.',
    history: [`Jour ${String(day).padStart(3, '0')} — dossier indexé dans le registre civil.`],
  };
}

export function createInitialCitizenRegistry({ sectors, population }: { sectors: Sector[]; population?: PopulationState }): CitizenRegistryState {
  const records: CitizenRecord[] = [];
  sectors.forEach((sector) => {
    const sectorPop = population?.sectors.find((item) => item.sectorId === sector.id);
    const density = sectorPop ? Math.min(10, Math.max(4, Math.round(sectorPop.total / 900))) : 6;
    for (let index = 0; index < density; index += 1) records.push(buildCitizen(sector, index));
  });
  return summarize(records);
}

export function migrateCitizenRegistry(game: Partial<GameState>): CitizenRegistryState {
  if (game.citizenRegistry?.records?.length) return summarize(game.citizenRegistry.records, game.citizenRegistry);
  return createInitialCitizenRegistry({ sectors: game.sectors ?? [], population: game.population });
}

export function simulateCitizenRegistryDay({ registry, sectors, stats, day }: { registry: CitizenRegistryState; sectors: Sector[]; stats: Stats; day: number }) {
  const lines: string[] = [];
  let riskRise = 0;
  let newNovaFlags = 0;
  const records = registry.records.map((record, index) => {
    if (record.status === 'transferred' || record.status === 'deceased') return record;
    const sector = sectors.find((item) => item.id === record.sectorId);
    if (!sector) return record;
    let status = record.status;
    let antiCitizenRisk = clamp(record.antiCitizenRisk + Math.round((sector.rebel - 45) * 0.04 + (100 - sector.loyalty) * 0.03 + (sector.fear - 60) * 0.02));
    let loyaltyScore = clamp(record.loyaltyScore + Math.round((sector.loyalty - 50) * 0.03 - stats.fatigue * 0.015));
    let fearScore = clamp(record.fearScore + Math.round((sector.fear - 50) * 0.04 + stats.suspicion * 0.02));
    let xenExposure = clamp(record.xenExposure + (sector.xen > 55 ? 2 : sector.xen > 30 ? 1 : -1));
    let markers = [...record.markers];
    let novaProspektFlag = record.novaProspektFlag;
    const history = [...record.history];

    if (sector.rebel > 70 && antiCitizenRisk > 68 && status === 'neutral') {
      status = 'suspect';
      history.unshift(`Jour ${String(day).padStart(3, '0')} — bascule suspect après activité Lambda locale.`);
      riskRise += 1;
    }
    if (antiCitizenRisk > 82 && loyaltyScore < 28 && status === 'suspect') {
      status = 'lambda_sympathizer';
      markers = markerUnique(markers, ['radio_contact']);
      history.unshift(`Jour ${String(day).padStart(3, '0')} — sympathie Lambda probable.`);
      riskRise += 1;
    }
    if (xenExposure > 62 && status !== 'xen_exposed') {
      status = 'xen_exposed';
      markers = markerUnique(markers, ['xen_contact']);
      history.unshift(`Jour ${String(day).padStart(3, '0')} — marqueur exposition Xen ajouté.`);
    }
    if (antiCitizenRisk > 88 && !novaProspektFlag && (index + day) % 5 === 0) {
      novaProspektFlag = true;
      markers = markerUnique(markers, ['nova_transfer_flag']);
      history.unshift(`Jour ${String(day).padStart(3, '0')} — flag Nova Prospekt automatique.`);
      newNovaFlags += 1;
    }
    if (status === 'informant' && record.reliability < 38 && (index + day) % 4 === 0) {
      markers = markerUnique(markers, ['false_denunciation_risk']);
      fearScore = clamp(fearScore + 4);
    }

    return {
      ...record,
      status,
      antiCitizenRisk,
      loyaltyScore,
      fearScore,
      xenExposure,
      markers,
      novaProspektFlag,
      lastCpCheck: sector.surveillance > 75 ? `Jour ${String(day).padStart(3, '0')} — contrôle complet CP` : record.lastCpCheck,
      history: history.slice(0, 10),
    };
  });
  const next = summarize(records, { ...registry, lastGeneratedDay: day, log: registry.log });
  if (riskRise) lines.push(`Registre civil : ${riskRise} dossiers ont basculé vers suspect/Lambda.`);
  if (newNovaFlags) lines.push(`Registre civil : ${newNovaFlags} nouveaux flags Nova Prospekt générés.`);
  if (next.xenExposedCount > registry.xenExposedCount) lines.push(`Registre civil : exposition Xen accrue sur ${next.xenExposedCount - registry.xenExposedCount} dossiers.`);
  const statsDelta: Partial<Stats> = {
    rebel: Math.round((next.lambdaCount / Math.max(1, next.total)) * 6),
    info: Math.round((next.informantCount / Math.max(1, next.total)) * 5),
    suspicion: newNovaFlags > 0 ? Math.min(4, newNovaFlags) : 0,
  };
  return {
    citizenRegistry: { ...next, log: [...lines, ...registry.log].slice(0, 35) },
    lines,
    statsDelta,
  };
}

export function resolveCitizenAction({ registry, action, recordId, day }: { registry: CitizenRegistryState; action: CitizenAction; recordId: string; day: number }) {
  let affected: CitizenRecord | undefined;
  const records = registry.records.map((record) => {
    if (record.id !== recordId) return record;
    affected = record;
    const effects = action.registryEffects;
    return {
      ...record,
      status: effects.newStatus ?? record.status,
      antiCitizenRisk: clamp(record.antiCitizenRisk + (effects.riskDelta ?? 0)),
      loyaltyScore: clamp(record.loyaltyScore + (effects.loyaltyDelta ?? 0)),
      fearScore: clamp(record.fearScore + (effects.fearDelta ?? 0)),
      reliability: clamp(record.reliability + (effects.reliabilityDelta ?? 0)),
      xenExposure: clamp(record.xenExposure + (effects.xenDelta ?? 0)),
      rationStatus: effects.rationDelta && effects.rationDelta > 0 ? 'Bonus informateur' : record.rationStatus,
      novaProspektFlag: effects.novaFlag ?? record.novaProspektFlag,
      markers: markerUnique(record.markers, effects.addMarkers),
      lastCpCheck: action.id.includes('cp') ? `Jour ${String(day).padStart(3, '0')} — contrôle complet CP` : record.lastCpCheck,
      history: [`Jour ${String(day).padStart(3, '0')} — ${action.logLine}`, ...record.history].slice(0, 10),
    };
  });
  const next = summarize(records, { ...registry, selectedId: recordId, log: registry.log });
  const label = affected ? `${affected.id} / ${affected.name}` : recordId;
  return {
    citizenRegistry: { ...next, log: [`${label} — ${action.logLine}`, ...registry.log].slice(0, 35) },
    statsDelta: action.effects,
    lines: [`${label} — ${action.name}.`, action.logLine],
  };
}

export function selectHighRiskCitizens(registry: CitizenRegistryState, limit = 8) {
  return [...registry.records]
    .filter((record) => record.status !== 'transferred' && record.status !== 'deceased')
    .sort((a, b) => (b.antiCitizenRisk + b.xenExposure + (b.novaProspektFlag ? 20 : 0)) - (a.antiCitizenRisk + a.xenExposure + (a.novaProspektFlag ? 20 : 0)))
    .slice(0, limit);
}
