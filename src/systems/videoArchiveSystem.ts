import { videoArchiveFeeds, videoArchivePolicies, videoArchiveFeedOrder } from '../data/videoArchives';
import type { GameState, NovaProspektState, Sector, Stats, VideoArchiveFeedId, VideoArchiveFeedRuntime, VideoArchiveOperation, VideoArchivePolicyId, VideoArchiveState } from '../types/game';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const avg = (values: number[]) => values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0;
const safe = (value: unknown, fallback = 0) => typeof value === 'number' && Number.isFinite(value) ? value : fallback;
const add = (value: number, delta = 0) => clamp(value + delta);

function pickSector(preferred: string[], sectors: Sector[], fallbackIndex = 0): string {
  const preferredMatch = preferred.map((id) => sectors.find((sector) => sector.id === id)).find(Boolean);
  if (preferredMatch) return preferredMatch.id;
  return sectors[fallbackIndex % Math.max(1, sectors.length)]?.id ?? 'admin';
}

function basePolicy(profile?: GameState['profile'], scenario?: GameState['scenario']): VideoArchivePolicyId {
  if (profile === 'sympathizer') return 'sympathizer_archive_leak';
  if (scenario === 'post_nova') return 'nova_blackout';
  if (scenario === 'quarantine') return 'xen_biofeed_priority';
  if (scenario === 'uprising') return 'lambda_signal_trap';
  return 'passive_monitoring';
}

function categoryPressure(feed: VideoArchiveFeedRuntime, game: Partial<GameState>, sector?: Sector): number {
  const def = videoArchiveFeeds[feed.feedId];
  const stats = game.stats ?? { stability: 50, loyalty: 50, fear: 50, rebel: 20, xen: 20, combine: 50, production: 50, rations: 2500, citadel: 50, info: 50, fatigue: 35, civilianLosses: 0, combineLosses: 0, suspicion: 0 };
  const sectorRisk = sector ? sector.rebel * 0.24 + sector.xen * 0.24 + sector.fear * 0.16 + (100 - sector.infrastructure) * 0.16 + (100 - sector.surveillance) * 0.12 : 20;
  switch (def.category) {
    case 'residential':
      return clamp(sectorRisk + stats.fatigue * 0.18 + (game.rationEconomy?.blackMarketIndex ?? 0) * 0.22 + (game.population?.lambdaSupportIndex ?? 0) * 0.2);
    case 'civil_protection':
      return clamp(sectorRisk + (game.civilProtection?.brutalityIndex ?? 0) * 0.34 + (game.civilProtection?.corruptionIndex ?? 0) * 0.2 + stats.fear * 0.12);
    case 'transport':
      return clamp(sectorRisk + (game.novaProspekt?.instability ?? 0) * 0.18 + (game.majorStoryEvents?.citywideHeat ?? 0) * 0.16 + stats.rebel * 0.18 + stats.xen * 0.1);
    case 'nova':
      return clamp((game.novaProspekt?.instability ?? 0) * 0.45 + (game.novaProspekt?.bioticsPressure ?? 0) * 0.22 + (game.resistanceFactions?.novaMartyrdom ?? 0) * 0.18 + stats.suspicion * 0.12);
    case 'xen':
      return clamp(sectorRisk + stats.xen * 0.3 + (game.xenEcosystem?.networkSpread ?? 0) * 0.18 + (game.xenMutation?.outbreakRisk ?? 0) * 0.18 + (game.quarantineZones?.publicContradictionRisk ?? 0) * 0.12);
    case 'citadel':
      return clamp((100 - stats.citadel) * 0.24 + stats.suspicion * 0.35 + (game.auditHeat ?? 0) * 0.18 + (game.combineTechnology?.maintenanceDebt ?? 0) * 0.14);
    case 'resistance':
      return clamp(sectorRisk + stats.rebel * 0.3 + (game.resistanceNetwork?.radioFreedom ?? 0) * 0.24 + (game.resistanceNetwork?.simultaneousOpsRisk ?? 0) * 0.16);
    case 'industrial':
      return clamp(sectorRisk + (100 - stats.production) * 0.24 + (game.xenResearch?.labIncidentRisk ?? 0) * 0.15 + (game.rationEconomy?.hungerIndex ?? 0) * 0.12);
    case 'vortigaunt':
      return clamp((game.vortigaunts?.vortessenceCoherence ?? 0) * 0.28 + (game.vortigaunts?.escapeRisk ?? 0) * 0.22 + stats.xen * 0.16 + stats.rebel * 0.16);
    default:
      return sectorRisk;
  }
}

