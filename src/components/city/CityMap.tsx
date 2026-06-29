import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { CitySector, SectorStatus } from '../../types/game';
import { SectorDetailsModal } from './SectorDetailsModal';
import { CCTVFeed } from './CCTVFeed';
import { Shield, Eye, Flame, Biohazard, ShieldAlert, Users, Radio, Wrench, Siren, EyeOff } from 'lucide-react';

// Coordinates mapping for SVG node layout
const sectorCoords: Record<string, { x: number; y: number }> = {
  citadel_approach: { x: 300, y: 70 },
  admin_plaza: { x: 300, y: 140 },
  transit_station: { x: 170, y: 110 },
  residential_a: { x: 420, y: 110 },
  residential_b: { x: 480, y: 180 },
  workers_quarter: { x: 220, y: 180 },
  cp_outpost: { x: 350, y: 200 },
  breencast_relay: { x: 400, y: 60 },
  razor_rail: { x: 80, y: 130 },
  warehouse_sector: { x: 90, y: 200 },
  industrial_comp: { x: 140, y: 260 },
  tech_sub: { x: 310, y: 270 },
  abandoned_hosp: { x: 440, y: 240 },
  ruins: { x: 550, y: 120 },
  sewers: { x: 380, y: 310 },
  canals: { x: 230, y: 330 },
  quarantine_zone: { x: 510, y: 280 },
  periphery: { x: 160, y: 360 }
};

