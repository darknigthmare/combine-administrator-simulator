import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { combineUnits } from '../../data/combineUnits';
import { Shield, Eye, Flame, ShieldAlert, Cpu, Database, UserCheck, Star } from 'lucide-react';
import { combineProtocols } from '../../data/loreNames';

export const CombineManagement: React.FC = () => {
  const { combineReserve, sectors, stats } = useGameStore();

  // Calculate total deployed units of each type
  const totalDeployed: Record<string, number> = {};
  sectors.forEach(s => {
    Object.entries(s.unitsDeployed).forEach(([unitId, count]) => {
      totalDeployed[unitId] = (totalDeployed[unitId] || 0) + count;
    });
  });

  const getActiveProtocol = () => {
    if (stats.rebelActivity >= 70) return combineProtocols[3]; // OVERWATCH RESPONSE
    if (stats.xenContamination >= 50) return combineProtocols[2]; // QUARANTINE LOCK
    if (stats.rations < 200) return combineProtocols[5]; // RATION CONTROL
    return combineProtocols[0]; // STABILIZATION-17
  };

  const activeProtocol = getActiveProtocol();

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* 1. Active Combine Protocol Banner */}
      <div className="border border-cyan-500/20 bg-cyan-950/15 rounded p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
            PROTOCOLE DE SÉCURITÉ EN VIGUEUR
          </div>
          <h3 className="text-sm font-bold text-slate-200 uppercase flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
            {activeProtocol.code} — {activeProtocol.name}
          </h3>
          <p className="text-[10px] text-slate-400 leading-normal max-w-xl">
            {activeProtocol.description}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 px-3 py-2 rounded shrink-0">
          <span className="text-[8px] text-slate-500 block uppercase">Niveau de menace global</span>
          <span className="text-orange-400 font-bold text-xs">RÉB: {stats.rebelActivity}% // XEN: {stats.xenContamination}%</span>
        </div>
      </div>

      {/* 2. Global Fleet Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0d141b]/60 border border-slate-800 rounded p-4 flex items-center gap-3">
          <Shield className="w-8 h-8 text-cyan-400" />
          <div>
            <div className="text-[9px] text-slate-500 uppercase">Milice Civile (CP)</div>
            <div className="text-base font-bold text-slate-200 mt-0.5">
              {(totalDeployed['cp_metro'] || 0) + (combineReserve['cp_metro'] || 0)} Unités
            </div>
            <span className="text-[9px] text-slate-500">
              {totalDeployed['cp_metro'] || 0} Déployées / {combineReserve['cp_metro'] || 0} en Réserve
            </span>
          </div>
        </div>
        
        <div className="bg-[#0d141b]/60 border border-slate-800 rounded p-4 flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-orange-400" />
          <div>
            <div className="text-[9px] text-slate-500 uppercase">Infanterie Overwatch</div>
            <div className="text-base font-bold text-slate-200 mt-0.5">
              {combineUnits
                .filter(u => u.category === 'overwatch')
                .reduce((acc, u) => acc + (totalDeployed[u.id] || 0) + (combineReserve[u.id] || 0), 0)}{' '}
              Soldats
            </div>
            <span className="text-[9px] text-slate-500">
              Asservissement neurologique transhumain complet.
            </span>
          </div>
        </div>

        <div className="bg-[#0d141b]/60 border border-slate-800 rounded p-4 flex items-center gap-3">
          <Star className="w-8 h-8 text-purple-400 animate-pulse" />
          <div>
            <div className="text-[9px] text-slate-500 uppercase">Forces Synth & Advisors</div>
            <div className="text-base font-bold text-slate-200 mt-0.5">
              {combineUnits
                .filter(u => u.category === 'heavy' || u.category === 'advisor')
                .reduce((acc, u) => acc + (totalDeployed[u.id] || 0) + (combineReserve[u.id] || 0), 0)}{' '}
              Unités actives
            </div>
            <span className="text-[9px] text-slate-500">
              Armement lourd de pacification dimensionnelle.
            </span>
          </div>
        </div>
      </div>

      {/* 3. Detailed Units Roster */}
      <div className="border border-slate-800 bg-[#0d141b]/40 rounded p-4 space-y-3">
        <h4 className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-850 pb-2 flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5" />
          Roster Complet des Forces de l'Union Universelle
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {combineUnits.map(unit => {
            const dep = totalDeployed[unit.id] || 0;
            const res = combineReserve[unit.id] || 0;
            const tot = dep + res;

            return (
              <div key={unit.id} className="border border-slate-900 bg-slate-950/40 rounded p-3 flex flex-col justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex justify-between items-start gap-1">
                    <span className="font-bold text-slate-200">{unit.name}</span>
                    <span className="text-[9px] font-bold text-cyan-400 bg-cyan-950/20 px-1 border border-cyan-950 rounded uppercase">
                      {unit.category}
                    </span>
                  </div>
                  <div className="text-[9.5px] text-slate-400 font-semibold italic">{unit.role}</div>
                  <p className="text-[9px] text-slate-500 leading-normal">{unit.description}</p>
                </div>

                <div className="border-t border-slate-900/60 pt-2 grid grid-cols-3 gap-2 text-[9px] text-slate-500">
                  <div>
                    <span>Combat</span>
                    <span className="block font-bold text-slate-300">{unit.power}</span>
                  </div>
                  <div>
                    <span>Surveillance</span>
                    <span className="block font-bold text-slate-300">+{unit.surveillanceBoost}%</span>
                  </div>
                  <div>
                    <span>Coût</span>
                    <span className="block font-bold text-slate-300">{unit.cost} R.</span>
                  </div>
                </div>

                <div className="border-t border-slate-900/60 pt-2 flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">Affectation Cité :</span>
                  <span className="font-bold text-slate-300">
                    <span className="text-cyan-400 font-bold">{dep}</span> Déployé(s) /{' '}
                    <span className="text-slate-400 font-bold">{res}</span> Réserve
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
