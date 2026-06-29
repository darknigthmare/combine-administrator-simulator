import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Shield, Eye, Flame, Biohazard, Zap, Cpu, Database, Calendar } from 'lucide-react';

export const TopStatusBar: React.FC = () => {
  const { stats, day, cityNumber, activeEvent } = useGameStore();

  const getAlertLevel = (rebelActivity: number) => {
    if (rebelActivity >= 70) return { label: 'CODE D\'AUTONOMIE', color: 'text-red-500 border-red-500 bg-red-950/40 animate-pulse' };
    if (rebelActivity >= 50) return { label: 'ALERTE HAUTE', color: 'text-orange-500 border-orange-500 bg-orange-950/40' };
    if (rebelActivity >= 25) return { label: 'ALERTE MOYENNE', color: 'text-yellow-500 border-yellow-500 bg-yellow-950/20' };
    return { label: 'ALERTE FAIBLE', color: 'text-cyan-500 border-cyan-500 bg-cyan-950/20' };
  };

  const alert = getAlertLevel(stats.rebelActivity);

  return (
    <header className="border-b border-slate-800 bg-[#0b1015] px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono">
      {/* City Identification */}
      <div className="flex items-center gap-3">
        <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold px-3 py-1.5 rounded uppercase tracking-wider text-sm flex items-center gap-2">
          <Cpu className="w-4 h-4 animate-spin-slow" />
          CITY {cityNumber} // UNION UNIVERS
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span>JOUR J-</span>
          <span className="text-slate-200 font-bold text-sm">{String(day).padStart(3, '0')}</span>
        </div>
      </div>

      {/* Global Stat Indicators */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Rations */}
        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded">
          <Database className="w-4 h-4 text-cyan-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase">Rations</span>
            <span className={`font-bold ${stats.rations < 200 ? 'text-red-400 animate-pulse' : 'text-slate-200'}`}>
              {stats.rations}
            </span>
          </div>
        </div>

        {/* Citadel Energy */}
        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded">
          <Zap className="w-4 h-4 text-yellow-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase">Citadelle</span>
            <span className={`font-bold ${stats.citadelEnergy < 30 ? 'text-red-400 animate-pulse' : 'text-slate-200'}`}>
              {stats.citadelEnergy}%
            </span>
          </div>
        </div>

        {/* Stability */}
        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded">
          <Shield className="w-4 h-4 text-green-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase">Stabilité</span>
            <span className={`font-bold ${stats.stability < 30 ? 'text-red-400 animate-pulse' : 'text-slate-200'}`}>
              {stats.stability}%
            </span>
          </div>
        </div>

        {/* Info Control */}
        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded">
          <Eye className="w-4 h-4 text-blue-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase">Info</span>
            <span className="text-slate-200 font-bold">{stats.infoControl}%</span>
          </div>
        </div>

        {/* Xen */}
        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded">
          <Biohazard className="w-4 h-4 text-purple-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase">Xen</span>
            <span className={`font-bold ${stats.xenContamination > 50 ? 'text-purple-400 animate-pulse' : 'text-slate-200'}`}>
              {stats.xenContamination}%
            </span>
          </div>
        </div>

        {/* Rebellion */}
        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded">
          <Flame className="w-4 h-4 text-orange-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase">Rébellion</span>
            <span className={`font-bold ${stats.rebelActivity > 50 ? 'text-orange-400 animate-pulse' : 'text-slate-200'}`}>
              {stats.rebelActivity}%
            </span>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className={`border px-3 py-1.5 rounded font-bold uppercase tracking-wider text-xs ${alert.color}`}>
        {alert.label}
      </div>
    </header>
  );
};
