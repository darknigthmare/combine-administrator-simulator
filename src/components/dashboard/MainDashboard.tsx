import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { CityStatsPanel } from './CityStatsPanel';
import { StabilityGraph } from './StabilityGraph';
import { DirectivePanel } from './DirectivePanel';
import { DailyReportPanel } from './DailyReportPanel';
import { CCTVFeed } from '../city/CCTVFeed';
import { Play, Terminal, HelpCircle, ShieldAlert, Radio } from 'lucide-react';


export const MainDashboard: React.FC = () => {
  const { stats, day, history, nextDay, cityNumber } = useGameStore();

  // Scroll to bottom of history console
  const consoleEndRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const getLogColorClass = (type: string) => {
    switch (type) {
      case 'event': return 'text-orange-400';
      case 'directive': return 'text-yellow-400 font-semibold';
      case 'warning': return 'text-red-500 animate-pulse font-bold';
      case 'action':
      default:
        return 'text-cyan-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upper Terminal Title */}
      <div className="border border-slate-800 bg-[#0d141b]/60 rounded p-4 font-mono text-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-200 uppercase flex items-center gap-2">
            <Terminal className="w-4.5 h-4.5 text-cyan-400" />
            Terminal Administratif Combine // Console Principale
          </h2>
          <p className="text-[10px] text-slate-400 mt-1">
            Surveillance continue active. Toute déviance civique est automatiquement rapportée à l'Overwatch.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
          <span>LIAISON CITADELLE SÉCURISÉE</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <CityStatsPanel />

      {/* Charts & Directives Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StabilityGraph />
        <DirectivePanel />
      </div>

      {/* Reports panel */}
      <DailyReportPanel />

      {/* Console & CCTV Monitor Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* History Log Console */}
        <div className="md:col-span-2 border border-slate-800 bg-slate-950 rounded p-4 font-mono text-xs flex flex-col gap-2.5">
          <h4 className="text-[10px] text-slate-500 uppercase tracking-wider border-b border-slate-900 pb-2 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            Console du Journal Système
          </h4>
          <div className="h-44 overflow-y-auto space-y-1 bg-[#05070a] border border-slate-900 rounded p-2.5 max-h-[180px] scrollbar-thin">
            {history.length === 0 ? (
              <p className="text-slate-700 italic text-[10px] text-center py-10">Console système vierge.</p>
            ) : (
              history.map((log, index) => (
                <div key={index} className="flex gap-2 text-[10px] leading-normal pb-1 border-b border-slate-950">
                  <span className="text-slate-600 shrink-0 font-semibold">[J-{String(log.day).padStart(2, '0')}]</span>
                  <span className={`${getLogColorClass(log.type)} flex-1`}>
                    {log.message}
                  </span>
                </div>
              ))
            )}
            <div ref={consoleEndRef} />
          </div>
        </div>

        {/* Mini CCTV Citadel Monitor */}
        <div className="border border-slate-800 bg-slate-950 rounded p-4 font-mono text-xs flex flex-col gap-2.5 justify-between">
          <h4 className="text-[10px] text-slate-500 uppercase tracking-wider border-b border-slate-900 pb-2 flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            Moniteur Vidéo Citadel
          </h4>
          <div className="flex-1 flex items-center justify-center">
            <CCTVFeed sectorId="citadel_approach" />
          </div>
        </div>
      </div>

      {/* Day Progression action footer */}
      <div className="flex justify-between items-center bg-[#0b1015] border border-slate-800 rounded p-4">
        <div className="flex items-center gap-2.5 text-[10px] text-slate-400 font-mono">
          <ShieldAlert className="w-5 h-5 text-cyan-500 shrink-0" />
          <div>
            <div className="font-bold text-slate-300">PROTOCOLE DE CLÔTURE DE JOURNÉE</div>
            <p className="text-[9px] text-slate-500 leading-normal">
              Valider toutes les décisions en cours et soumettre les statistiques journalières à la Citadel.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            nextDay();
          }}
          className="flex items-center gap-2 px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold uppercase tracking-wider text-xs rounded transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] active:scale-95"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>Clôturer la journée administrative</span>
        </button>
      </div>
    </div>
  );
};
