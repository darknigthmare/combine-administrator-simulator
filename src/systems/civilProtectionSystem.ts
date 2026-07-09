import type { CivilProtectionDoctrineId, CivilProtectionOperation, CivilProtectionPost, CivilProtectionState, GameState, Sector, Stats } from '../types/game';
import { civilProtectionDoctrines, createPostTemplate } from '../data/civilProtection';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const sum = (values: number[]) => values.reduce((acc, item) => acc + item, 0);
const avg = (values: number[]) => values.length ? Math.round(sum(values) / values.length) : 0;

function recalc(posts: CivilProtectionPost[], activeDoctrine: CivilProtectionDoctrineId, log: string[]): CivilProtectionState {
  return {
    activeDoctrine,
    totalOfficers: sum(posts.map((post) => post.officers)),
    brutalityIndex: avg(posts.map((post) => post.brutality)),
    corruptionIndex: avg(posts.map((post) => post.corruption)),
    disciplineIndex: avg(posts.map((post) => post.discipline)),
    moraleIndex: avg(posts.map((post) => post.morale)),
    abuseReportIndex: avg(posts.map((post) => post.abuseReports)),
    rationLeakageIndex: avg(posts.map((post) => post.rationLeakage)),
    falseChargeIndex: avg(posts.map((post) => post.falseCharges)),
    lambdaInfiltration: avg(posts.map((post) => post.lambdaInfluence)),
    compromisedOfficers: sum(posts.map((post) => post.compromisedOfficers)),
    arrestsToday: sum(posts.map((post) => post.arrestsToday)),
    seizedRationsToday: sum(posts.map((post) => post.seizedRations)),
    posts,
    log: log.slice(0, 40),
  };
}

export function createInitialCivilProtectionState({ sectors, profile }: { sectors: Sector[]; profile: GameState['profile'] }): CivilProtectionState {
  const priorityIds = ['station', 'admin', 'res_a', 'res_b', 'industry', 'canals', 'quarantine', 'rail', 'citadel_zone'];
  const picked = sectors.filter((sector) => priorityIds.includes(sector.id)).slice(0, 8);
  const posts = picked.map((sector, index) => {
    const post = createPostTemplate(index, sector.id, sector.name);
    if (profile === 'tyrant') {
      post.brutality = clamp(post.brutality + 18);
      post.discipline = clamp(post.discipline - 4);
    }
    if (profile === 'technocrat') {
      post.discipline = clamp(post.discipline + 10);
      post.corruption = clamp(post.corruption - 6);
    }
    if (profile === 'sympathizer') {
      post.lambdaInfluence = clamp(post.lambdaInfluence + 6);
      post.brutality = clamp(post.brutality - 5);
    }
    return post;
  });
  return recalc(posts, profile === 'tyrant' ? 'terror_patrols' : profile === 'technocrat' ? 'internal_affairs' : 'regulated_policing', [
    'Civil Protection Directorate initialisée : postes, discipline, brutalité et corruption indexés par COAN.',
  ]);
}

export function migrateCivilProtectionState(game: Partial<GameState>): CivilProtectionState {
  if (game.civilProtection?.posts?.length) return game.civilProtection;
  return createInitialCivilProtectionState({ sectors: game.sectors ?? [], profile: game.profile ?? 'loyalist' });
}

export function setCivilProtectionDoctrine(state: CivilProtectionState, doctrineId: CivilProtectionDoctrineId) {
  const doctrine = civilProtectionDoctrines.find((item) => item.id === doctrineId) ?? civilProtectionDoctrines[0];
  const posts = state.posts.map((post) => ({
    ...post,
    brutality: clamp(post.brutality + doctrine.brutalityBias * 0.25),
    corruption: clamp(post.corruption + doctrine.corruptionBias * 0.25),
    discipline: clamp(post.discipline + (doctrine.id === 'internal_affairs' ? 6 : doctrine.id === 'terror_patrols' ? -3 : 0)),
    rationLeakage: clamp(post.rationLeakage + doctrine.rationLeakageBias * 0.25),
    lastIncident: `Doctrine active : ${doctrine.name}.`,
  }));
  const next = recalc(posts, doctrine.id, [`Doctrine CP active : ${doctrine.name}. ${doctrine.publicLine}`, ...state.log]);
  return { civilProtection: next, statsDelta: doctrine.effects, lines: [`Doctrine Civil Protection : ${doctrine.name}.`, doctrine.description] };
}

