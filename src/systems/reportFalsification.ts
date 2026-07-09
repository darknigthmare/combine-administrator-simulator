import type { ReportPolicy, Stats } from '../types/game';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

export type ReportTransmission = {
  transmittedStats: Stats;
  transmittedLines: string[];
  falsificationScore: number;
  auditRisk: number;
  falsifiedFields: Array<keyof Stats>;
  suspicionDelta: number;
  classification: 'TRUTHFUL' | 'SANITIZED' | 'FALSIFIED' | 'DANGEROUSLY_FALSIFIED';
};

export const reportPolicyLabels: Record<ReportPolicy, string> = {
  truthful: 'Transmission exacte',
  minimize_rebellion: 'Minimiser activité anti-citoyenne',
  hide_xen: 'Dissimuler contamination Xen',
  hide_casualties: 'Classer pertes civiles',
  inflate_productivity: 'Gonfler rendement industriel',
  model_city: 'Présenter City modèle',
  sympathizer_cover: 'Double rapport / couverture clandestine',
};

export const reportPolicyDescriptions: Record<ReportPolicy, string> = {
  truthful: 'Les chiffres réels sont transmis. Peu de risque d’audit, mais les échecs irritent immédiatement la Citadelle.',
  minimize_rebellion: 'L’activité Lambda est requalifiée en incidents civils isolés. Utile court terme, dangereux si les canaux flambent.',
  hide_xen: 'Les vecteurs biologiques Xen sont décrits comme anomalies sanitaires locales. Très risqué si quarantaine visible.',
  hide_casualties: 'Les pertes civiles sont déplacées en catégorie transfert, relogement ou absence de recensement.',
  inflate_productivity: 'La production est surévaluée et les déficits de rations sont imputés à la discipline citoyenne.',
  model_city: 'Le rapport est massivement nettoyé pour présenter une cité stable, loyale et productive.',
  sympathizer_cover: 'Le rapport protège certains civils/réseaux médicaux, réduit les traces de pertes et cache des évacuations non autorisées.',
};

function alter(stats: Stats, policy: ReportPolicy): Stats {
  const out = { ...stats };
  if (policy === 'truthful') return out;
  if (policy === 'minimize_rebellion') {
    out.rebel = clamp(out.rebel - 24);
    out.stability = clamp(out.stability + 8);
    out.info = clamp(out.info + 6);
  }
  if (policy === 'hide_xen') {
    out.xen = clamp(out.xen - 28);
    out.stability = clamp(out.stability + 6);
    out.civilianLosses = Math.max(0, Math.round(out.civilianLosses * 0.86));
  }
  if (policy === 'hide_casualties') {
    out.civilianLosses = Math.max(0, Math.round(out.civilianLosses * 0.35));
    out.loyalty = clamp(out.loyalty + 5);
    out.fear = clamp(out.fear - 4);
  }
  if (policy === 'inflate_productivity') {
    out.production = clamp(out.production + 22, 0, 120);
    out.rations = Math.round(out.rations + 420);
    out.stability = clamp(out.stability + 4);
  }
  if (policy === 'model_city') {
    out.stability = clamp(Math.max(out.stability, 76));
    out.loyalty = clamp(Math.max(out.loyalty, 52));
    out.fear = clamp(Math.min(out.fear, 44));
    out.rebel = clamp(Math.min(out.rebel, 16));
    out.xen = clamp(Math.min(out.xen, 12));
    out.production = clamp(Math.max(out.production, 82), 0, 120);
    out.civilianLosses = Math.max(0, Math.round(out.civilianLosses * 0.25));
    out.combineLosses = Math.max(0, Math.round(out.combineLosses * 0.65));
  }
  if (policy === 'sympathizer_cover') {
    out.rebel = clamp(out.rebel - 12);
    out.civilianLosses = Math.max(0, Math.round(out.civilianLosses * 0.5));
    out.loyalty = clamp(out.loyalty - 6);
    out.info = clamp(out.info + 4);
    out.suspicion = clamp(out.suspicion - 4);
  }
  return out;
}

function diffFields(real: Stats, transmitted: Stats): Array<keyof Stats> {
  return (Object.keys(real) as Array<keyof Stats>).filter((key) => real[key] !== transmitted[key]);
}