function createFeed(feedId: VideoArchiveFeedId, sectors: Sector[], game: Partial<GameState>, index: number): VideoArchiveFeedRuntime {
  const def = videoArchiveFeeds[feedId];
  const sectorId = pickSector(def.preferredSectors, sectors, index);
  const sector = sectors.find((item) => item.id === sectorId);
  const pressure = categoryPressure({
    id: `feed-${feedId}`,
    feedId,
    sectorId,
    integrity: 70,
    corruption: def.baseCorruption,
    publicExposure: 12,
    evidenceValue: def.baseSensitivity,
    lambdaNoise: 0,
    xenNoise: 0,
    citadelScrutiny: 0,
    archivedClips: 0,
    recording: false,
    locked: false,
    discovered: true,
    lastFrame: 'initialisation',
  }, game, sector);
  const categoryNoise = def.category === 'xen' ? { xenNoise: 26 } : def.category === 'resistance' ? { lambdaNoise: 26 } : def.category === 'vortigaunt' ? { xenNoise: 16, lambdaNoise: 12 } : {};
  return {
    id: `feed-${feedId}`,
    feedId,
    sectorId,
    integrity: clamp(82 - def.baseCorruption * 0.35 - pressure * 0.12),
    corruption: clamp(def.baseCorruption + pressure * 0.18),
    publicExposure: clamp(8 + def.baseSensitivity * 0.12 + pressure * 0.16),
    evidenceValue: clamp(def.baseSensitivity + pressure * 0.2),
    lambdaNoise: clamp((categoryNoise.lambdaNoise ?? 0) + safe(game.stats?.rebel, 0) * (def.category === 'resistance' ? 0.24 : 0.04)),
    xenNoise: clamp((categoryNoise.xenNoise ?? 0) + safe(game.stats?.xen, 0) * (def.category === 'xen' ? 0.24 : 0.04)),
    citadelScrutiny: clamp(def.category === 'citadel' || def.category === 'nova' ? 24 + safe(game.stats?.suspicion, 0) * 0.18 : safe(game.stats?.suspicion, 0) * 0.06),
    archivedClips: 0,
    recording: pressure > 55,
    locked: false,
    discovered: true,
    lastFrame: `${def.sourceCode} // ${def.visualSignature}`,
  };
}

function summarize(activePolicy: VideoArchivePolicyId, feeds: VideoArchiveFeedRuntime[], log: string[], previous?: Partial<VideoArchiveState>, lastClip?: string): VideoArchiveState {
  const signalIntegrity = clamp(avg(feeds.map((feed) => feed.integrity)) - avg(feeds.map((feed) => feed.corruption)) * 0.18);
  const archiveCorruption = clamp(avg(feeds.map((feed) => feed.corruption)) + feeds.filter((feed) => feed.locked).length * 2);
  const evidenceBacklog = clamp(avg(feeds.map((feed) => feed.evidenceValue)) + feeds.reduce((sum, feed) => sum + Math.min(6, feed.archivedClips), 0));
  const publicLeakRisk = clamp(avg(feeds.map((feed) => feed.publicExposure)) + avg(feeds.map((feed) => feed.lambdaNoise)) * 0.22 + archiveCorruption * 0.12);
  const advisorEvidenceDemand = clamp(avg(feeds.map((feed) => feed.citadelScrutiny)) + evidenceBacklog * 0.18 + (previous?.advisorEvidenceDemand ?? 0) * 0.05);
  const lambdaSignalIntrusion = clamp(avg(feeds.map((feed) => feed.lambdaNoise)) + publicLeakRisk * 0.1);
  const xenVisualNoise = clamp(avg(feeds.map((feed) => feed.xenNoise)) + archiveCorruption * 0.08);
  const novaBlackoutLevel = clamp(avg(feeds.filter((feed) => videoArchiveFeeds[feed.feedId].category === 'nova' || feed.feedId === 'razor_intake_04').map((feed) => feed.corruption + (feed.locked ? 18 : 0))) || 0);
  return {
    activePolicy,
    feeds,
    signalIntegrity,
    archiveCorruption,
    evidenceBacklog,
    publicLeakRisk,
    advisorEvidenceDemand,
    lambdaSignalIntrusion,
    xenVisualNoise,
    novaBlackoutLevel,
    archivedClipsTotal: feeds.reduce((sum, feed) => sum + feed.archivedClips, 0),
    lastClip: lastClip ?? previous?.lastClip ?? 'Aucun clip critique exporté.',
    log: log.slice(0, 24),
  };
}