export const CityMap: React.FC = () => {
  const { sectors } = useGameStore();
  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const selectedSector = sectors.find(s => s.id === selectedSectorId) || null;

  const getStatusColor = (status: SectorStatus) => {
    switch (status) {
      case 'Contrôle Combine total': return '#00d4ff';
      case 'Stable': return '#22c55e';
      case 'Surveillé': return '#3b82f6';
      case 'Sous couvre-feu': return '#eab308';
      case 'En quarantaine': return '#a855f7';
      case 'Insurgé': return '#f97316';
      case 'Saboté': return '#ef4444';
      case 'Contaminé':
      case 'Infesté':
        return '#d8b4fe';
      case 'Scellé': return '#64748b';
      case 'Bombardé': return '#ef4444';
      case 'Abandonné': return '#334155';
      default:
        return '#475569';
    }
  };

  const getStrategicBadge = (importance: string) => {
    switch (importance) {
      case 'Critical': return 'text-red-400 border-red-500/30 bg-red-950/20';
      case 'High': return 'text-orange-400 border-orange-500/30 bg-orange-950/20';
      case 'Medium': return 'text-yellow-400 border-yellow-500/30 bg-yellow-950/10';
      default:
        return 'text-slate-400 border-slate-800 bg-slate-900/30';
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Map header */}
      <div className="border border-slate-800 bg-[#0d141b]/60 rounded p-4 flex justify-between items-center gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-200 uppercase flex items-center gap-2">
            <Radio className="w-4.5 h-4.5 text-cyan-400 animate-pulse" />
            Matrice Tactique Topologique // City Map 2D
          </h2>
          <p className="text-[10px] text-slate-400 mt-1">
            Visualisation holographique du réseau urbain de l'Union Universelle. Cliquez sur un noeud pour déployer des forces.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* SVG Tactical Map Network */}
        <div className="flex-1 bg-slate-950/80 border border-slate-900 rounded p-4 relative min-h-[440px] flex items-center justify-center overflow-hidden">
          
          {/* Hologram sweep line */}
          <div className="absolute top-0 bottom-0 w-full bg-linear-to-b from-transparent via-cyan-950/5 to-transparent bg-[size:100%_40px] pointer-events-none opacity-40"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#083344_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>

          {/* Map canvas */}
          <svg className="w-full h-full max-w-[620px] max-h-[420px] z-10 select-none" viewBox="0 0 620 420">
            {/* Draw Links/Connections */}
            {sectors.map(sec => {
              const fromCoords = sectorCoords[sec.id];
              if (!fromCoords) return null;

              return sec.connections.map(targetId => {
                const toCoords = sectorCoords[targetId];
                if (!toCoords || sec.id > targetId) return null; // Avoid duplicate link drawing

                const isBlocked = sec.status === 'Scellé' || sec.status === 'Abandonné' || 
                                  sectors.find(t => t.id === targetId)?.status === 'Scellé';

                return (
                  <line
                    key={`${sec.id}-${targetId}`}
                    x1={fromCoords.x}
                    y1={fromCoords.y}
                    x2={toCoords.x}
                    y2={toCoords.y}
                    stroke={isBlocked ? '#1e293b' : '#00d4ff'}
                    strokeWidth={isBlocked ? '1' : '1.5'}
                    strokeDasharray={isBlocked ? '3 3' : 'none'}
                    className="opacity-40"
                  />
                );
              });
            })}

            {/* Draw Halos and Nodes */}
            {sectors.map(sec => {
              const coords = sectorCoords[sec.id];
              if (!coords) return null;

              const isClosed = sec.status === 'Scellé' || sec.status === 'Abandonné';
              const isSelected = selectedSectorId === sec.id;
              const hasXen = sec.xenContamination > 30;
              const hasRebel = sec.rebelRisk > 40;
              const statusColor = getStatusColor(sec.status);

              return (
                <g
                  key={sec.id}
                  onClick={() => setSelectedSectorId(sec.id)}
                  className="cursor-pointer group"
                >
                  {/* Xen contamination pulse halo */}
                  {!isClosed && hasXen && (
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={14 + sec.xenContamination * 0.15}
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="1.2"
                      strokeDasharray="2 2"
                      className="opacity-60 animate-spin-slow"
                    />
                  )}

                  {/* Rebel threat pulse halo */}
                  {!isClosed && hasRebel && (
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={10 + sec.rebelRisk * 0.12}
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="1"
                      className="opacity-50 animate-pulse"
                    />
                  )}

                  {/* Target reticle for active selection */}
                  {isSelected && (
                    <g>
                      <circle cx={coords.x} cy={coords.y} r={16} fill="none" stroke="#eab308" strokeWidth="1" className="animate-pulse" />
                      <line x1={coords.x - 22} y1={coords.y} x2={coords.x - 12} y2={coords.y} stroke="#eab308" strokeWidth="0.8" />
                      <line x1={coords.x + 12} y1={coords.y} x2={coords.x + 22} y2={coords.y} stroke="#eab308" strokeWidth="0.8" />
                      <line x1={coords.x} y1={coords.y - 22} x2={coords.x} y2={coords.y - 12} stroke="#eab308" strokeWidth="0.8" />
                      <line x1={coords.x} y1={coords.y + 12} x2={coords.x} y2={coords.y + 22} stroke="#eab308" strokeWidth="0.8" />
                    </g>
                  )}

                  {/* Central Node Circle */}
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={isSelected ? 6 : 4.5}
                    fill={statusColor}
                    stroke="#070b0e"
                    strokeWidth="1.5"
                    className="transition-all group-hover:scale-125"
                  />

                  {/* Text Label */}
                  <text
                    x={coords.x}
                    y={coords.y - (isSelected ? 11 : 9)}
                    fill={isSelected ? '#e2e8f0' : '#94a3b8'}
                    fontSize={isSelected ? '9' : '8'}
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="pointer-events-none group-hover:fill-slate-100 select-none uppercase tracking-wide"
                  >
                    {sec.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Sidebar displaying selected Sector Camera Feed and key operations */}
        <div className="w-full lg:w-80 space-y-4">
          <CCTVFeed sectorId={selectedSectorId} />

          {selectedSector ? (
            <div className="border border-slate-800 bg-[#0d141b]/60 rounded p-4 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-slate-200 text-xs uppercase">{selectedSector.name}</h3>
                  <span className={`text-[8.5px] border px-1.5 py-0.2 rounded font-bold uppercase ${getStrategicBadge(selectedSector.strategicImportance)}`}>
                    {selectedSector.strategicImportance}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500">Statut : <span className="text-slate-300 font-bold uppercase">{selectedSector.status}</span></div>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-950/60 p-2.5 rounded border border-slate-900">
                <div>
                  <span className="text-slate-500 block uppercase text-[8px]">Rationnement local</span>
                  <span className="font-bold text-slate-300">{selectedSector.rations} R.</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase text-[8px]">Infrastructures</span>
                  <span className={`font-bold ${selectedSector.infrastructureStatus < 50 ? 'text-orange-400' : 'text-green-400'}`}>
                    {selectedSector.infrastructureStatus}%
                  </span>
                </div>
              </div>

              {/* Open detail modal button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold uppercase tracking-wider text-[10px] rounded text-center transition flex items-center justify-center gap-1.5 active:scale-98"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Ouvrir la Console Martiale</span>
              </button>
            </div>
          ) : (
            <div className="border border-slate-850 bg-[#0d141b]/30 rounded p-6 text-center text-slate-500 italic select-none">
              Sélectionnez un nœud sur le réseau cartographique pour interagir.
            </div>
          )}
        </div>
      </div>

      {/* Sector Details Modal */}
      {isModalOpen && selectedSector && (
        <SectorDetailsModal
          sector={selectedSector}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
