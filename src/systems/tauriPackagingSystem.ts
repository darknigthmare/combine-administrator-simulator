import type { GameState } from '../types/game';
import { tauriAppMetadata, tauriArtifactTargets, tauriBuildCommands, tauriPackagingChecklist, tauriPackagingVersion, tauriReleaseChannels, tauriReleaseRunbook, tauriWindowsPrerequisites } from '../data/tauriPackaging';

type PackagingStatus = 'ok' | 'watch' | 'blocked';

export type TauriPackagingRuntimeCheck = {
  id: string;
  label: string;
  category: string;
  status: PackagingStatus;
  detail: string;
  remediation: string;
};

export type TauriPackagingReport = {
  version: string;
  appVersion: string;
  readiness: number;
  risk: number;
  dominantRisk: string;
  checks: TauriPackagingRuntimeCheck[];
  releaseNotes: string;
  artifactTargets: typeof tauriArtifactTargets;
  commands: typeof tauriBuildCommands;
  channels: typeof tauriReleaseChannels;
  prerequisites: string[];
  runbook: string[];
  warnings: string[];
};

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

function statusFromScore(score: number): PackagingStatus {
  if (score >= 76) return 'ok';
  if (score >= 46) return 'watch';
  return 'blocked';
}

function buildRuntimeWarnings(game: GameState): string[] {
  const warnings: string[] = [];
  if (game.finalVerdict === null && game.day < 2) warnings.push('Aucune partie longue testée dans cette sauvegarde : faire au moins 5 fins de journée avant release QA.');
  if (game.videoArchives.archiveCorruption > 70) warnings.push('Archives vidéo très corrompues : vérifier la lisibilité du module Archives vidéo en desktop.');
  if (game.atmosphereSettings.audioEnabled && game.atmosphereSettings.masterVolume > 0.7) warnings.push('Audio synthétique élevé : tester volume Windows avant distribution privée.');
  if (game.stats.xen > 80 || game.stats.rebel > 80) warnings.push('État de City extrême : tester responsive/scrolling sur modules Xen/Lambda avant release.');
  if (game.decisionHistory.entries.length < 4) warnings.push('Historique décisions pauvre : générer une session test avec plusieurs opérations avant release notes.');
  if (game.reports.length < 2) warnings.push('Rapports insuffisants : vérifier dossier réel/transmission Citadel après plusieurs journées.');
  return warnings;
}

export function buildTauriPackagingReport(game: GameState): TauriPackagingReport {
  const runtimeWarnings = buildRuntimeWarnings(game);
  const cityStress = Math.round((game.stats.rebel + game.stats.xen + game.stats.fatigue + game.auditHeat + game.novaProspekt.instability) / 5);
  const qaDepth = clamp((game.day * 4) + Math.min(25, game.reports.length * 4) + Math.min(25, game.decisionHistory.entries.length));
  const readiness = clamp(82 + Math.floor(qaDepth / 5) - Math.floor(runtimeWarnings.length * 5) - Math.floor(cityStress / 12));
  const risk = clamp(100 - readiness + Math.floor(cityStress / 4));
  const dominantRisk = runtimeWarnings[0] ?? 'Aucun blocage runtime évident côté interface COAN.';

  const checks = tauriPackagingChecklist.map((item, index) => {
    const score = readiness - item.severity * 2 - index;
    const status = item.id === 'metadata-version' || item.id === 'bundle-targets' || item.id === 'audit-scripts' ? 'ok' : statusFromScore(score);
    return {
      id: item.id,
      label: item.label,
      category: item.category,
      status,
      detail: item.expected,
      remediation: item.remediation,
    };
  });

  return {
    version: tauriPackagingVersion,
    appVersion: tauriAppMetadata.version,
    readiness,
    risk,
    dominantRisk,
    checks,
    releaseNotes: buildDesktopReleaseNotes(game, readiness, risk),
    artifactTargets: tauriArtifactTargets,
    commands: tauriBuildCommands,
    channels: tauriReleaseChannels,
    prerequisites: tauriWindowsPrerequisites,
    runbook: tauriReleaseRunbook,
    warnings: runtimeWarnings,
  };
}

export function buildDesktopReleaseNotes(game: GameState, readiness?: number, risk?: number): string {
  const score = readiness ?? 0;
  const riskScore = risk ?? 0;
  const activeCampaign = game.campaign.currentBriefing || game.campaign.activeCampaignId;
  const verdictLine = game.finalVerdict ? `${game.finalVerdict.title} — ${game.finalVerdict.subtitle}` : 'Aucun verdict final déclenché sur la session active.';
  return [
    `# Combine Administrator Simulator — Desktop ${tauriAppMetadata.version}`,
    '',
    `City active : City ${game.city}`,
    `Jour COAN : ${game.day}`,
    `Campagne : ${activeCampaign}`,
    `Timeline : ${game.timeline}`,
    `Difficulté : ${game.difficultySettings.activePresetId} — ${game.difficultySettings.startSummary}`,
    `Readiness packaging : ${score}% / risque ${riskScore}%`,
    '',
    '## Modules inclus',
    '- Administration City / COAN Terminal',
    '- Nova Prospekt comme terminal séparé',
    '- Citadel Directives, technologies Combine, Overwatch Command',
    '- Résistance Lambda avancée, factions internes, Vortigaunts/Biotics',
    '- Écosystème Xen, mutations, quarantaines, recherche et catastrophes rares',
    '- Campagnes, objectifs, événements majeurs, verdict et chronique finale',
    '- Sauvegardes multi-slots, historique décisions, codex lore, difficulté avancée',
    '- Audio synthétique, archives vidéo, fenêtres flottantes COAN OS',
    '- Packaging Tauri Windows NSIS/MSI',
    '',
    '## État session utilisée pour QA',
    `- Stabilité : ${game.stats.stability}%`,
    `- Lambda : ${game.stats.rebel}%`,
    `- Xen : ${game.stats.xen}%`,
    `- Audit Advisor : ${game.auditHeat}%`,
    `- Rapports : ${game.reports.length}`,
    `- Décisions historisées : ${game.decisionHistory.entries.length}`,
    `- Verdict : ${verdictLine}`,
    '',
    '## Artefacts attendus',
    ...tauriArtifactTargets.map((target) => `- ${target.label} : ${target.path}`),
    '',
    '## Notes privées',
    'Application fan-made privée. Ne pas inclure d’assets officiels protégés dans les bundles.',
  ].join('\n');
}