export function createInitialVideoArchiveState(game: Partial<GameState> & { sectors: Sector[] }): VideoArchiveState {
  const activePolicy = basePolicy(game.profile, game.scenario);
  const feeds = videoArchiveFeedOrder.map((feedId, index) => createFeed(feedId, game.sectors, game, index));
  return summarize(activePolicy, feeds, [
    `VIDEO ARCHIVE GRID — ${feeds.length} flux initialisés sous politique ${videoArchivePolicies[activePolicy].name}.`,
    'COAN visual layer : aucune vidéo réelle, seulement flux synthétiques de surveillance reconstruits.',
  ]);
}

export function migrateVideoArchiveState(game: Partial<GameState> & { sectors?: Sector[] }): VideoArchiveState {
  if (game.videoArchives?.feeds?.length) {
    const feeds = videoArchiveFeedOrder.map((feedId, index) => {
      const existing = game.videoArchives?.feeds.find((feed) => feed.feedId === feedId);
      return existing ?? createFeed(feedId, game.sectors ?? [], game, index);
    });
    return summarize(game.videoArchives.activePolicy ?? 'passive_monitoring', feeds, game.videoArchives.log ?? [] , game.videoArchives, game.videoArchives.lastClip);
  }
  return createInitialVideoArchiveState({ ...game, sectors: game.sectors ?? [] });
}

function applyFeedDelta(feed: VideoArchiveFeedRuntime, delta: VideoArchiveOperation['feedDelta'] | typeof videoArchivePolicies[VideoArchivePolicyId]['feedDelta']): VideoArchiveFeedRuntime {
  return {
    ...feed,
    integrity: add(feed.integrity, delta.integrity ?? 0),
    corruption: add(feed.corruption, delta.corruption ?? 0),
    publicExposure: add(feed.publicExposure, delta.publicExposure ?? 0),
    evidenceValue: add(feed.evidenceValue, delta.evidenceValue ?? 0),
    lambdaNoise: add(feed.lambdaNoise, delta.lambdaNoise ?? 0),
    xenNoise: add(feed.xenNoise, delta.xenNoise ?? 0),
    citadelScrutiny: add(feed.citadelScrutiny, delta.citadelScrutiny ?? 0),
  };
}

function feedFrameLine(feed: VideoArchiveFeedRuntime, game: Partial<GameState>, sector?: Sector): string {
  const def = videoArchiveFeeds[feed.feedId];
  if (def.category === 'xen' && (game.xenMutation?.outbreakRisk ?? 0) > 60) return 'frame stabilisée : silhouette de parasite en angle mort, marqueur HOST-COMPROMISED.';
  if (def.category === 'nova' && (game.novaProspekt?.instability ?? 0) > 62) return 'black frame interrompu : porte de cellule ouverte 00:03 avant correction manifeste.';
  if (def.category === 'resistance' && (game.resistanceNetwork?.simultaneousOpsRisk ?? 0) > 60) return 'trois silhouettes passent sous le pont, radio courte, graffiti Lambda visible une seule frame.';
  if (def.category === 'civil_protection' && (game.civilProtection?.brutalityIndex ?? 0) > 66) return 'agent CP hors protocole : coupure audio juste avant contact civil.';
  if (def.category === 'transport' && (game.majorStoryEvents?.citywideHeat ?? 0) > 60) return 'manifeste Razor désynchronisé : wagon présent sur vidéo, absent du rapport transmis.';
  if (def.category === 'vortigaunt' && (game.vortigaunts?.vortessenceCoherence ?? 0) > 55) return 'timecode non linéaire : le couloir apparaît vide après le passage d’une ombre Vortigaunt.';
  return `${sector?.name ?? feed.sectorId} : ${def.signalArtifacts[(feed.archivedClips + feed.corruption) % def.signalArtifacts.length]}.`;
}

