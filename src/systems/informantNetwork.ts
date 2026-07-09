import type { CitizenRegistryState, GameState, InformantDoctrineId, InformantNetworkState, InformantOperation, InformantSource, Sector, Stats } from '../types/game';
import { informantDoctrines } from '../data/informantNetwork';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const clampCount = (value: number) => Math.max(0, Math.round(value));

const sourceNames = [
  'CP-ECHO-17', 'RATION-LENS', 'BLUE TICKET', 'CANAL MOTH', 'RAZOR MUTE', 'GLASS WORKER', 'BLOCK WITNESS',
  'NOVA KIN', 'GREEN LEDGER', 'CANTEEN VOW', 'DUST CLERK', 'STATION NIL', 'VORT SHADOW', 'LINE 404',
];
const covers: InformantSource['cover'][] = ['Ration line', 'Factory floor', 'Civil Protection clerk', 'Transit queue', 'Canal contact', 'Nova family', 'Medical quarantine'];
const motivations: InformantSource['motivation'][] = ['Rations', 'Fear', 'Revenge', 'Privilege', 'Coercion', 'Double agent', 'Family protection'];

function weightedSector(sectors: Sector[], index: number) {
  const sorted = [...sectors].sort((a, b) => (b.rebel + b.fear + (100 - b.loyalty)) - (a.rebel + a.fear + (100 - a.loyalty)));
  return sorted[index % Math.max(1, sorted.length)] ?? sectors[0];
}

function makeSource(index: number, sectors: Sector[], registry?: CitizenRegistryState): InformantSource {
  const sector = weightedSector(sectors, index);
  const citizen = registry?.records.filter((record) => record.status === 'informant' || record.status === 'collaborator' || record.antiCitizenRisk > 45)[index % Math.max(1, registry.records.length)];
  const motivation = motivations[(index + sector.name.length) % motivations.length];
  const reliability = clamp(42 + sector.surveillance * 0.22 + (citizen?.reliability ?? 44) * 0.28 - sector.rebel * 0.12 + index % 9);
  const falseReportTendency = clamp(18 + sector.fear * 0.25 + (100 - sector.loyalty) * 0.2 - reliability * 0.12);
  const lambdaExposure = clamp(sector.rebel + (sector.zone === 'Souterrain' ? 18 : 0) + (motivation === 'Double agent' ? 25 : 0));
  return {
    id: `inf-${String(index + 1).padStart(3, '0')}`,
    citizenId: citizen?.id,
    codename: sourceNames[index % sourceNames.length],
    sectorId: sector.id,
    cover: covers[(index + sector.id.length) % covers.length],
    motivation,
    reliability,
    risk: clamp(lambdaExposure * 0.55 + falseReportTendency * 0.32),
    lambdaExposure,
    falseReportTendency,
    compromised: motivation === 'Double agent' || lambdaExposure > 78,
    lastReport: sector.rebel > 55
      ? `Contact Lambda observé près de ${sector.name}.`
      : sector.xen > 48
        ? `Rumeur sanitaire utilisée par une cellule anti-citoyenne dans ${sector.name}.`
        : `Signalement de non-conformité mineure dans ${sector.name}.`,
  };
}

export function createInitialInformantNetwork({ sectors, registry, profile }: { sectors: Sector[]; registry?: CitizenRegistryState; profile?: string }): InformantNetworkState {
  const baseCount = profile === 'tyrant' ? 32 : profile === 'sympathizer' ? 14 : 24;
  const sources = Array.from({ length: 10 }, (_, index) => makeSource(index, sectors, registry));
  const totalInformants = baseCount + sources.length;
  const reliabilityIndex = clamp(sources.reduce((acc, source) => acc + source.reliability, 0) / sources.length);
  const falseReportIndex = clamp(sources.reduce((acc, source) => acc + source.falseReportTendency, 0) / sources.length);
  const compromisedSources = sources.filter((source) => source.compromised).length;
  return {
    activeDoctrine: profile === 'sympathizer' ? 'silent_files' : profile === 'tyrant' ? 'terror_denunciation' : 'ration_bounty',
    totalInformants,
    reliabilityIndex,
    falseReportIndex,
    lambdaPenetration: clamp(18 + sources.filter((source) => source.lambdaExposure > 55).length * 4),
    compromisedSources,
    exposedCells: 0,
    backlashIndex: clamp(falseReportIndex * 0.45 + compromisedSources * 5),
    rationBountySpend: totalInformants * 3,
    dailyReports: 0,
    usefulReports: 0,
    falseReports: 0,
    sources,
    log: ['Réseau de délation CP initialisé : coupons, peur, privilèges et dossiers familiaux corrélés.'],
  };
}

