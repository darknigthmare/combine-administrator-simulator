import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { CitySector, SectorStatus } from '../../types/game';
import { SectorDetailsModal } from './SectorDetailsModal';
import { Shield, Eye, Flame, Biohazard, ShieldAlert, Users, Radio, Wrench } from 'lucide-react';

export const CityMap: React.FC = () => {
  const { sectors } = useGameStore();
  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null);

  const selectedSector = sectors.find(s => s.id === selectedSectorId) || null;

  const getStatusColor = (status: SectorStatus) => {
    switch (status) {
      case 'Contrôle Combine total': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Stable': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Surveillé': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Sous couvre-feu': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'En quarantaine': return 'bg-purple-950/40 text-purple-400 border-purple-500/30 animate-pulse';
      case 'Insurgé': return 'bg-orange-950/40 text-orange-400 border-orange-500/35';
      case 'Saboté': return 'bg-red-950/40 text-red-400 border-red-500/35';
      case 'Contaminé':
      case 'Infesté':
        return 'bg-purple-950/50 text-purple-300 border-purple-800/40';
      case 'Scellé': return 'bg-slate-900/60 text-slate-500 border-slate-800';
      case 'Bombardé': return 'bg-red-950/30 text-red-500 border-red-950/40';
      case 'Abandonné': return 'bg-slate-950 text-slate-600 border-slate-900';
      default:
        return 'bg-slate-900 text-slate-400 border-slate-800';
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
    <div className="space-y-6">
      {/* Map header */}
      <div className="border border-slate-800 bg-[#0d141b]/60 rounded p-4 font-mono text-xs flex justify-between items-center gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-200 uppercase flex items-center gap-2">
            <Radio className="w-4.5 h-4.5 text-cyan-400 animate-pulse" />
            Matrice de Dispersion et Surveillance Urbaine
          </h2>
          <p className="text-[10px] text-slate-400 mt-1">
            Sélectionner un secteur pour allouer la CP, décréter des quarantaines ou ordonner des pacifications militaires.
          </p>
        </div>
      </div>

      {/* Grid of Sectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 font-mono">
        {sectors.map(sec => {
          const isClosed = sec.status === 'Scellé' || sec.status === 'Abandonné';
          const deployedCount = Object.values(sec.unitsDeployed).reduce((a, b) => a + b, 0);

          return (
            <button
              key={sec.id}
              onClick={() => setSelectedSectorId(sec.id)}
              className="border border-slate-800 bg-[#0d141b]/40 hover:bg-[#0d141b]/60 rounded p-3 flex flex-col justify-between gap-3 text-left transition-all duration-200 hover:border-cyan-500/50 hover:shadow-[0_0_8px_rgba(6,182,212,0.1)] active:scale-98"
            >
              {/* Sector Name and Strategic Importance */}
              <div className="w-full space-y-1">
                <div className="flex justify-between items-start gap-1">
                  <span className="font-bold text-slate-200 text-[11px] truncate leading-tight" title={sec.name}>
                    {sec.name}
                  </span>
                  <span className={`text-[8px] font-bold border px-1 rounded uppercase tracking-wider ${getStrategicBadge(sec.strategicImportance)}`}>
                    {sec.strategicImportance.substring(0, 4)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-[9px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-slate-500" />
                    <span>{sec.population}</span>
                  </span>
                  {deployedCount > 0 && (
                    <span className="text-cyan-400 font-bold bg-cyan-950/20 px-1 border border-cyan-950 rounded">
                      {deployedCount} U.
                    </span>
                  )}
                </div>
              </div>

              {/* Threat gauges */}
              {!isClosed ? (
                <div className="space-y-1.5 w-full text-[9px] border-t border-b border-slate-900 py-2">
                  {/* Rebel activity */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-slate-500">
                      <span>RÉB</span>
                      <span className="text-orange-400 font-bold">{sec.rebelRisk}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded overflow-hidden">
                      <div className="bg-orange-500 h-full" style={{ width: `${sec.rebelRisk}%` }}></div>
                    </div>
                  </div>
                  {/* Xen contamination */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-slate-500">
                      <span>XEN</span>
                      <span className="text-purple-400 font-bold">{sec.xenContamination}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded overflow-hidden">
                      <div className="bg-purple-500 h-full" style={{ width: `${sec.xenContamination}%` }}></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-slate-600 italic text-[9px] py-4 text-center border-t border-b border-slate-900 select-none">
                  SECTEUR VERROUILLÉ
                </div>
              )}

              {/* Status Badge */}
              <div className={`w-full text-center border py-1 rounded text-[9px] uppercase font-bold tracking-wider ${getStatusColor(sec.status)}`}>
                {sec.status}
              </div>
            </button>
          );
        })}
      </div>

      {/* Sector Details Modal */}
      {selectedSector && (
        <SectorDetailsModal
          sector={selectedSector}
          onClose={() => setSelectedSectorId(null)}
        />
      )}
    </div>
  );
};
