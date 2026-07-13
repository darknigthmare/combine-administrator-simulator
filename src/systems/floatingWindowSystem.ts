import type { FloatingWindowContent, FloatingWindowMetric, FloatingWindowPresetId, GameState, Sector, TabId } from '../types/game';
import { combineTechnologyNodes, floatingWindowPresets, majorStoryEventDefinitions, xenLayerDefinitions } from '../data';
import { buildDynamicBreencast } from './dynamicBreencast';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

function preset(id: FloatingWindowPresetId) {
  return floatingWindowPresets.find((item) => item.id === id) ?? floatingWindowPresets[0];
}

function sectorName(game: GameState, id: string) {
  return game.sectors.find((sector) => sector.id === id)?.name ?? id;
}

function criticalSector(game: GameState, preferredId?: string): Sector {
  const preferred = game.sectors.find((sector) => sector.id === preferredId);
  if (preferred) return preferred;
  return [...game.sectors].sort((a, b) => (b.rebel + b.xen + b.fear + (100 - b.infrastructure)) - (a.rebel + a.xen + a.fear + (100 - a.infrastructure)))[0] ?? game.sectors[0];
}

function metric(label: string, value: string | number, danger = false, xen = false): FloatingWindowMetric {
  return { label, value, danger, xen };
}

function classify(severity: number) {
  if (severity >= 5) return 'OVERRIDE / ADVISOR VISIBLE';
  if (severity >= 4) return 'CLASSIFIÉ / CITYWIDE RISK';
  if (severity >= 3) return 'RESTRICTED / COAN';
  if (severity >= 2) return 'ADMINISTRATIF';
  return 'CIVIL OVERSIGHT';
}

function severityFrom(...values: number[]): 0 | 1 | 2 | 3 | 4 | 5 {
  const score = Math.max(0, ...values);
  return clamp(Math.ceil(score / 20), 0, 5) as 0 | 1 | 2 | 3 | 4 | 5;
}

function contentBase(game: GameState, id: FloatingWindowPresetId, severity: 0 | 1 | 2 | 3 | 4 | 5, title: string, subtitle: string, metrics: FloatingWindowMetric[], lines: string[], footer: string, tab?: TabId, tags?: string[]): FloatingWindowContent {
  const p = preset(id);
  return {
    presetId: id,
    title,
    subtitle,
    classification: classify(severity),
    severity,
    accent: p.accent,
    relatedTab: tab ?? p.defaultTab,
    metrics,
    lines,
    tags: tags?.length ? tags : p.loreTags,
    footer: footer || `City ${game.city} / jour ${String(game.day).padStart(3, '0')} / fenêtre COAN.`
  };
}