export function simulateVideoArchiveDay({ state, game, sectors, stats, day }: { state: VideoArchiveState; game: Partial<GameState>; sectors: Sector[]; stats: Stats; day: number }) {
  const policy = videoArchivePolicies[state.activePolicy] ?? videoArchivePolicies.passive_monitoring;
  const lines: string[] = [];
  let statsDelta: Partial<Stats> = { ...policy.statsDelta };
  let lastClip = state.lastClip;
  const feeds = state.feeds.map((feed) => {
    const sector = sectors.find((item) => item.id === feed.sectorId);
    const def = videoArchiveFeeds[feed.feedId];
    const pressure = categoryPressure(feed, { ...game, stats }, sector);
    const corruptionDrift = Math.round(pressure * 0.08 + (def.category === 'xen' ? safe(game.xenEcosystem?.networkSpread, 0) * 0.04 : 0) + (def.category === 'nova' ? safe(game.novaProspekt?.instability, 0) * 0.04 : 0));
    const exposureDrift = Math.round((100 - stats.info) * 0.03 + pressure * 0.04 + (def.category === 'civil_protection' ? safe(game.civilProtection?.brutalityIndex, 0) * 0.04 : 0));
    const evidenceDrift = Math.round(pressure * 0.06 + def.baseSensitivity * 0.02);
    let next = applyFeedDelta(feed, policy.feedDelta);
    next = {
      ...next,
      integrity: add(next.integrity, Math.round(stats.info * 0.04 + stats.combine * 0.02 - corruptionDrift * 0.7 - (next.locked ? 1 : 0))),
      corruption: add(next.corruption, corruptionDrift - Math.round(stats.info * 0.03)),
      publicExposure: add(next.publicExposure, exposureDrift - Math.round(stats.info * 0.02)),
      evidenceValue: add(next.evidenceValue, evidenceDrift - (state.activePolicy === 'citadel_evidence_scrub' ? 4 : 0)),
      lambdaNoise: add(next.lambdaNoise, def.category === 'resistance' ? Math.round(stats.rebel * 0.07) : Math.round(stats.rebel * 0.015)),
      xenNoise: add(next.xenNoise, def.category === 'xen' || def.category === 'vortigaunt' ? Math.round(stats.xen * 0.08) : Math.round(stats.xen * 0.015)),
      citadelScrutiny: add(next.citadelScrutiny, Math.round(stats.suspicion * 0.035 + (next.evidenceValue > 70 ? 2 : 0))),
      recording: pressure > 54 || next.evidenceValue > 72 || next.publicExposure > 70,
      locked: next.locked && day % 3 !== 0,
      lastFrame: feedFrameLine(next, game, sector),
    };
    const clipGain = next.recording ? Math.max(0, Math.round((next.evidenceValue + pressure + next.publicExposure - 145) / 18)) : 0;
    if (clipGain > 0) {
      next = { ...next, archivedClips: Math.min(999, next.archivedClips + clipGain) };
      lastClip = `${def.sourceCode} — ${next.lastFrame}`;
      if (lines.length < 4) lines.push(`Archive vidéo : ${def.sourceCode} a généré ${clipGain} clip(s) critique(s).`);
    }
    return next;
  });

  const nextState = summarize(state.activePolicy, feeds, lines.length ? [...lines, ...state.log] : [`VIDEO ARCHIVE GRID — aucune rupture visuelle majeure au jour ${String(day).padStart(3, '0')}.`, ...state.log], state, lastClip);
  const leakPenalty = nextState.publicLeakRisk > 72 ? { rebel: 3, loyalty: -3, suspicion: 4 } : {};
  const advisorPenalty = nextState.advisorEvidenceDemand > 76 ? { suspicion: 3, citadel: -1 } : {};
  const xenBenefit = nextState.xenVisualNoise < 38 && state.activePolicy === 'xen_biofeed_priority' ? { xen: -1 } : {};
  const lambdaBenefit = nextState.lambdaSignalIntrusion < 38 && state.activePolicy === 'lambda_signal_trap' ? { rebel: -1 } : {};
  statsDelta = { ...statsDelta, ...leakPenalty, ...advisorPenalty, ...xenBenefit, ...lambdaBenefit };
  return {
    videoArchives: nextState,
    statsDelta,
    lines: [
      `Archives vidéo : intégrité ${nextState.signalIntegrity}% / corruption ${nextState.archiveCorruption}% / risque fuite ${nextState.publicLeakRisk}%.`,
      `Flux COAN : Lambda ${nextState.lambdaSignalIntrusion}% / Xen-noise ${nextState.xenVisualNoise}% / demande Advisor ${nextState.advisorEvidenceDemand}%.`,
      ...lines.slice(0, 4),
    ],
  };
}