export function resolveCivilProtectionOperation({ state, operation, sectors, selectedSectorId, stats, day }: { state: CivilProtectionState; operation: CivilProtectionOperation; sectors: Sector[]; selectedSectorId: string; stats: Stats; day: number }) {
  const targetPostId = state.posts.find((post) => post.sectorId === selectedSectorId)?.id ?? state.posts[Math.abs((day + selectedSectorId.length) % state.posts.length)]?.id;
  let postName = 'poste CP local';
  const posts = state.posts.map((post) => {
    if (post.id !== targetPostId) return { ...post, arrestsToday: 0, seizedRations: 0 };
    postName = post.name;
    return {
      ...post,
      discipline: clamp(post.discipline + (operation.postEffects.disciplineDelta ?? 0)),
      brutality: clamp(post.brutality + (operation.postEffects.brutalityDelta ?? 0)),
      corruption: clamp(post.corruption + (operation.postEffects.corruptionDelta ?? 0)),
      morale: clamp(post.morale + (operation.postEffects.moraleDelta ?? 0)),
      lambdaInfluence: clamp(post.lambdaInfluence + (operation.postEffects.lambdaInfluenceDelta ?? 0)),
      rationLeakage: clamp(post.rationLeakage + (operation.postEffects.rationLeakDelta ?? 0)),
      abuseReports: clamp(post.abuseReports + (operation.postEffects.abuseReportsDelta ?? 0)),
      falseCharges: clamp(post.falseCharges + (operation.postEffects.falseChargesDelta ?? 0)),
      arrestsToday: Math.max(0, Math.round((operation.postEffects.arrestsDelta ?? 0))),
      seizedRations: Math.max(0, Math.round((operation.postEffects.seizedRationsDelta ?? 0))),
      compromisedOfficers: Math.max(0, post.compromisedOfficers + Math.round(operation.postEffects.compromisedDelta ?? 0)),
      lastIncident: `${operation.name} — ${operation.logLine}`,
    };
  });
  const sectorDelta = operation.id === 'use_brutal_squad'
    ? { rebel: -8, fear: 12, loyalty: -10, surveillance: 7 }
    : operation.id === 'expand_checkpoint_shakedowns'
      ? { rebel: -5, fear: 6, loyalty: -5, surveillance: 10 }
      : operation.id === 'stage_public_restraint'
        ? { rebel: -2, fear: -4, loyalty: 7, surveillance: -2 }
        : { rebel: -2, fear: operation.effects.fear ?? 0, loyalty: operation.effects.loyalty ?? 0, surveillance: 3 };
  const nextSectors = sectors.map((sector) => sector.id === selectedSectorId ? {
    ...sector,
    rebel: clamp(sector.rebel + sectorDelta.rebel),
    fear: clamp(sector.fear + sectorDelta.fear),
    loyalty: clamp(sector.loyalty + sectorDelta.loyalty),
    surveillance: clamp(sector.surveillance + sectorDelta.surveillance),
  } : sector);
  const riskRoll = Math.abs((day * 37 + operation.id.length * 11 + state.corruptionIndex) % 100);
  const incident = riskRoll < operation.risk ? `Incident CP : ${postName} génère fuite/rumeur après ${operation.name}.` : `Opération CP stable : ${postName} applique ${operation.name}.`;
  const extraEffects: Partial<Stats> = riskRoll < operation.risk ? { rebel: 3, loyalty: -3, fatigue: 2, suspicion: 2 } : {};
  const next = recalc(posts, state.activeDoctrine, [incident, operation.logLine, ...state.log]);
  return { civilProtection: next, sectors: nextSectors, statsDelta: { ...operation.effects, ...extraEffects }, lines: [operation.logLine, incident] };
}

