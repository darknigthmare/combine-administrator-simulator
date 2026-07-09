import type { RouteType, Sector, SectorConnection } from '../types/game';

export type NetworkLink = SectorConnection & {
  from: string;
  fromName: string;
  toName: string;
  reverseDeclared: boolean;
};

export type SectorPressure = {
  rebelPressure: number;
  xenPressure: number;
  combineIsolation: number;
  highestRiskRoute: number;
  routeCount: number;
  notes: string[];
};

const routeWeight: Record<RouteType, number> = {
  surface: 1,
  canal: 1.35,
  sewer: 1.45,
  rail: 0.9,
  citadel: 0.55,
  quarantine: 1.6,
  service: 1.2,
};

export function getSectorById(sectors: Sector[], id: string) {
  return sectors.find((sector) => sector.id === id);
}

export function getNetworkLinks(sectors: Sector[]): NetworkLink[] {
  const byId = new Map(sectors.map((sector) => [sector.id, sector]));
  const seen = new Set<string>();
  const links: NetworkLink[] = [];

  for (const from of sectors) {
    for (const connection of from.connections) {
      const to = byId.get(connection.to);
      if (!to) continue;
      const key = [from.id, to.id].sort().join('::');
      if (seen.has(key)) continue;
      seen.add(key);
      const reverseDeclared = to.connections.some((candidate) => candidate.to === from.id);
      links.push({ ...connection, from: from.id, fromName: from.name, toName: to.name, reverseDeclared });
    }
  }

  return links;
}

export function getConnectedSectors(sectors: Sector[], sectorId: string): Array<{ sector: Sector; connection: SectorConnection; direction: 'out' | 'in' }> {
  const selected = getSectorById(sectors, sectorId);
  if (!selected) return [];
  const direct = selected.connections
    .map((connection) => {
      const sector = getSectorById(sectors, connection.to);
      return sector ? { sector, connection, direction: 'out' as const } : null;
    })
    .filter(Boolean) as Array<{ sector: Sector; connection: SectorConnection; direction: 'out' }>;

  const incoming = sectors.flatMap((candidate) => {
    if (candidate.id === sectorId) return [];
    const connection = candidate.connections.find((item) => item.to === sectorId);
    if (!connection) return [];
    if (direct.some((item) => item.sector.id === candidate.id)) return [];
    return [{ sector: candidate, connection: { ...connection, to: candidate.id }, direction: 'in' as const }];
  });

  return [...direct, ...incoming].sort((a, b) => b.connection.risk - a.connection.risk);
}

export function getSectorPressure(sectors: Sector[], sectorId: string): SectorPressure {
  const neighbors = getConnectedSectors(sectors, sectorId);
  if (neighbors.length === 0) {
    return { rebelPressure: 0, xenPressure: 0, combineIsolation: 100, highestRiskRoute: 0, routeCount: 0, notes: ['Secteur isolé : aucune route déclarée.'] };
  }

  let rebelScore = 0;
  let xenScore = 0;
  let maxRisk = 0;
  let combineControlled = 0;
  const notes: string[] = [];

  for (const { sector, connection } of neighbors) {
    const weightedRisk = connection.risk * routeWeight[connection.type];
    rebelScore += sector.rebel * weightedRisk / 100;
    xenScore += sector.xen * weightedRisk / 100;
    maxRisk = Math.max(maxRisk, connection.risk);
    if (connection.controlledBy === 'Combine') combineControlled += 1;
    if (connection.controlledBy === 'Resistance') notes.push(`${connection.label} : route Lambda probable depuis ${sector.name}.`);
    if (connection.controlledBy === 'Xen') notes.push(`${connection.label} : vecteur biologique depuis ${sector.name}.`);
  }

  return {
    rebelPressure: Math.round(rebelScore / neighbors.length),
    xenPressure: Math.round(xenScore / neighbors.length),
    combineIsolation: Math.round(100 - (combineControlled / neighbors.length) * 100),
    highestRiskRoute: maxRisk,
    routeCount: neighbors.length,
    notes: notes.length ? notes.slice(0, 4) : ['Routes majoritairement surveillées, mais la pression dépendra de la simulation de propagation.'],
  };
}