export function migrateInformantNetwork(game: Partial<GameState>): InformantNetworkState {
  if (game.informantNetwork?.sources?.length) return game.informantNetwork;
  return createInitialInformantNetwork({ sectors: game.sectors ?? [], registry: game.citizenRegistry, profile: game.profile });
}

export function setInformantDoctrine(state: InformantNetworkState, doctrineId: InformantDoctrineId): { informantNetwork: InformantNetworkState; statsDelta: Partial<Stats>; lines: string[] } {
  const doctrine = informantDoctrines.find((item) => item.id === doctrineId) ?? informantDoctrines[0];
  const next: InformantNetworkState = {
    ...state,
    activeDoctrine: doctrine.id,
    totalInformants: clampCount(state.totalInformants + doctrine.recruitmentBias * 0.2),
    reliabilityIndex: clamp(state.reliabilityIndex + doctrine.reliabilityBias * 0.35),
    falseReportIndex: clamp(state.falseReportIndex + doctrine.falseReportBias * 0.45),
    backlashIndex: clamp(state.backlashIndex + doctrine.backlashRisk * 0.25),
    log: [`Doctrine informateurs : ${doctrine.name}. ${doctrine.publicLine}`, ...state.log].slice(0, 40),
  };
  return { informantNetwork: next, statsDelta: doctrine.effects, lines: [`Doctrine réseau de délation basculée : ${doctrine.name}.`, doctrine.description] };
}

export function resolveInformantOperation({ state, operation, sectors, registry, stats, day }: { state: InformantNetworkState; operation: InformantOperation; sectors: Sector[]; registry: CitizenRegistryState; stats: Stats; day: number }): { informantNetwork: InformantNetworkState; statsDelta: Partial<Stats>; lines: string[] } {
  const e = operation.networkEffects;
  let sources = state.sources.map((source) => ({ ...source }));
  if (operation.id === 'recruit_from_registry' || operation.id === 'public_reward_case') {
    const start = sources.length;
    const amount = operation.id === 'recruit_from_registry' ? 3 : 2;
    sources = [...sources, ...Array.from({ length: amount }, (_, index) => makeSource(start + index + day, sectors, registry))];
  }
  if (operation.id === 'validate_sources' || operation.id === 'purge_false_denunciations') {
    sources = sources
      .map((source) => ({ ...source, reliability: clamp(source.reliability + 8), falseReportTendency: clamp(source.falseReportTendency - 10), compromised: source.compromised && source.reliability < 42 }))
      .filter((source, index) => operation.id !== 'purge_false_denunciations' || index % 5 !== 0 || source.falseReportTendency < 60);
  }
  if (operation.id === 'bait_lambda' || operation.id === 'turn_lambda_courier') {
    sources = sources.map((source, index) => index % 3 === 0 ? { ...source, lambdaExposure: clamp(source.lambdaExposure + 14), risk: clamp(source.risk + 10), lastReport: 'Rumeur Lambda exploitée comme filature contrôlée.' } : source);
  }
  if (operation.id === 'protect_informant_families') {
    sources = sources.map((source) => ({ ...source, risk: clamp(source.risk - 8), reliability: clamp(source.reliability + 5) }));
  }
  if (operation.id === 'nova_pressure_source') {
    sources = sources.map((source, index) => index % 4 === 0 ? { ...source, reliability: clamp(source.reliability - 6), falseReportTendency: clamp(source.falseReportTendency + 12), risk: clamp(source.risk + 9) } : source);
  }

  const riskSpike = operation.risk > 25 && ((day * 17 + operation.id.length + stats.rebel) % 100) < operation.risk;
  const next: InformantNetworkState = {
    ...state,
    sources,
    totalInformants: clampCount(state.totalInformants + (e.informantsDelta ?? 0)),
    reliabilityIndex: clamp(state.reliabilityIndex + (e.reliabilityDelta ?? 0)),
    falseReportIndex: clamp(state.falseReportIndex + (e.falseReportsDelta ?? 0)),
    lambdaPenetration: clamp(state.lambdaPenetration + (e.penetrationDelta ?? 0)),
    compromisedSources: clampCount(state.compromisedSources + (e.compromisedDelta ?? 0) + (riskSpike ? 1 : 0)),
    exposedCells: clampCount(state.exposedCells + (e.exposedCellsDelta ?? 0)),
    backlashIndex: clamp(state.backlashIndex + (e.backlashDelta ?? 0) + (riskSpike ? 7 : 0)),
    rationBountySpend: clampCount(state.rationBountySpend + Math.max(0, operation.cost)),
    log: [operation.logLine, ...(riskSpike ? ['Contre-filature Lambda probable : une source peut être compromise.'] : []), ...state.log].slice(0, 40),
  };
  return { informantNetwork: next, statsDelta: operation.effects, lines: [operation.logLine, ...(riskSpike ? ['Alerte COAN : probabilité de trahison ou de filature Lambda.'] : [])] };
}