export function setVideoArchivePolicy(state: VideoArchiveState, policyId: VideoArchivePolicyId) {
  const policy = videoArchivePolicies[policyId];
  const feeds = state.feeds.map((feed) => applyFeedDelta(feed, policy.feedDelta));
  const nextState = summarize(policyId, feeds, [`Politique archives vidéo : ${policy.name}.`, policy.logLine, ...state.log], state);
  return { videoArchives: nextState, statsDelta: policy.statsDelta, lines: [policy.logLine] };
}

export function resolveVideoArchiveOperation({ state, operation, selectedFeedId, stats, nova }: { state: VideoArchiveState; operation: VideoArchiveOperation; selectedFeedId?: string; stats: Stats; nova?: NovaProspektState }) {
  const targetFeed = state.feeds.find((feed) => feed.id === selectedFeedId || feed.feedId === selectedFeedId)
    ?? state.feeds.sort((a, b) => (b.evidenceValue + b.publicExposure + b.corruption) - (a.evidenceValue + a.publicExposure + a.corruption))[0];
  const categoryBoost = targetFeed ? operation.bestAgainst.includes(targetFeed.feedId) ? 1.2 : 1 : 1;
  const riskSpike = Math.round(operation.risk * 0.12 + (operation.id.includes('false') ? stats.suspicion * 0.08 : 0) + (operation.id.includes('nova') ? safe(nova?.instability, 0) * 0.05 : 0));
  const feeds = state.feeds.map((feed) => {
    const shouldApply = operation.target === 'citywide' || feed.id === targetFeed?.id;
    if (!shouldApply) return feed;
    const delta = Object.fromEntries(Object.entries(operation.feedDelta).map(([key, value]) => [key, Math.round((value as number) * categoryBoost)])) as VideoArchiveOperation['feedDelta'];
    const updated = applyFeedDelta(feed, delta);
    return {
      ...updated,
      locked: operation.id === 'lock_camera_cluster' ? true : updated.locked,
      archivedClips: Math.max(0, updated.archivedClips + (operation.id === 'export_advisor_evidence' ? -2 : operation.id === 'release_anonymized_clip' ? -1 : 0)),
      lastFrame: `${videoArchiveFeeds[feed.feedId].sourceCode} // opération ${operation.name}.`,
    };
  });
  const nextState = summarize(state.activePolicy, feeds, [`${operation.logLine} Cible : ${targetFeed ? videoArchiveFeeds[targetFeed.feedId].sourceCode : 'cluster citywide'}.`, ...state.log], state);
  const statsDelta: Partial<Stats> = { ...operation.statsDelta, suspicion: (operation.statsDelta.suspicion ?? 0) + riskSpike };
  return {
    videoArchives: nextState,
    statsDelta,
    lines: [`${operation.logLine} Risque audit visuel +${riskSpike}.`],
  };
}