export function buildFloatingWindowContent(game: GameState, id: FloatingWindowPresetId, selectedSectorId?: string): FloatingWindowContent {
  if (id === 'sector_dossier') {
    const sector = criticalSector(game, selectedSectorId);
    const routeCount = sector.connections.length;
    const worstRoute = [...sector.connections].sort((a, b) => b.risk - a.risk)[0];
    const severity = severityFrom(sector.rebel, sector.xen, sector.fear, 100 - sector.infrastructure);
    return contentBase(game, id, severity, `SECTEUR // ${sector.name}`, `${sector.role} — ${sector.status}`, [
      metric('Population', sector.population),
      metric('Lambda', `${sector.rebel}%`, sector.rebel > 60),
      metric('Xen', `${sector.xen}%`, sector.xen > 50, true),
      metric('Surveillance', `${sector.surveillance}%`),
      metric('Infrastructure', `${sector.infrastructure}%`, sector.infrastructure < 35),
      metric('Routes', routeCount),
    ], [
      `Zone : ${sector.zone}. Valeur stratégique ${sector.strategicValue}/100${sector.chokePoint ? ' — goulot de contrôle.' : '.'}`,
      `Loyauté locale ${sector.loyalty}%, peur ${sector.fear}%.`,
      worstRoute ? `Route la plus vulnérable : ${worstRoute.label} vers ${sectorName(game, worstRoute.to)} / ${worstRoute.type} / risque ${worstRoute.risk}% / contrôle ${worstRoute.controlledBy}.` : 'Aucune connexion de route renseignée.',
      sector.notes,
    ], 'Double-clic administratif recommandé : cartographier routes, unités et contamination avant escalade.', 'sectors');
  }

  if (id === 'citizen_file') {
    const record = [...game.citizenRegistry.records]
      .sort((a, b) => (b.antiCitizenRisk + b.xenExposure + (b.novaProspektFlag ? 35 : 0)) - (a.antiCitizenRisk + a.xenExposure + (a.novaProspektFlag ? 35 : 0)))[0];
    const severity = record ? severityFrom(record.antiCitizenRisk, record.xenExposure, record.novaProspektFlag ? 90 : 0) : 1;
    return contentBase(game, id, severity, record ? `CITIZEN FILE // ${record.id}` : 'CITIZEN FILE // registre vide', record ? `${record.name} — ${sectorName(game, record.sectorId)}` : 'Aucun dossier représentatif', record ? [
      metric('Loyauté', `${record.loyaltyScore}%`, record.loyaltyScore < 25),
      metric('Peur', `${record.fearScore}%`, record.fearScore > 70),
      metric('Anti-citizen', `${record.antiCitizenRisk}%`, record.antiCitizenRisk > 55),
      metric('Fiabilité', `${record.reliability}%`, record.reliability < 35),
      metric('Xen', `${record.xenExposure}%`, record.xenExposure > 40, true),
      metric('Nova flag', record.novaProspektFlag ? 'OUI' : 'NON', record.novaProspektFlag),
    ] : [], record ? [
      `Statut : ${record.status}. Ration : ${record.rationStatus}. Travail : ${record.workAssignment}.`,
      `Dernier contrôle CP : ${record.lastCpCheck}.`,
      `Marqueurs : ${record.markers.join(', ') || 'aucun'}.`,
      `Notes COAN : ${record.notes}`,
    ] : ['Le registre représentatif n’a pas encore généré de dossier.'], 'Le registre civil doit rester contradictoire : plus un dossier semble propre, plus la Résistance peut s’y cacher.', 'citizens');
  }

  if (id === 'directive_file') {
    const d = game.directive;
    const tree = game.citadelDirectiveTree;
    const severity = severityFrom(100 - game.stats.citadel, tree.advisorAttention, tree.branchPressure, game.auditHeat);
    return contentBase(game, id, severity, `DIRECTIVE // ${d.title}`, `${game.directiveDays} jours restants — branche ${tree.activeBranch}`, [
      metric('Citadelle', `${game.stats.citadel}%`, game.stats.citadel < 40),
      metric('Attention Advisor', `${tree.advisorAttention}%`, tree.advisorAttention > 65),
      metric('Pression branche', `${tree.branchPressure}%`, tree.branchPressure > 65),
      metric('Protocoles', tree.completedNodes.length),
      metric('Audit', `${game.auditHeat}%`, game.auditHeat > 65),
    ], [
      d.body,
      `Mandat quotidien : ${tree.dailyMandate}`,
      `Capacités débloquées : ${tree.unlockedCapabilities.slice(0, 5).join(', ') || 'aucune capacité persistante'}.`,
      `Défaillance probable : remplacement administratif ou supervision Advisor directe.`
    ], 'La Citadelle ne demande pas la vérité : elle demande des chiffres qui survivent à l’audit.', 'citadel');
  }

  if (id === 'breencast_signal') {
    const b = buildDynamicBreencast(game);
    const severity = severityFrom(b.recommended.severity, game.stats.fatigue, game.stats.rebel, game.stats.xen);
    return contentBase(game, id, severity, `BREENCAST // ${b.recommended.title}`, `Crise dominante : ${b.dominantCrisis}`, [
      metric('Sévérité', `${b.recommended.severity}%`, b.recommended.severity > 65),
      metric('Info control', `${game.stats.info}%`),
      metric('Fatigue', `${game.stats.fatigue}%`, game.stats.fatigue > 65),
      metric('Loyauté', `${game.stats.loyalty}%`, game.stats.loyalty < 35),
    ], [
      `PUBLIC : ${b.recommended.publicLine}`,
      `INTENTION : ${b.recommended.hiddenIntent}`,
      ...b.diagnosis.slice(0, 3),
    ], 'Transmission utilisable immédiatement, mais toute propagande trop visible augmente la valeur narrative Lambda.', 'propaganda', b.recommended.loreTags);
  }

  if (id === 'nova_transfer') {
    const nova = game.novaProspekt;
    const zone = [...nova.zones].sort((a, b) => (b.instability + (100 - b.secrecy)) - (a.instability + (100 - a.secrecy)))[0];
    const severity = severityFrom(nova.instability, 100 - nova.secrecy, nova.xenBreachRisk, Math.min(100, nova.escaped * 12), game.auditHeat);
    return contentBase(game, id, severity, 'NOVA PROSPEKT // INTAKE DOSSIER', `${nova.activePolicy} — ${zone?.name ?? 'facility grid'}`, [
      metric('Transferts', nova.totalTransferred),
      metric('Instabilité', `${nova.instability}%`, nova.instability > 60),
      metric('Secret', `${nova.secrecy}%`, nova.secrecy < 45),
      metric('Évasion', `${Math.min(100, nova.escaped * 12)}%`, Math.min(100, nova.escaped * 12) > 45),
      metric('Risque Xen', `${nova.xenBreachRisk}%`, nova.xenBreachRisk > 45, true),
      metric('Biotics', `${nova.bioticsPressure}%`, nova.bioticsPressure > 60),
    ], [
      `Zone critique : ${zone?.name ?? 'non renseignée'} — ${zone?.function ?? 'aucun usage affiché'}.`,
      `Manifeste Razor : ${nova.authority}% / contradiction publique ${100 - nova.secrecy}%.`,
      `Dossiers sensibles : ${nova.convertedCandidates}. Évadés : ${nova.escaped}.`,
      nova.log[0] ?? 'Aucun incident Nova Prospekt récent.',
    ], 'Nova Prospekt doit être géré comme un lieu différent : froid, clinique, classifié, et toujours proche du scandale.', 'nova');
  }

  if (id === 'xen_biohazard') {
    const layer = [...game.xenEcosystem.layers].sort((a, b) => (b.biomass + b.activity + b.spread + b.mutationPressure) - (a.biomass + a.activity + a.spread + a.mutationPressure))[0];
    const layerDef = layer ? xenLayerDefinitions[layer.layerId] : undefined;
    const q = [...game.quarantineZones.zones].sort((a, b) => (b.exposure + b.civilianTrapped + b.ravenholmMemory) - (a.exposure + a.civilianTrapped + a.ravenholmMemory))[0];
    const severity = severityFrom(game.stats.xen, game.xenMutation.outbreakRisk, game.quarantineZones.ravenholmMemoryIndex, game.xenCatastrophes.totalCatastropheRisk);
    return contentBase(game, id, severity, `XEN BIOHAZARD // ${layerDef?.name ?? 'biosphère inconnue'}`, `${layer ? sectorName(game, layer.sectorId) : 'aucun secteur'} — ${layer?.stage ?? 'trace'}`, [
      metric('Biomasse', `${layer?.biomass ?? 0}%`, (layer?.biomass ?? 0) > 60, true),
      metric('Mutation', `${game.xenMutation.outbreakRisk}%`, game.xenMutation.outbreakRisk > 60, true),
      metric('Containment', `${game.xenEcosystem.containmentIndex}%`, game.xenEcosystem.containmentIndex < 40, true),
      metric('Ravenholm', `${game.quarantineZones.ravenholmMemoryIndex}%`, game.quarantineZones.ravenholmMemoryIndex > 55, true),
      metric('Catastrophe', `${game.xenCatastrophes.totalCatastropheRisk}%`, game.xenCatastrophes.totalCatastropheRisk > 55, true),
    ], [
      `Couche : ${layerDef?.description ?? 'aucune couche dominante détectée.'}`,
      `Zone quarantaine la plus lourde : ${q ? `${sectorName(game, q.sectorId)} / ${q.stage} / ${q.civilianTrapped} civils piégés` : 'aucune'}.`,
      `Dernier outbreak : ${game.xenEcosystem.lastOutbreak}`,
      `Dernière chaîne : ${game.xenMutation.lastChainEvent}`,
    ], 'Xen doit être lu comme une biosphère : les chiffres bas peuvent cacher une chaîne biologique prête à basculer.', 'xen');
  }

  if (id === 'lambda_cell') {
    const cell = [...game.resistanceNetwork.cells].sort((a, b) => (b.heat + b.weapons + b.radioReach + (b.discovered ? 25 : 0)) - (a.heat + a.weapons + a.radioReach + (a.discovered ? 25 : 0)))[0];
    const severity = cell ? severityFrom(cell.heat, cell.weapons, cell.radioReach, game.resistanceNetwork.simultaneousOpsRisk) : 1;
    return contentBase(game, id, severity, cell ? `LAMBDA CELL // ${cell.name}` : 'LAMBDA CELL // réseau non cartographié', cell ? `${cell.leaderAlias} — ${sectorName(game, cell.sectorId)} — ${cell.stage}` : 'aucune cellule indexée', cell ? [
      metric('Secret', `${cell.secrecy}%`, cell.secrecy > 70),
      metric('Heat', `${cell.heat}%`, cell.heat > 60),
      metric('Armes', `${cell.weapons}%`, cell.weapons > 55),
      metric('Radio', `${cell.radioReach}%`, cell.radioReach > 55),
      metric('Vortigaunts', `${cell.vortigauntSupport}%`, cell.vortigauntSupport > 50, true),
      metric('Découverte', cell.discovered ? 'OUI' : 'NON', !cell.discovered),
    ] : [], cell ? [
      `Opération probable : ${cell.nextOperation}.`,
      `Tunnels ${cell.tunnelAccess}% / ravitaillement ${cell.supplies}% / moral ${cell.morale}%.`,
      `Notes : ${cell.notes}`,
      `Réseau global : cohésion ${game.resistanceNetwork.networkCohesion}% / risque ops simultanées ${game.resistanceNetwork.simultaneousOpsRisk}%.`,
    ] : ['Aucune cellule chargée dans le réseau Lambda.'], 'La Résistance gagne quand elle reste un réseau, pas quand elle devient une cible unique.', 'resistance');
  }

  if (id === 'unit_roster') {
    const unit = [...game.units].sort((a, b) => b.reserve - a.reserve || a.name.localeCompare(b.name))[0];
    const severity = severityFrom(100 - game.stats.combine, game.stats.rebel, game.stats.xen);
    return contentBase(game, id, severity, unit ? `UNIT ROSTER // ${unit.name}` : 'UNIT ROSTER // réserve vide', unit ? `${unit.category} — réserve ${unit.reserve}` : 'aucune unité disponible', unit ? [
      metric('Réserve', unit.reserve, unit.reserve < 2),
      metric('Présence Combine', `${game.stats.combine}%`, game.stats.combine < 35),
      metric('Rébellion', `${game.stats.rebel}%`, game.stats.rebel > 65),
      metric('Xen', `${game.stats.xen}%`, game.stats.xen > 65, true),
    ] : [], unit ? [
      `Rôle : ${unit.description}`,
      `Force : ${unit.strength}`,
      `Faiblesse : ${unit.weakness}`,
      `Lore : ${unit.lore}`,
    ] : ['Les réserves Combine sont épuisées ou non initialisées.'], 'Une unité lourde stabilise le rapport, pas forcément la ville.', 'combine');
  }

  if (id === 'report_compare') {
    const report = game.reports[0];
    const severity = severityFrom(report?.falsificationScore ?? 0, report?.auditRisk ?? 0, game.auditHeat, game.stats.suspicion);
    return contentBase(game, id, severity, 'RAPPORT COAN // RÉEL VS TRANSMIS', `Politique : ${game.reportPolicy}`, [
      metric('Falsification', `${report?.falsificationScore ?? 0}%`, (report?.falsificationScore ?? 0) > 55),
      metric('Audit risk', `${report?.auditRisk ?? 0}%`, (report?.auditRisk ?? 0) > 55),
      metric('Audit heat', `${game.auditHeat}%`, game.auditHeat > 60),
      metric('Suspicion', `${game.stats.suspicion}%`, game.stats.suspicion > 60),
    ], report ? [
      `Réel : stabilité ${report.stats.stability}% / Lambda ${report.stats.rebel}% / Xen ${report.stats.xen}% / pertes civiles ${report.stats.civilianLosses}.`,
      `Transmis : stabilité ${(report.transmittedStats ?? report.stats).stability}% / anti-citoyen ${(report.transmittedStats ?? report.stats).rebel}% / bio ${(report.transmittedStats ?? report.stats).xen}% / pertes ${(report.transmittedStats ?? report.stats).civilianLosses}.`,
      report.auditTriggered ? `Audit : ${report.auditDiscovered ? 'FALSIFICATION DÉTECTÉE' : 'audit absorbé'}.` : 'Aucun audit déclenché sur ce rapport.',
      ...(report.auditLines ?? []).slice(0, 2),
    ] : ['Aucun rapport journalier disponible. Clôturer une journée pour générer un dossier.'], 'Les mensonges utiles sont ceux qui restent compatibles avec les capteurs Citadel.', 'reports');
  }

  if (id === 'ration_ledger') {
    const ledger = [...game.rationEconomy.ledgers].sort((a, b) => (b.hunger + b.blackMarket + b.hoarding) - (a.hunger + a.blackMarket + a.hoarding))[0];
    const severity = severityFrom(game.rationEconomy.hungerIndex, game.rationEconomy.blackMarketIndex, game.stats.rations < 400 ? 90 : 0);
    return contentBase(game, id, severity, 'RATION LEDGER // DISTRIBUTION', `${game.rationEconomy.activePolicy} — autonomie ${game.rationEconomy.autonomyDays} j`, [
      metric('Réserves', game.rationEconomy.reserves, game.rationEconomy.reserves < 500),
      metric('Besoin/jour', game.rationEconomy.dailyNeed),
      metric('Alloué/jour', game.rationEconomy.dailyAllocated, game.rationEconomy.dailyAllocated < game.rationEconomy.dailyNeed),
      metric('Faim', `${game.rationEconomy.hungerIndex}%`, game.rationEconomy.hungerIndex > 60),
      metric('Marché noir', `${game.rationEconomy.blackMarketIndex}%`, game.rationEconomy.blackMarketIndex > 55),
    ], [
      ledger ? `Secteur critique : ${sectorName(game, ledger.sectorId)} / faim ${ledger.hunger}% / marché noir ${ledger.blackMarket}% / fuite ${ledger.hoarding}%.` : 'Aucun ledger de secteur disponible.',
      `Déficit quotidien : ${game.rationEconomy.dailyDeficit}. Informateurs alimentés : ${game.rationEconomy.informantIndex}%.`,
      game.rationEconomy.log[0] ?? 'Aucun incident alimentaire récent.',
    ], 'Le rationnement Combine est à la fois nourriture, arme sociale et monnaie de délation.', 'rationing');
  }

  if (id === 'major_event_file') {
    const runtime = [...game.majorStoryEvents.events].sort((a, b) => (b.heat + b.publicAwareness + b.advisorAttention) - (a.heat + a.publicAwareness + a.advisorAttention))[0];
    const def = runtime ? majorStoryEventDefinitions[runtime.eventId] : undefined;
    const severity = runtime ? severityFrom(runtime.heat, runtime.publicAwareness, runtime.advisorAttention, runtime.xenInstability) : 1;
    return contentBase(game, id, severity, def ? `MAJOR EVENT // ${def.title}` : 'MAJOR EVENT // aucun arc', runtime ? `${runtime.stage} — ${sectorName(game, runtime.sectorId)}` : 'aucun événement majeur indexé', runtime ? [
      metric('Heat', `${runtime.heat}%`, runtime.heat > 60),
      metric('Containment', `${runtime.containment}%`, runtime.containment < 45),
      metric('Public', `${runtime.publicAwareness}%`, runtime.publicAwareness > 60),
      metric('Advisor', `${runtime.advisorAttention}%`, runtime.advisorAttention > 60),
      metric('Lambda opp.', `${runtime.lambdaOpportunity}%`, runtime.lambdaOpportunity > 60),
      metric('Xen instab.', `${runtime.xenInstability}%`, runtime.xenInstability > 60, true),
    ] : [], runtime && def ? [
      def.description,
      `Signes : ${def.warningSigns.slice(0, 3).join(' / ')}.`,
      `Payoff narratif : ${def.narrativePayoff}`,
      runtime.lastReport,
    ] : ['Aucun événement majeur actuellement suivi.'], 'Les événements majeurs transforment une gestion de jauges en crise historique de City.', 'major_events');
  }

  if (id === 'objective_tracker') {
    const objective = [...game.campaignMission.objectives].filter((item) => item.discovered && item.status === 'active').sort((a, b) => b.progress - a.progress)[0]
      ?? [...game.campaignMission.objectives].filter((item) => item.discovered).sort((a, b) => b.progress - a.progress)[0];
    const severity = severityFrom(game.campaignMission.failureRisk, 100 - game.campaignMission.mandateScore, game.campaign.pressure);
    return contentBase(game, id, severity, objective ? `OBJECTIF // ${objective.title}` : 'OBJECTIF // mandat général', objective ? `${objective.kind} — ${objective.status}` : getCampaignLine(game), [
      metric('Mandat', `${game.campaignMission.mandateScore}%`, game.campaignMission.mandateScore < 45),
      metric('Risque échec', `${game.campaignMission.failureRisk}%`, game.campaignMission.failureRisk > 60),
      metric('Objectifs faits', game.campaignMission.completedCount),
      metric('Objectifs ratés', game.campaignMission.failedCount, game.campaignMission.failedCount > 0),
      metric('Pression', `${game.campaign.pressure}%`, game.campaign.pressure > 60),
    ], objective ? [
      objective.description,
      `Progression : ${objective.progress}% / valeur ${objective.value} / cible ${objective.mode} ${objective.target}.`,
      objective.deadlineDay ? `Échéance : jour ${objective.deadlineDay}.` : 'Pas d’échéance stricte.',
      objective.detail,
    ] : [game.campaign.currentMandate, game.campaign.currentBriefing], 'Un mandat Combine échoué se transforme en dossier de remplacement administratif.', 'campaigns');
  }

  if (id === 'vortigaunt_biotic') {
    const group = [...game.vortigaunts.groups].sort((a, b) => (b.escapeRisk + b.vortessenceSignal + b.resistanceLink) - (a.escapeRisk + a.vortessenceSignal + a.resistanceLink))[0];
    const severity = severityFrom(game.vortigaunts.escapeRisk, game.vortigaunts.advisorInterest, game.vortigaunts.resistanceSympathy, game.vortigaunts.bioticPressure);
    return contentBase(game, id, severity, group ? `BIOTIC FILE // ${group.name}` : 'BIOTIC FILE // cohorte inconnue', group ? `${group.status} — ${sectorName(game, group.location)}` : 'aucune cohorte', group ? [
      metric('Captifs', game.vortigaunts.totalCaptive),
      metric('Libres', game.vortigaunts.totalFree, game.vortigaunts.totalFree > 10),
      metric('Vortessence', `${game.vortigaunts.vortessenceCoherence}%`, game.vortigaunts.vortessenceCoherence > 70, true),
      metric('Aide quarantaine', `${game.vortigaunts.quarantineAid}%`, false, true),
      metric('Évasion', `${game.vortigaunts.escapeRisk}%`, game.vortigaunts.escapeRisk > 55),
      metric('Advisor', `${game.vortigaunts.advisorInterest}%`, game.vortigaunts.advisorInterest > 60),
    ] : [], group ? [
      `Effectif ${group.count} / contrôle ${group.coercion}% / risque ${group.escapeRisk}%.`,
      `Usage : ${group.notes}.`,
      `Vision COAN : ${game.vortigaunts.lastVision}`,
      game.vortigaunts.log[0] ?? 'Aucune note Biotic récente.',
    ] : ['Aucun groupe Vortigaunt/Biotic disponible.'], 'Les Vortigaunts sont à la fois ressource anti-Xen, lien Lambda et preuve vivante d’un contrôle fragile.', 'vortigaunts');
  }

  if (id === 'cp_precinct') {
    const post = [...game.civilProtection.posts].sort((a, b) => (b.brutality + b.corruption + b.lambdaInfluence + b.abuseReports) - (a.brutality + a.corruption + a.lambdaInfluence + a.abuseReports))[0];
    const severity = post ? severityFrom(post.brutality, post.corruption, post.lambdaInfluence, game.civilProtection.abuseReportIndex) : 1;
    return contentBase(game, id, severity, post ? `CP PRECINCT // ${post.name}` : 'CP PRECINCT // aucun poste', post ? `${sectorName(game, post.sectorId)} — ${post.officers} officiers` : 'réseau CP indisponible', post ? [
      metric('Discipline', `${post.discipline}%`, post.discipline < 35),
      metric('Brutalité', `${post.brutality}%`, post.brutality > 65),
      metric('Corruption', `${post.corruption}%`, post.corruption > 55),
      metric('Lambda', `${post.lambdaInfluence}%`, post.lambdaInfluence > 45),
      metric('Abus', post.abuseReports, post.abuseReports > 10),
      metric('Agents compromis', post.compromisedOfficers, post.compromisedOfficers > 0),
    ] : [], post ? [
      `Fuite de rations ${post.rationLeakage}% / fausses charges ${post.falseCharges}.`,
      `Arrestations jour : ${post.arrestsToday}. Rations saisies : ${post.seizedRations}.`,
      `Dernier incident : ${post.lastIncident}`,
      `Doctrine CP : ${game.civilProtection.activeDoctrine}.`,
    ] : ['Aucun poste Civil Protection disponible.'], 'Civil Protection peut maintenir l’ordre ou fabriquer elle-même la prochaine cellule Lambda.', 'civil_protection');
  }

  if (id === 'tech_protocol') {
    const active = new Set(game.combineTechnology.researchedNodes);
    const node = combineTechnologyNodes.find((item) => !active.has(item.id) && item.prerequisites.every((pre) => active.has(pre)))
      ?? combineTechnologyNodes.find((item) => active.has(item.id))
      ?? combineTechnologyNodes[0];
    const severity = severityFrom(game.combineTechnology.techSuspicion, game.combineTechnology.maintenanceDebt, 100 - game.combineTechnology.scanEfficiency);
    return contentBase(game, id, severity, node ? `TECH PROTOCOL // ${node.title}` : 'TECH PROTOCOL // arbre vide', node ? `${node.branchId} — tier ${node.tier} — coût ${node.cost}` : 'aucun protocole', node ? [
      metric('Budget R&D', game.combineTechnology.researchBudget, game.combineTechnology.researchBudget < node.cost),
      metric('Maintenance', `${game.combineTechnology.maintenanceDebt}%`, game.combineTechnology.maintenanceDebt > 60),
      metric('Scan eff.', `${game.combineTechnology.scanEfficiency}%`),
      metric('Grid contain.', `${game.combineTechnology.containmentGrid}%`),
      metric('Suspicion tech', `${game.combineTechnology.techSuspicion}%`, game.combineTechnology.techSuspicion > 60),
    ] : [], node ? [
      node.body,
      `Débloque : ${node.unlocks.join(', ') || 'aucune capacité textuelle'}.`,
      `Prérequis : ${node.prerequisites.join(', ') || 'aucun'}.`,
      game.combineTechnology.log[0] ?? 'Aucun log R&D récent.',
    ] : ['Aucune technologie disponible.'], 'La technologie Combine augmente le contrôle, mais aussi la dette de maintenance et la visibilité Advisor.', 'technology');
  }

  if (id === 'chronicle_extract') {
    const chronicle = game.finalChronicle;
    const severity = severityFrom(game.stats.rebel, game.stats.xen, game.auditHeat, game.quarantineZones.ravenholmMemoryIndex);
    return contentBase(game, id, chronicle ? 5 : severity, chronicle ? `CHRONICLE // ${chronicle.title}` : 'CHRONICLE // pré-archive COAN', chronicle ? chronicle.subtitle : `City ${game.city} / pas de verdict final`, [
      metric('Jour', game.day),
      metric('Pertes civiles', game.stats.civilianLosses, game.stats.civilianLosses > 800),
      metric('Lambda', `${game.stats.rebel}%`, game.stats.rebel > 60),
      metric('Xen', `${game.stats.xen}%`, game.stats.xen > 60, true),
      metric('Audit', `${game.auditHeat}%`, game.auditHeat > 60),
      metric('Ravenholm-like', game.quarantineZones.ravenholmLikeCount, game.quarantineZones.ravenholmLikeCount > 0, true),
    ], chronicle ? [
      chronicle.openingStatement,
      chronicle.publicArchive,
      chronicle.restrictedArchive,
      `Signature : ${chronicle.finalSignature}`,
    ] : [
      `Pré-archive : ${getCampaignLine(game)}.`,
      `Si City tombe maintenant, COAN retiendra surtout : Lambda ${game.stats.rebel}%, Xen ${game.stats.xen}%, suspicion ${game.stats.suspicion}%.`,
      `Dernier log : ${game.log[0] ?? 'aucun log enregistré'}`,
    ], 'L’archive finale est écrite avant la fin : chaque rapport falsifié devient une future contradiction.', 'chronicle');
  }

  return contentBase(game, id, 1, preset(id).label, preset(id).description, [], ['Fenêtre non implémentée.'], 'Aucun contenu COAN.', preset(id).defaultTab);
}

function getCampaignLine(game: GameState) {
  return `${game.campaign.currentMandate || 'Mandat libre'} — jour ${game.campaign.dayInCampaign}/${game.campaign.durationDays}`;
}

export function buildFloatingWindowLauncher(game: GameState, selectedSectorId?: string): FloatingWindowContent[] {
  return floatingWindowPresets
    .map((item) => buildFloatingWindowContent(game, item.id, selectedSectorId))
    .sort((a, b) => b.severity - a.severity || preset(b.presetId).priority - preset(a.presetId).priority)
    .slice(0, 16);
}

export function getFloatingWindowPreset(id: FloatingWindowPresetId) {
  return preset(id);
}
