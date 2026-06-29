import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { endings, getEndingById } from '../../data/endings';
import { RotateCcw, AlertTriangle, Skull, Award, HelpCircle } from 'lucide-react';

export const EndingScreen: React.FC = () => {
  const { endingTriggered, resetGame, stats, day, cityNumber, directivesCompleted, directivesFailed } = useGameStore();

  if (!endingTriggered) return null;

  const ending = getEndingById(endingTriggered, cityNumber);
  if (!ending) return null;

  const getEndingIconClass = (cat: string) => {
    switch (cat) {
      case 'combine_victory': return 'text-green-500 border-green-500 bg-green-950/20';
      case 'rebel_victory': return 'text-orange-500 border-orange-500 bg-orange-950/20';
      case 'xen_defeat': return 'text-purple-500 border-purple-500 bg-purple-950/20';
      case 'combine_purge': return 'text-red-500 border-red-500 bg-red-950/20';
      case 'special':
      default:
        return 'text-cyan-400 border-cyan-500 bg-cyan-950/20';
    }
  };

  return (
    <div className="fixed inset-0 bg-[#070b0e] flex flex-col justify-center items-center z-50 p-6 font-mono text-xs overflow-y-auto crt-flicker">
      <div className="w-full max-w-2xl border border-slate-800 bg-[#0d141b]/60 rounded p-6 space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-950/5 to-transparent pointer-events-none"></div>

        {/* Ending Icon category */}
        <div className="flex justify-center">
          <div className={`p-4 border rounded-full ${getEndingIconClass(ending.category)}`}>
            <Skull className="w-10 h-10 animate-pulse" />
          </div>
        </div>

        {/* Narrative Title */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-100 uppercase tracking-wide">
            {ending.title}
          </h2>
          <div className="text-[10px] text-cyan-400 uppercase font-semibold tracking-widest">
            {ending.subtitle}
          </div>
        </div>

        {/* Description story */}
        <p className="text-slate-300 leading-relaxed text-left bg-[#05070a] border border-slate-900 rounded p-5 text-[11px]">
          {ending.description}
        </p>

        {/* Moral Cost */}
        <div className="border border-red-950/40 bg-red-950/20 rounded p-3 text-red-400 text-[10px] font-bold uppercase tracking-wider">
          Coût Moral de l'Administration :<br />
          <span className="text-slate-200 mt-1 block font-normal normal-case italic">
            &ldquo; {ending.moraleCost} &rdquo;
          </span>
        </div>

        {/* Statistics block */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center border-t border-b border-slate-900 py-4 text-[10px]">
          <div>
            <span className="text-slate-500 uppercase block text-[8px]">Survie administrative</span>
            <span className="font-bold text-slate-200 text-sm">{day} jours</span>
          </div>
          <div>
            <span className="text-slate-500 uppercase block text-[8px]">Pertes Civiles</span>
            <span className="font-bold text-red-500 text-sm">{stats.civilianCasualties}</span>
          </div>
          <div>
            <span className="text-slate-500 uppercase block text-[8px]">Pertes Forces Combine</span>
            <span className="font-bold text-slate-400 text-sm">{stats.combineCasualties}</span>
          </div>
          <div>
            <span className="text-slate-500 uppercase block text-[8px]">Directives Complétées</span>
            <span className="font-bold text-green-400 text-sm">{directivesCompleted}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={resetGame}
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold uppercase tracking-wider rounded transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Réinitialiser la Liaison Administrative</span>
        </button>
      </div>
    </div>
  );
};
