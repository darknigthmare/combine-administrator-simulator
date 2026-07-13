import type { GameState, LoreCodexCategoryId, LoreCodexEntry, LoreCodexView } from '../types/game';
import { loreCodexEntries } from '../data/loreCodex';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

function normalize(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function getLoreCodexEntry(id: string): LoreCodexEntry | undefined {
  return loreCodexEntries.find((entry) => entry.id === id);
}

export function getLoreCodexEntries(category: LoreCodexCategoryId = 'all', query = ''): LoreCodexEntry[] {
  const needle = normalize(query.trim());
  return loreCodexEntries
    .filter((entry) => entry.id !== 'private-fan-boundary')
    .filter((entry) => category === 'all' || entry.category === category)
    .filter((entry) => {
      if (!needle) return true;
      const haystack = normalize([
        entry.title,
        entry.subtitle,
        entry.canonSummary,
        entry.operationalDoctrine,
        ...entry.keywords,
        ...entry.gameplayHooks,
        ...entry.relatedSystems,
        ...entry.dangerRules,
        ...entry.avoidRules,
      ].join(' '));
      return haystack.includes(needle);
    })
    .sort((a, b) => b.weight - a.weight || a.title.localeCompare(b.title));
}

export function buildLoreCodexView(game: GameState, category: LoreCodexCategoryId = 'all', query = ''): LoreCodexView {
  const accessibleEntries = loreCodexEntries.filter((entry) => entry.id !== 'private-fan-boundary')
    .filter((entry) => entry.category !== 'xen' || game.uiuxProgression.unlocked.xen_bioscan)
    .filter((entry) => entry.category !== 'nova' || game.uiuxProgression.unlocked.nova_prospekt_link);
  const accessibleIds = new Set(accessibleEntries.map((entry) => entry.id));
  const filteredEntries = getLoreCodexEntries(category, query).filter((entry) => accessibleIds.has(entry.id));
  const categoryCounts = accessibleEntries.reduce<Record<LoreCodexCategoryId, number>>((acc, entry) => {
    acc[entry.category] = (acc[entry.category] ?? 0) + 1;
    acc.all += 1;
    return acc;
  }, { all: 0, timeline: 0, combine: 0, civil: 0, resistance: 0, xen: 0, nova: 0, gameplay: 0 });

  const recommendedIds = new Set<string>();
  if (game.stats.rebel > 45 || game.resistanceNetwork.networkCohesion > 45) {
    recommendedIds.add('resistance-lambda');
    recommendedIds.add('resistance-factions');
  }
  if (game.uiuxProgression.unlocked.xen_bioscan && (game.stats.xen > 35 || game.xenEcosystem.networkSpread > 40)) {
    recommendedIds.add('xen-biosphere');
    recommendedIds.add('headcrab-zombie-chain');
    recommendedIds.add('quarantine-ravenholm');
  }
  if (game.uiuxProgression.unlocked.nova_prospekt_link && (game.novaProspekt.instability > 40 || (100 - game.novaProspekt.secrecy) > 40)) {
    recommendedIds.add('nova-prospekt');
    recommendedIds.add('vortigaunts-biotics');
  }
  if (game.auditHeat > 35 || game.stats.suspicion > 40) {
    recommendedIds.add('reports-falsification');
    recommendedIds.add('citadel-advisors');
  }
  if (game.rationEconomy.hungerIndex > 35 || game.rationEconomy.blackMarketIndex > 35) {
    recommendedIds.add('rationing-control');
    recommendedIds.add('civil-protection');
  }
  if (game.videoArchives.publicLeakRisk > 35) {
    recommendedIds.add('video-archives');
  }
  if (game.day < 4) {
    recommendedIds.add('seven-hour-war');
    recommendedIds.add('city-17-template');
    recommendedIds.add('combine-occupation');
  }

  const recommendedEntries = accessibleEntries.filter((entry) => recommendedIds.has(entry.id)).sort((a, b) => b.weight - a.weight).slice(0, 6);
  const loreRisk = clamp(
    Math.max(game.stats.rebel, game.uiuxProgression.unlocked.xen_bioscan ? game.stats.xen : 0, game.auditHeat, game.uiuxProgression.unlocked.nova_prospekt_link ? game.novaProspekt.instability : 0, game.uiuxProgression.unlocked.xen_bioscan ? game.xenCatastrophes.totalCatastropheRisk : 0, game.resistanceNetwork.networkCohesion)
  );
  const completeness = clamp(Math.round((loreCodexEntries.length / 20) * 100));
  const activeWarnings = [
    game.stats.rebel > 70 ? 'Lambda proche de l’insurrection ouverte : relire Résistance Lambda / factions internes.' : '',
    game.uiuxProgression.unlocked.xen_bioscan && game.stats.xen > 70 ? 'Xen menace de dépasser le simple confinement : relire biosphère, chaînes parasitaires et Ravenholm-like.' : '',
    game.auditHeat > 65 ? 'Audit Advisor critique : relire rapports falsifiés, Citadelle et Advisors.' : '',
    game.uiuxProgression.unlocked.nova_prospekt_link && game.novaProspekt.instability > 65 ? 'Nova Prospekt instable : relire Nova Prospekt et Vortigaunts / Biotics.' : '',
    game.videoArchives.publicLeakRisk > 65 ? 'Risque de fuite vidéo élevé : relire archives vidéo et falsification.' : '',
  ].filter(Boolean);

  return {
    totalEntries: loreCodexEntries.length,
    filteredEntries,
    recommendedEntries,
    categoryCounts,
    loreRisk,
    completeness,
    activeWarnings,
  };
}

export function buildLoreCodexExport(entries: LoreCodexEntry[]): string {
  return entries.map((entry) => [
    `# ${entry.title}`,
    `Classification : ${entry.classification}`,
    `Catégorie : ${entry.category}`,
    `Source : ${entry.sourceType}`,
    '',
    'Résumé canon :',
    entry.canonSummary,
    '',
    'Doctrine opérationnelle :',
    entry.operationalDoctrine,
    '',
    'Règles danger :',
    ...entry.dangerRules.map((line) => `- ${line}`),
    '',
    'À éviter :',
    ...entry.avoidRules.map((line) => `- ${line}`),
    '',
    `Modules liés : ${entry.connectedTabs.join(', ')}`,
    `Systèmes liés : ${entry.relatedSystems.join(', ')}`,
  ].join('\n')).join('\n\n---\n\n');
}
