import type { GameState, TabId } from '../types/game';
import { terminalInterfaces, terminalInterfaceOrder, type TerminalInterfaceDefinition, type TerminalInterfaceId } from '../data/terminalInterfaces';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

export function getTerminalInterface(id: TerminalInterfaceId): TerminalInterfaceDefinition {
  return terminalInterfaces[id];
}

export function getTerminalInterfaceForTab(tab: TabId): TerminalInterfaceDefinition {
  return terminalInterfaceOrder.map((id) => terminalInterfaces[id]).find((terminal) => terminal.tabs.includes(tab)) ?? terminalInterfaces.city;
}

export function getTerminalSwitchTarget(id: TerminalInterfaceId): TabId {
  return terminalInterfaces[id].defaultTab;
}

export function getTerminalNavTabs(activeId: TerminalInterfaceId, allTabs: Array<[TabId, string]>): Array<[TabId, string]> {
  const allowed = new Set(terminalInterfaces[activeId].tabs);
  return allTabs.filter(([id]) => allowed.has(id));
}

export type TerminalInterfaceStatus = {
  terminal: TerminalInterfaceDefinition;
  integrity: number;
  risk: number;
  focusLine: string;
  secondaryLine: string;
  warningLine: string;
  recommendedTab: TabId;
  metrics: Array<{ label: string; value: string | number; danger?: boolean }>;
};