function scoreDifference(real: Stats, transmitted: Stats, fields: Array<keyof Stats>): number {
  return fields.reduce((acc, key) => {
    const weight = key === 'civilianLosses' ? 0.08 : key === 'rations' ? 0.015 : key === 'production' ? 1.2 : 1;
    return acc + Math.abs(real[key] - transmitted[key]) * weight;
  }, 0);
}

export function buildTransmittedReport(args: { realStats: Stats; realLines: string[]; policy: ReportPolicy; day: number; city: string }): ReportTransmission {
  const transmittedStats = alter(args.realStats, args.policy);
  const falsifiedFields = diffFields(args.realStats, transmittedStats);
  const rawScore = scoreDifference(args.realStats, transmittedStats, falsifiedFields);
  const falsificationScore = clamp(rawScore, 0, 100);
  const policyHeat = args.policy === 'truthful' ? 0 : args.policy === 'model_city' ? 30 : args.policy === 'sympathizer_cover' ? 22 : 14;
  const auditRisk = clamp(policyHeat + falsificationScore * 0.55 + args.realStats.suspicion * 0.35 + (args.realStats.citadel < 35 ? 12 : 0));
  const suspicionDelta = args.policy === 'truthful' ? (args.realStats.rebel > 70 || args.realStats.xen > 70 ? 4 : -1) : Math.ceil(auditRisk / 16);
  const classification: ReportTransmission['classification'] = falsificationScore === 0 ? 'TRUTHFUL' : falsificationScore < 22 ? 'SANITIZED' : falsificationScore < 55 ? 'FALSIFIED' : 'DANGEROUSLY_FALSIFIED';

  const transmittedLines = [
    `TRANSMISSION CITADEL — CITY ${args.city} — JOUR ${String(args.day).padStart(3, '0')}`,
    `Politique de rapport : ${reportPolicyLabels[args.policy]}.`,
    `Stabilité transmise : ${transmittedStats.stability}%.`,
    `Activité anti-citoyenne transmise : ${transmittedStats.rebel}%.`,
    `Contamination biologique transmise : ${transmittedStats.xen}%.`,
    `Production transmise : ${transmittedStats.production}%.`,
    `Pertes civiles transmises : ${transmittedStats.civilianLosses}.`,
    classification === 'TRUTHFUL'
      ? 'COAN : rapport exact, aucune distorsion statistique détectée.'
      : `COAN : rapport ${classification.toLowerCase()} — champs altérés : ${falsifiedFields.join(', ')}.`,
    `Risque audit Advisor estimé : ${auditRisk}%.`,
  ];

  return { transmittedStats, transmittedLines, falsificationScore, auditRisk, falsifiedFields, suspicionDelta, classification };
}

export function resolveAdvisorAudit(args: { day: number; auditRisk: number; suspicion: number; falsificationScore: number; policy: ReportPolicy }): { triggered: boolean; discovered: boolean; effects: Partial<Stats>; lines: string[] } {
  const deterministicRoll = Math.abs((args.day * 37 + args.suspicion * 11 + args.falsificationScore * 5) % 100);
  const triggered = args.auditRisk >= 72 || deterministicRoll < Math.max(8, args.auditRisk * 0.28);
  if (!triggered) return { triggered: false, discovered: false, effects: {}, lines: ['Aucun audit Advisor déclenché sur cette transmission.'] };

  const discoveryThreshold = clamp(args.auditRisk + args.falsificationScore * 0.4 + (args.policy === 'model_city' ? 16 : 0));
  const discoveryRoll = Math.abs((args.day * 91 + args.suspicion * 17 + args.auditRisk * 3) % 100);
  const discovered = discoveryRoll < discoveryThreshold;

  if (!discovered) {
    return {
      triggered: true,
      discovered: false,
      effects: { suspicion: 5, citadel: 2 },
      lines: [
        'Audit Advisor superficiel : incohérences non prouvées.',
        'La Citadelle conserve la transmission mais marque le dossier pour observation différée.',
      ],
    };
  }

  const severity = args.falsificationScore > 60 ? 'majeure' : 'partielle';
  return {
    triggered: true,
    discovered: true,
    effects: { suspicion: 24, citadel: -16, fear: 8, stability: -8, loyalty: -6 },
    lines: [
      `AUDIT ADVISOR : falsification ${severity} détectée dans la transmission administrative.`,
      'Sanction : autorité locale réduite, surveillance personnelle accrue, menace de remplacement enregistrée.',
    ],
  };
}
