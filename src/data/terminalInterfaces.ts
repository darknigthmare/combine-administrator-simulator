import type { TabId } from '../types/game';

export type TerminalInterfaceId = 'city' | 'nova' | 'citadel' | 'quarantine';
export type TerminalInterfaceTone = 'civil' | 'detention' | 'overwatch' | 'biohazard';

export type TerminalInterfaceDefinition = {
  id: TerminalInterfaceId;
  label: string;
  shortLabel: string;
  subtitle: string;
  commandHeader: string;
  classification: string;
  tone: TerminalInterfaceTone;
  defaultTab: TabId;
  tabs: TabId[];
  primaryTabs: TabId[];
  statusVocabulary: string[];
  visualDirectives: string[];
  operatorBrief: string;
};

export const terminalInterfaceOrder: TerminalInterfaceId[] = ['city', 'nova', 'citadel', 'quarantine'];

export const terminalInterfaces: Record<TerminalInterfaceId, TerminalInterfaceDefinition> = {
  city: {
    id: 'city',
    label: 'City Terminal',
    shortLabel: 'CITY',
    subtitle: 'Administration civique, secteurs, population, rations et ordre local.',
    commandHeader: 'COMBINE CIVIL AUTHORITY / CITY OPERATIONS',
    classification: 'CIVIL-STABILIZATION / COAN',
    tone: 'civil',
    defaultTab: 'command_deck_v2',
    tabs: ['onboarding', 'command_deck_v2', 'progression', 'campaigns', 'timeline', 'sectors', 'population', 'citizens', 'informants', 'civil_protection', 'resistance', 'rationing', 'propaganda', 'reports', 'decision_history', 'archives', 'video_archives', 'save_system', 'difficulty', 'gameplay_balance', 'atmosphere', 'tauri_packaging', 'ux_polish', 'codex', 'system_audit'],
    primaryTabs: ['onboarding', 'command_deck_v2', 'progression', 'sectors', 'population', 'civil_protection', 'rationing', 'gameplay_balance', 'tauri_packaging', 'ux_polish'],
    statusVocabulary: ['citoyen', 'ration', 'bloc', 'conformité', 'stabilisation', 'surveillance locale'],
    visualDirectives: ['bleu froid', 'ambre administratif', 'grille de secteurs', 'alertes CP', 'scanlines faibles'],
    operatorBrief: 'Interface principale de City : maintenir la façade de normalité Combine tout en absorbant la faim, les dénonciations, les disparitions et la pression Lambda.',
  },
  nova: {
    id: 'nova',
    label: 'Nova Terminal',
    shortLabel: 'NOVA',
    subtitle: 'Transferts, détention, Biotics, interrogatoires et dossiers noirs.',
    commandHeader: 'NOVA PROSPEKT / EXTERNAL INTAKE FACILITY',
    classification: 'DETENTION-BIOTIC / BLACK FILE',
    tone: 'detention',
    defaultTab: 'nova',
    tabs: ['nova', 'vortigaunts', 'citizens', 'informants', 'civil_protection', 'reports', 'decision_history', 'archives', 'video_archives', 'chronicle', 'codex'],
    primaryTabs: ['nova', 'vortigaunts', 'citizens', 'reports'],
    statusVocabulary: ['manifeste Razor', 'intake', 'détainee', 'Biotics', 'traitement mémoire', 'disparition silencieuse'],
    visualDirectives: ['blanc clinique', 'gris carcéral', 'verrous rouges', 'bruit fluorescent', 'dossier noir'],
    operatorBrief: 'Interface de complexe externe : convertir les suspects en renseignement, maintenir le secret des transferts et empêcher Nova Prospekt de devenir un symbole Lambda.',
  },
  citadel: {
    id: 'citadel',
    label: 'Citadel Terminal',
    shortLabel: 'CITADEL',
    subtitle: 'Directives supérieures, Overwatch, technologies, Advisors et verdicts.',
    commandHeader: 'CITADEL RELAY / OVERWATCH ADMINISTRATION',
    classification: 'ADVISOR-SUPERVISED / COMMAND',
    tone: 'overwatch',
    defaultTab: 'citadel',
    tabs: ['citadel', 'technology', 'overwatch', 'combine', 'major_events', 'finale', 'chronicle', 'reports', 'decision_history', 'archives', 'video_archives', 'save_system', 'difficulty', 'gameplay_balance', 'tauri_packaging', 'ux_polish', 'codex', 'system_audit'],
    primaryTabs: ['citadel', 'technology', 'overwatch', 'combine', 'tauri_packaging'],
    statusVocabulary: ['directive', 'mandat', 'Overwatch', 'synth', 'Advisor', 'audit', 'verdict'],
    visualDirectives: ['cyan haute énergie', 'blanc de supervision', 'pulse vertical', 'contrôle dur', 'fenêtres verrouillées'],
    operatorBrief: 'Interface supérieure : aligner City sur les exigences de la Citadelle, absorber les audits Advisor et décider du niveau d’escalade militaire acceptable.',
  },
  quarantine: {
    id: 'quarantine',
    label: 'Quarantine Terminal',
    shortLabel: 'XEN',
    subtitle: 'Biosécurité, écosystème Xen, mutations, recherches et catastrophes.',
    commandHeader: 'BIOHAZARD QUARANTINE GRID / XEN RESPONSE',
    classification: 'XEN-CONTAINMENT / BIOCONTROL',
    tone: 'biohazard',
    defaultTab: 'xen',
    tabs: ['xen', 'xen_research', 'xen_catastrophes', 'vortigaunts', 'sectors', 'population', 'reports', 'decision_history', 'archives', 'video_archives', 'codex', 'system_audit'],
    primaryTabs: ['xen', 'xen_research', 'xen_catastrophes', 'vortigaunts'],
    statusVocabulary: ['spores', 'parasite', 'nid', 'quarantaine', 'Ravenholm-like', 'Vortessence', 'containment'],
    visualDirectives: ['vert malade', 'violet organique', 'glitch humide', 'grille bioscanner', 'alerte parasite'],
    operatorBrief: 'Interface biologique : traiter Xen comme une biosphère étrangère, pas comme une simple jauge. Chaque retard crée une mémoire organique dans City.',
  },
};