export function buildTerminalInterfaceStatus(game: GameState, terminalId?: TerminalInterfaceId): TerminalInterfaceStatus {
  const terminal = terminalId ? terminalInterfaces[terminalId] : getTerminalInterfaceForTab(game.tab);
  const latestReport = game.reports[0];
  const hottestSector = [...game.sectors].sort((a, b) => (b.rebel + b.xen + (100 - b.infrastructure)) - (a.rebel + a.xen + (100 - a.infrastructure)))[0];

  if (terminal.id === 'nova') {
    const risk = clamp((100 - game.novaProspekt.secrecy) * 0.4 + game.novaProspekt.instability * 0.35 + game.novaProspekt.xenBreachRisk * 0.25);
    return {
      terminal,
      integrity: clamp((game.novaProspekt.security + game.novaProspekt.secrecy + game.novaProspekt.authority) / 3 - game.novaProspekt.instability * 0.25),
      risk,
      focusLine: `Manifestes Razor : ${game.novaProspekt.totalTransferred} transferts / ${game.novaProspekt.escaped} évadés confirmés.`,
      secondaryLine: `Biotics sous pression ${game.novaProspekt.bioticsPressure}% · secret ${game.novaProspekt.secrecy}% · intelligence ${game.novaProspekt.intelligence}%.`,
      warningLine: risk > 70 ? 'Risque de rupture narrative Nova : les disparitions peuvent devenir mythe Lambda.' : 'Complexe externe opérationnel, mais chaque transfert augmente la dette sociale.',
      recommendedTab: 'nova',
      metrics: [
        { label: 'Sécurité', value: game.novaProspekt.security },
        { label: 'Secret', value: game.novaProspekt.secrecy, danger: game.novaProspekt.secrecy < 45 },
        { label: 'Instabilité', value: game.novaProspekt.instability, danger: game.novaProspekt.instability > 65 },
        { label: 'Brèche Xen', value: game.novaProspekt.xenBreachRisk, danger: game.novaProspekt.xenBreachRisk > 55 },
      ],
    };
  }

  if (terminal.id === 'citadel') {
    const activeProtocols = game.citadelDirectiveTree.completedNodes.length + game.combineTechnology.researchedNodes.length;
    const risk = clamp(game.auditHeat * 0.35 + game.stats.suspicion * 0.4 + (100 - game.stats.citadel) * 0.25);
    return {
      terminal,
      integrity: clamp(game.stats.citadel * 0.55 + game.stats.combine * 0.25 + game.combineTechnology.containmentGrid * 0.2 - game.auditHeat * 0.2),
      risk,
      focusLine: `${activeProtocols} protocoles Citadel/technologie actifs · audit ${game.auditHeat}%.`,
      secondaryLine: `Directive active : ${game.directive.title} (${game.directiveDays} jours restants).`,
      warningLine: risk > 70 ? 'Attention Advisor : contradictions de rapports et dette technologique attirent la supervision directe.' : 'Canal Citadel stable. Les protocoles peuvent encore être empilés sans rupture immédiate.',
      recommendedTab: risk > 70 ? 'reports' : 'citadel',
      metrics: [
        { label: 'Citadel', value: game.stats.citadel, danger: game.stats.citadel < 35 },
        { label: 'Audit', value: game.auditHeat, danger: game.auditHeat > 65 },
        { label: 'Suspicion', value: game.stats.suspicion, danger: game.stats.suspicion > 65 },
        { label: 'Tech debt', value: game.combineTechnology.maintenanceDebt, danger: game.combineTechnology.maintenanceDebt > 65 },
      ],
    };
  }

  if (terminal.id === 'quarantine') {
    const risk = clamp(game.stats.xen * 0.35 + game.xenMutation.mutationVelocity * 0.25 + game.quarantineZones.ravenholmMemoryIndex * 0.2 + game.xenCatastrophes.totalCatastropheRisk * 0.2);
    return {
      terminal,
      integrity: clamp(game.quarantineZones.containmentIndex * 0.45 + game.vortigaunts.quarantineAid * 0.25 + game.xenResearch.containmentIntegrity * 0.2 - game.xenMutation.mutationVelocity * 0.18),
      risk,
      focusLine: `${game.quarantineZones.fullCount + game.quarantineZones.sealedCount + game.quarantineZones.lostCount} zones sous quarantaine lourde · mémoire Ravenholm ${game.quarantineZones.ravenholmMemoryIndex}%.`,
      secondaryLine: `Mutation ${game.xenMutation.mutationVelocity}% · catastrophes ${game.xenCatastrophes.totalCatastropheRisk}% · lab containment ${game.xenResearch.containmentIntegrity}%.`,
      warningLine: risk > 70 ? 'La biosphère Xen devient autonome : containment, Vortessence ou sacrifice sectoriel requis.' : 'Contamination lisible. Les vecteurs biologiques restent encore administrables.',
      recommendedTab: risk > 70 ? 'xen_catastrophes' : 'xen',
      metrics: [
        { label: 'Xen', value: game.stats.xen, danger: game.stats.xen > 65 },
        { label: 'Containment', value: game.quarantineZones.containmentIndex, danger: game.quarantineZones.containmentIndex < 35 },
        { label: 'Mutation', value: game.xenMutation.mutationVelocity, danger: game.xenMutation.mutationVelocity > 60 },
        { label: 'Ravenholm', value: game.quarantineZones.ravenholmMemoryIndex, danger: game.quarantineZones.ravenholmMemoryIndex > 45 },
      ],
    };
  }

  const risk = clamp(game.stats.rebel * 0.3 + Math.round((game.population.vulnerable / Math.max(1, game.population.total)) * 100) * 0.2 + game.rationEconomy.blackMarketIndex * 0.2 + game.civilProtection.abuseReportIndex * 0.15 + game.stats.fatigue * 0.15);
  return {
    terminal,
    integrity: clamp(game.stats.stability * 0.35 + game.stats.info * 0.25 + game.stats.production * 0.2 + game.population.complianceIndex * 0.2 - risk * 0.15),
    risk,
    focusLine: `Secteur prioritaire : ${hottestSector?.name ?? 'aucun'} · statut ${hottestSector?.status ?? 'stable'}.`,
    secondaryLine: `Rations ${game.rationEconomy.reserves} · marché noir ${game.rationEconomy.blackMarketIndex}% · conformité ${game.population.complianceIndex}%.`,
    warningLine: latestReport?.auditDiscovered ? 'Rapport précédent compromis : la façade City ne suffit plus à masquer les contradictions.' : 'City Terminal priorise la stabilité visible et la continuité de production.',
    recommendedTab: risk > 70 ? 'civil_protection' : 'dashboard',
    metrics: [
      { label: 'Stabilité', value: game.stats.stability, danger: game.stats.stability < 35 },
      { label: 'Lambda', value: game.stats.rebel, danger: game.stats.rebel > 65 },
      { label: 'Rations', value: game.rationEconomy.reserves, danger: game.rationEconomy.reserves < game.rationEconomy.dailyNeed },
      { label: 'Abus CP', value: game.civilProtection.abuseReportIndex, danger: game.civilProtection.abuseReportIndex > 65 },
    ],
  };
}
