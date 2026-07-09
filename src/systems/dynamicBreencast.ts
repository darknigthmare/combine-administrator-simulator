import type { BreencastMessage, BreencastStrategy, GameState, Stats } from '../types/game';
import { breencastClosers, breencastFragments, breencastOpeners, breencastStrategies } from '../data/breencast';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const addStats = (base: Stats, effects: Partial<Stats>): Stats => ({
  ...base,
  stability: clamp(base.stability + (effects.stability ?? 0)),
  loyalty: clamp(base.loyalty + (effects.loyalty ?? 0)),
  fear: clamp(base.fear + (effects.fear ?? 0)),
  rebel: clamp(base.rebel + (effects.rebel ?? 0)),
  xen: clamp(base.xen + (effects.xen ?? 0)),
  combine: clamp(base.combine + (effects.combine ?? 0)),
  production: clamp(base.production + (effects.production ?? 0), 0, 120),
  rations: Math.max(0, Math.round(base.rations + (effects.rations ?? 0))),
  citadel: clamp(base.citadel + (effects.citadel ?? 0)),
  info: clamp(base.info + (effects.info ?? 0)),
  fatigue: clamp(base.fatigue + (effects.fatigue ?? 0)),
  civilianLosses: Math.max(0, Math.round(base.civilianLosses + (effects.civilianLosses ?? 0))),
  combineLosses: Math.max(0, Math.round(base.combineLosses + (effects.combineLosses ?? 0))),
  suspicion: clamp(base.suspicion + (effects.suspicion ?? 0)),
});

function seededIndex(seed: number, length: number) {
  return Math.abs((seed * 1103515245 + 12345) % length);
}

function pick<T>(items: T[], seed: number): T {
  return items[seededIndex(seed, items.length)];
}

function primaryCategory(game: GameState): BreencastMessage['category'] {
  const s = game.stats;
  const nova = game.novaProspekt;
  const weighted = [
    { category: 'rebellion' as const, score: s.rebel + Math.max(0, 45 - s.info) * 0.45 },
    { category: 'xen' as const, score: s.xen + nova.xenBreachRisk * 0.32 },
    { category: 'rations' as const, score: Math.max(0, 850 - s.rations) / 10 + Math.max(0, 55 - s.production) * 0.45 },
    { category: 'nova' as const, score: nova.totalTransferred / 14 + Math.max(0, 100 - nova.secrecy) * 0.38 + nova.instability * 0.2 },
    { category: 'audit' as const, score: s.suspicion * 0.8 + (game.auditHeat ?? 0) * 0.9 },
    { category: 'civilian' as const, score: Math.min(95, s.civilianLosses / 26) + s.fatigue * 0.3 },
    { category: 'productivity' as const, score: Math.max(0, 70 - s.production) + Math.max(0, 900 - s.rations) / 20 },
    { category: 'continuity' as const, score: Math.max(0, 70 - s.stability) + s.fatigue * 0.2 },
  ];
  return weighted.sort((a, b) => b.score - a.score)[0].category;
}

function categoryToFragmentKey(category: BreencastMessage['category']): keyof typeof breencastFragments {
  if (category === 'continuity') return 'default';
  return category;
}

function categoryEffects(category: BreencastMessage['category'], game: GameState): Partial<Stats> {
  switch (category) {
    case 'rebellion': return { info: 12, rebel: -4, fear: 5, loyalty: -3, fatigue: 2 };
    case 'xen': return { info: 10, xen: -2, fear: 4, fatigue: 3, stability: 1 };
    case 'rations': return { info: 8, rations: 60, fatigue: 5, loyalty: -5, rebel: 3 };
    case 'nova': return { info: 11, fear: 7, loyalty: -7, rebel: 3, suspicion: 3 };
    case 'audit': return { info: 7, citadel: 3, suspicion: -2, fear: 4, fatigue: 3 };
    case 'civilian': return { info: 9, fear: 3, loyalty: -4, fatigue: 4, suspicion: game.profile === 'sympathizer' ? 3 : 0 };
    case 'productivity': return { info: 6, production: 3, fatigue: 3, loyalty: -2 };
    case 'continuity': return { info: 8, stability: 2, fatigue: 2 };
  }
}

function categoryTitle(category: BreencastMessage['category']) {
  const labels: Record<BreencastMessage['category'], string> = {
    rebellion: 'Activité anti-citoyenne',
    xen: 'Justification de quarantaine',
    rations: 'Rationnement méritocratique',
    nova: 'Réaffectation Nova Prospekt',
    audit: 'Confiance envers la Citadelle',
    civilian: 'Normalisation des pertes civiles',
    productivity: 'Rendement industriel',
    continuity: 'Continuité civique',
  };
  return labels[category];
}

