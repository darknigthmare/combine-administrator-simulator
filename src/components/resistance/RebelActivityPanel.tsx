import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Flame, Target, Compass, Skull, AlertCircle, Heart } from 'lucide-react';
import { rebelCellNames } from '../../data/loreNames';

export const RebelActivityPanel: React.FC = () => {
  const { stats, sectors, history } = useGameStore();

  // Dynamically simulate active Rebel cells based on high-risk sectors
  const getSimulatedCells = () => {
    const highRiskSectors = sectors
      .filter(s => s.rebelRisk > 35 && s.status !== 'Scellé' && s.status !== 'Abandonné')
      .sort((a, b) => b.rebelRisk - a.rebelRisk);

    return highRiskSectors.slice(0, 4).map((sec, idx) => {
      // Map to a cell name
      const name = rebelCellNames[idx % rebelCellNames.length];
      
      let status: 'dormant' | 'active' | 'hunted' | 'eliminated' = 'active';
      if (sec.rebelRisk > 70) status = 'active';
      else if (sec.surveillance > 65) status = 'hunted';
      else status = 'dormant';

      const statusLabels = {
        active: { label: 'Active / Insurgée', color: 'text-orange-400 border-orange-500/30 bg-orange-950/20' },
        hunted: { label: 'Traquée / Sous pression', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20' },
        dormant: { label: 'Clandestine / Dormante', color: 'text-slate-400 border-slate-800 bg-slate-900/20' },
        eliminated: { label: 'Éliminée', color: 'text-red-500 border-red-550/30 bg-red-950/10' }
      };

      const statLabel = statusLabels[status];

      return {
        name,
        sectorName: sec.name,
        rebelRisk: sec.rebelRisk,
        surveillance: sec.surveillance,
        statusLabel: statLabel,
        influence: Math.ceil(sec.rebelRisk * 0.8),
      };
    });
  };

  const activeCells = getSimulatedCells();
  const rebelLogs = history.filter(log => log.type === 'event' && (log.message.includes('Lambda') || log.message.includes('Rebel') || log.message.includes('sédition') || log.message.includes('évad') || log.message.includes('radio')));

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* 1. Threat Summary Banner */}
      <div className="border border-orange-500/20 bg-orange-950/10 rounded p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="text-[10px] text-orange-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            INDICE DE SÉDITION DYNAMIQUE EN COURS
          </div>
          <h3 className="text-sm font-bold text-slate-200 uppercase flex items-center gap-2">
            <Flame className="w-4.5 h-4.5 text-orange-400 animate-pulse" />
            RÉSEAU CLANDESTIN LAMBDA : {stats.rebelActivity}%
          </h3>
          <p className="text-[10px] text-slate-400 leading-normal max-w-xl">
            La Résistance recrute dans les secteurs à faible surveillance. La coupure de rations et la fatigue civile favorisent également le recrutement.
          </p>
        </div>
        <div className="bg-[#0b1015] border border-slate-800 px-4 py-2.5 rounded shrink-0">
          <span className="text-[8px] text-slate-500 block uppercase">Loyauté globale de l'opinion</span>
          <span className="text-cyan-400 font-bold text-xs">LOYAUTÉ : {stats.loyalty}% // PEUR : {stats.fear}%</span>
        </div>
      </div>

      {/* 2. List of Active Cells */}
      <div className="border border-slate-800 bg-[#0d141b]/40 rounded p-4 space-y-3">
        <h4 className="text-[10px] text-orange-400 font-bold uppercase tracking-wider border-b border-slate-850 pb-2 flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5" />
          Cellules de Résistance Identifiées
        </h4>

        {activeCells.length === 0 ? (
          <div className="text-slate-500 italic py-8 text-center">
            Aucun réseau clandestin actif détecté en surface. Maintenez une surveillance stricte.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCells.map((cell, idx) => (
              <div key={idx} className="border border-slate-900 bg-slate-950/40 rounded p-4 flex flex-col justify-between gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-slate-200 text-xs block">{cell.name}</span>
                    <span className="text-[8.5px] text-slate-500 block uppercase mt-0.5">Secteur Base : {cell.sectorName}</span>
                  </div>
                  <span className={`text-[8.5px] border px-2 py-0.5 rounded font-bold uppercase tracking-wider ${cell.statusLabel.color}`}>
                    {cell.statusLabel.label}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-slate-900/60 pt-2 text-[9px] text-slate-500">
                  <div>
                    <span>Activité Locale</span>
                    <span className="block font-bold text-orange-400">{cell.rebelRisk}%</span>
                  </div>
                  <div>
                    <span>Surveillance CP</span>
                    <span className="block font-bold text-slate-300">{cell.surveillance}%</span>
                  </div>
                  <div>
                    <span>Influence Pop.</span>
                    <span className="block font-bold text-slate-300">~{cell.influence}%</span>
                  </div>
                </div>

                {/* Progress bars */}
                <div className="space-y-1.5 w-full">
                  <div className="w-full bg-slate-950 h-1.5 rounded overflow-hidden">
                    <div className="bg-orange-500 h-full" style={{ width: `${cell.rebelRisk}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Rebel Activity Logs */}
      <div className="border border-slate-800 bg-[#0d141b]/60 rounded p-4 space-y-3">
        <h4 className="text-[10px] text-orange-400 font-bold uppercase tracking-wider border-b border-slate-850 pb-2 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 animate-spin-slow" />
          Rapports Tactiques Anti-Sédition
        </h4>

        <div className="space-y-1.5 bg-[#05070a] border border-slate-900 rounded p-3 max-h-[160px] overflow-y-auto">
          {rebelLogs.length === 0 ? (
            <p className="text-slate-700 italic text-center py-6">Aucun incident de sédition Lambda répertorié.</p>
          ) : (
            rebelLogs.map((log, i) => (
              <p key={i} className="text-slate-300 border-l-2 border-orange-500 pl-2 leading-relaxed text-[10px]">
                <span className="text-slate-500 font-semibold mr-1">[Jour {log.day}]</span> {log.message}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