export function simulateCivilProtectionDay({ state, sectors, stats, day }: { state: CivilProtectionState; sectors: Sector[]; stats: Stats; day: number }) {
  const doctrine = civilProtectionDoctrines.find((item) => item.id === state.activeDoctrine) ?? civilProtectionDoctrines[0];
  let arrests = 0;
  let seized = 0;
  let abuse = 0;
  let falseCharges = 0;
  let compromisedChange = 0;
  const posts = state.posts.map((post, index) => {
    const sector = sectors.find((item) => item.id === post.sectorId);
    const rebelPressure = sector?.rebel ?? stats.rebel;
    const hungerPressure = Math.max(0, stats.fatigue - 45) * 0.18;
    const fearPressure = stats.fear * 0.05;
    const newArrests = Math.max(0, Math.round(rebelPressure * 0.08 + post.brutality * 0.05 + doctrine.rebelSuppression * 0.3));
    const leak = Math.max(0, Math.round(post.corruption * 0.5 + post.rationLeakage * 0.8 + doctrine.rationLeakageBias));
    const abuseDelta = Math.round(post.brutality * 0.06 + doctrine.brutalityBias * 0.12 + fearPressure);
    const falseDelta = Math.round(post.corruption * 0.04 + doctrine.corruptionBias * 0.1 + Math.max(0, stats.info - 60) * 0.03);
    const lambdaDelta = Math.round((rebelPressure + hungerPressure + post.abuseReports * 0.4 - post.discipline * 0.25) * 0.03);
    const compromisedRoll = Math.abs((day * 19 + index * 13 + post.lambdaInfluence) % 100);
    const compromisedDelta = compromisedRoll < post.lambdaInfluence * 0.22 ? 1 : 0;
    arrests += newArrests;
    seized += leak;
    abuse += Math.max(0, abuseDelta);
    falseCharges += Math.max(0, falseDelta);
    compromisedChange += compromisedDelta;
    return {
      ...post,
      discipline: clamp(post.discipline + (doctrine.id === 'internal_affairs' ? 2 : -0.4) - (post.corruption > 70 ? 1 : 0)),
      brutality: clamp(post.brutality + doctrine.brutalityBias * 0.08 + (stats.fear > 75 ? 0.8 : 0)),
      corruption: clamp(post.corruption + doctrine.corruptionBias * 0.07 + (stats.rations < 800 ? 1.2 : 0) - (doctrine.id === 'internal_affairs' ? 1.8 : 0)),
      morale: clamp(post.morale + (stats.combine > 70 ? 1 : -0.6) - (stats.rebel > 60 ? 1 : 0)),
      lambdaInfluence: clamp(post.lambdaInfluence + lambdaDelta + compromisedDelta),
      rationLeakage: clamp(post.rationLeakage + doctrine.rationLeakageBias * 0.08 + (stats.rations < 900 ? 1 : 0) - (doctrine.id === 'internal_affairs' ? 1 : 0)),
      abuseReports: clamp(post.abuseReports + abuseDelta),
      falseCharges: clamp(post.falseCharges + falseDelta),
      arrestsToday: newArrests,
      seizedRations: leak,
      compromisedOfficers: Math.max(0, post.compromisedOfficers + compromisedDelta - (doctrine.id === 'internal_affairs' && day % 3 === 0 ? 1 : 0)),
      lastIncident: compromisedDelta ? 'Signal COAN : possible agent CP retourné par réseau Lambda.' : newArrests > 12 ? 'Quota d’arrestations dépassé, risque de dossiers fabriqués.' : 'Patrouilles et contrôles de bloc enregistrés.',
    };
  });
  const next = recalc(posts, state.activeDoctrine, [
    `Cycle CP : ${arrests} arrestations, ${seized} coupons/rations saisis ou détournés, ${falseCharges} accusations douteuses.`,
    compromisedChange > 0 ? `Alerte CP : ${compromisedChange} agent(s) potentiellement compromis par Lambda.` : 'Aucune compromission CP majeure confirmée.',
    ...state.log,
  ]);
  const statsDelta: Partial<Stats> = {
    rebel: Math.round(-doctrine.rebelSuppression * 0.18 + next.lambdaInfiltration * 0.035 + next.abuseReportIndex * 0.025),
    loyalty: Math.round(-doctrine.loyaltyDamage * 0.16 - next.corruptionIndex * 0.025 + (doctrine.id === 'internal_affairs' ? 2 : 0)),
    fear: Math.round(next.brutalityIndex * 0.025 + doctrine.brutalityBias * 0.1),
    info: Math.round(next.disciplineIndex * 0.02 + arrests * 0.015 - next.falseChargeIndex * 0.015),
    fatigue: Math.round(next.abuseReportIndex * 0.025 + next.corruptionIndex * 0.02),
    rations: Math.round(next.seizedRationsToday - next.rationLeakageIndex * 2),
    suspicion: Math.round(Math.max(0, next.corruptionIndex - 60) * 0.025 + Math.max(0, next.brutalityIndex - 70) * 0.03 + doctrine.auditRisk * 0.05),
  };
  const nextSectors = sectors.map((sector) => {
    const post = posts.find((item) => item.sectorId === sector.id);
    if (!post) return sector;
    return {
      ...sector,
      rebel: clamp(sector.rebel - doctrine.rebelSuppression * 0.05 + post.lambdaInfluence * 0.03 + post.abuseReports * 0.02),
      fear: clamp(sector.fear + post.brutality * 0.02),
      loyalty: clamp(sector.loyalty - post.corruption * 0.015 - post.abuseReports * 0.015),
      surveillance: clamp(sector.surveillance + post.discipline * 0.015),
    };
  });
  const lines = [
    `Civil Protection : ${next.totalOfficers} agents / discipline ${next.disciplineIndex}% / brutalité ${next.brutalityIndex}% / corruption ${next.corruptionIndex}%.`,
    `CP terrain : ${next.arrestsToday} arrestations, ${next.seizedRationsToday} rations/coupons saisis ou détournés, ${next.falseChargeIndex}% d’accusations douteuses.`,
    `Risque interne : infiltration Lambda ${next.lambdaInfiltration}% / agents compromis ${next.compromisedOfficers}.`,
  ];
  return { civilProtection: next, sectors: nextSectors, statsDelta, lines };
}