function hiddenIntent(category: BreencastMessage['category']) {
  const intents: Record<BreencastMessage['category'], string> = {
    rebellion: 'Réduire l’activité Lambda ouverte tout en augmentant les signalements et la peur de voisinage.',
    xen: 'Faire accepter verrouillages, pertes locales et protocoles de quarantaine avant panique biologique.',
    rations: 'Transformer le manque de nourriture en outil de sélection civique et de productivité.',
    nova: 'Masquer les transferts, disparitions et dossiers Biotics sous un vocabulaire de réaffectation.',
    audit: 'Réduire la panique administrative et présenter la surveillance Advisor comme protection.',
    civilian: 'Neutraliser le deuil public avant qu’il ne devienne un récit de Résistance.',
    productivity: 'Rattacher chaque ration à la production industrielle et à l’utilité mesurable du citoyen.',
    continuity: 'Maintenir une couche de conformité générale quand aucune crise unique ne domine.',
  };
  return intents[category];
}

export function buildDynamicBreencast(game: GameState) {
  const category = primaryCategory(game);
  const seed = game.day + game.city.length + game.stats.rebel + game.stats.xen + game.stats.suspicion;
  const opener = pick(breencastOpeners, seed);
  const fragment = pick(breencastFragments[categoryToFragmentKey(category)], seed + 7);
  const closer = pick(breencastClosers, seed + 13);
  const severity = clamp(
    category === 'rebellion' ? game.stats.rebel :
    category === 'xen' ? game.stats.xen :
    category === 'rations' ? Math.max(0, 100 - game.stats.rations / 18) :
    category === 'nova' ? game.novaProspekt.instability :
    category === 'audit' ? Math.max(game.stats.suspicion, game.auditHeat ?? 0) :
    category === 'civilian' ? Math.min(100, game.stats.civilianLosses / 20) :
    category === 'productivity' ? Math.max(0, 100 - game.stats.production) :
    50
  );

  const recommended: BreencastMessage = {
    id: `breencast-${game.day}-${category}`,
    category,
    title: categoryTitle(category),
    publicLine: `${opener} ${fragment} ${closer}`,
    hiddenIntent: hiddenIntent(category),
    effects: categoryEffects(category, game),
    severity,
    loreTags: ['BreenCast', 'Civil Authority', category === 'xen' ? 'Xen containment' : 'Combine occupation'],
  };

  const queue = (Object.keys(breencastFragments) as Array<keyof typeof breencastFragments>)
    .filter((key) => key !== 'default')
    .slice(0, 6)
    .map((key, index) => {
      const cat = key as BreencastMessage['category'];
      return {
        id: `queued-${key}-${game.day}`,
        category: cat,
        title: categoryTitle(cat),
        publicLine: `${pick(breencastOpeners, seed + index)} ${pick(breencastFragments[key], seed + index * 5)} ${pick(breencastClosers, seed + index * 11)}`,
        hiddenIntent: hiddenIntent(cat),
        effects: categoryEffects(cat, game),
        severity: clamp(severity - index * 7 + (cat === category ? 18 : 0)),
        loreTags: ['BreenCast', key],
      } satisfies BreencastMessage;
    })
    .sort((a, b) => b.severity - a.severity);

  const diagnosis = [
    game.stats.rebel > 55 ? 'Réseau Lambda suffisamment visible pour justifier une campagne anti-citoyenne.' : null,
    game.stats.xen > 40 ? 'Contamination Xen compatible avec une rhétorique sanitaire agressive.' : null,
    game.stats.rations < 650 ? 'Réserves basses : le discours doit transformer la privation en mérite civique.' : null,
    game.novaProspekt.totalTransferred > 200 ? 'Nova Prospekt pèse déjà dans les familles de City : contrôler le récit des transferts.' : null,
    game.stats.suspicion > 55 || (game.auditHeat ?? 0) > 55 ? 'Chaleur d’audit élevée : éviter les affirmations trop falsifiables.' : null,
  ].filter(Boolean) as string[];

  return {
    recommended,
    queue,
    diagnosis: diagnosis.length ? diagnosis : ['Aucune crise unique ne domine : maintenir continuité civique et conformité productive.'],
    dominantCrisis: category,
  };
}

export function resolveBreencastStrategy({ game, strategy }: { game: GameState; strategy: BreencastStrategy }) {
  const nextStats = addStats(game.stats, strategy.effects);
  const riskRoll = seededIndex(game.day + strategy.risk + game.stats.suspicion, 100);
  const backlash = riskRoll < strategy.risk + Math.max(0, game.stats.fatigue - 60) * 0.4;
  const effects: Partial<Stats> = backlash
    ? { rebel: 5, fatigue: 4, loyalty: -4, suspicion: 3 }
    : { stability: 1, info: 2 };
  const finalStats = addStats(nextStats, effects);
  const lines = [
    `BreenCast doctrine : ${strategy.name}.`,
    backlash
      ? 'Contre-effet détecté : citoyens fatigués, rumeurs de manipulation, radios Lambda opportunistes.'
      : 'Diffusion absorbée sans incident majeur. Conformité apparente améliorée.',
  ];
  return { stats: finalStats, lines, backlash };
}

export { breencastStrategies };