export function simulateInformantDay({ state, sectors, stats, day }: { state: InformantNetworkState; sectors: Sector[]; stats: Stats; day: number }): { informantNetwork: InformantNetworkState; statsDelta: Partial<Stats>; lines: string[] } {
  const doctrine = informantDoctrines.find((item) => item.id === state.activeDoctrine) ?? informantDoctrines[0];
  const pressure = clamp(stats.fear * 0.22 + (100 - stats.loyalty) * 0.18 + stats.rebel * 0.25 + doctrine.recruitmentBias);
  const newReports = clampCount(state.totalInformants * (0.18 + pressure / 420));
  const falseReports = clampCount(newReports * (state.falseReportIndex + doctrine.falseReportBias) / 100);
  const usefulReports = Math.max(0, newReports - falseReports - Math.round(state.compromisedSources * 0.4));
  const exposedCells = usefulReports > 18 ? Math.floor(usefulReports / 18) : 0;
  const compromisedDrift = stats.rebel > 65 ? 1 : state.lambdaPenetration > 60 && day % 3 === 0 ? 1 : 0;
  const backlash = clamp(state.backlashIndex + falseReports * 0.3 + doctrine.backlashRisk * 0.12 - state.reliabilityIndex * 0.05);
  const nextSources = state.sources.map((source, index) => {
    const sector = sectors.find((s) => s.id === source.sectorId);
    const heat = sector ? sector.rebel * 0.1 + sector.fear * 0.05 - sector.surveillance * 0.04 : 0;
    return {
      ...source,
      reliability: clamp(source.reliability + doctrine.reliabilityBias * 0.05 - source.falseReportTendency * 0.02),
      lambdaExposure: clamp(source.lambdaExposure + heat + (index % 5 === day % 5 ? 2 : 0)),
      risk: clamp(source.risk + heat * 0.5),
      compromised: source.compromised || source.lambdaExposure > 92 || (source.risk > 86 && index % 4 === day % 4),
      lastReport: source.compromised
        ? 'Rapport peut-être manipulé par contre-renseignement Lambda.'
        : source.lambdaExposure > 70
          ? 'Contact indirect avec une file Lambda probable.'
          : source.lastReport,
    };
  });
  const compromisedSources = clampCount(nextSources.filter((source) => source.compromised).length + compromisedDrift);
  const next: InformantNetworkState = {
    ...state,
    sources: nextSources,
    totalInformants: clampCount(state.totalInformants + Math.round(doctrine.recruitmentBias * 0.12) + (stats.rations < 900 ? 2 : 0)),
    reliabilityIndex: clamp((state.reliabilityIndex * 0.72) + (nextSources.reduce((a, s) => a + s.reliability, 0) / Math.max(1, nextSources.length)) * 0.28 + doctrine.reliabilityBias * 0.08),
    falseReportIndex: clamp((state.falseReportIndex * 0.76) + falseReports * 0.9 + doctrine.falseReportBias * 0.18),
    lambdaPenetration: clamp(state.lambdaPenetration + exposedCells * 2 + doctrine.recruitmentBias * 0.04 - compromisedSources * 0.2),
    compromisedSources,
    exposedCells: clampCount(state.exposedCells + exposedCells),
    backlashIndex: backlash,
    rationBountySpend: clampCount(state.rationBountySpend + Math.round(state.totalInformants * 1.4)),
    dailyReports: newReports,
    usefulReports,
    falseReports,
    log: [
      `Cycle informateurs : ${newReports} rapports, ${usefulReports} exploitables, ${falseReports} faux ou opportunistes.`,
      ...(exposedCells ? [`${exposedCells} cellule(s) Lambda exposée(s) par recoupement CP/COAN.`] : []),
      ...(compromisedDrift ? ['Une source présente des signes de retournement Lambda.'] : []),
      ...state.log,
    ].slice(0, 40),
  };
  const statsDelta: Partial<Stats> = {
    info: Math.round(usefulReports / 7),
    rebel: -Math.round(exposedCells * 2 + usefulReports / 30),
    loyalty: -Math.round(falseReports / 11 + doctrine.backlashRisk / 22),
    fear: Math.round(newReports / 18 + doctrine.recruitmentBias / 12),
    fatigue: Math.round(falseReports / 14),
    rations: -Math.round(state.totalInformants * 1.4),
    suspicion: doctrine.id === 'silent_files' || doctrine.id === 'lambda_double' ? 2 : 0,
  };
  const lines = [
    `Réseau délation : ${newReports} dénonciations, ${usefulReports} utiles, ${falseReports} fausses/opportunistes.`,
    `Pénétration Lambda : ${next.lambdaPenetration}% / sources compromises : ${next.compromisedSources}.`,
    `Backlash social de la délation : ${next.backlashIndex}%.`,
  ];
  return { informantNetwork: next, statsDelta, lines };
}
