import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Target, Award, ThumbsDown, Clock } from 'lucide-react';

export const DirectivePanel: React.FC = () => {
  const { activeDirective, activeDirectiveDaysLeft, directivesCompleted, directivesFailed, stats } = useGameStore();

  const getStatProgress = () => {
    if (!activeDirective) return null;
    const target = activeDirective.targetStat;
    const value = activeDirective.targetValue;

    let current = 0;
    let label = '';
    
    if (target === 'rebelActivityUnder') {
      current = stats.rebelActivity;
      label = 'Activité Rebelle';
    } else if (target === 'productionAbove') {
      current = stats.industrialProduction;
      label = 'Production Industrielle';
    } else if (target === 'xenContaminationUnder') {
      current = stats.xenContamination;
      label = 'Contamination Xen';
    } else if (stats[target] !== undefined) {
      current = stats[target] as number;
      label = target.charAt(0).toUpperCase() + target.slice(1);
    }

    return { current, targetValue: value, label, targetKey: target };
  };

  const progress = getStatProgress();

  return (
    <div className="border border-slate-800 bg-[#0d141b]/60 rounded p-4 font-mono text-xs flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-slate-850 pb-2">
        <h3 className="text-cyan-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-2">
          <Target className="w-4 h-4 text-cyan-400" />
          Directives Logistiques Citadel
        </h3>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="text-green-500 font-semibold flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> {directivesCompleted} Complétées
          </span>
          <span className="text-red-500 font-semibold flex items-center gap-1">
            <ThumbsDown className="w-3.5 h-3.5" /> {directivesFailed}/3 Échecs
          </span>
        </div>
      </div>

      {activeDirective ? (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
              <div className="text-slate-200 font-bold text-sm">{activeDirective.title}</div>
              <p className="text-[10px] text-slate-400 leading-relaxed mt-1">{activeDirective.description}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 px-3 py-2 rounded flex items-center gap-2 shrink-0">
              <Clock className="w-4 h-4 text-yellow-500" />
              <div className="flex flex-col text-right">
                <span className="text-[9px] text-slate-500">TEMPS RESTANT</span>
                <span className="text-yellow-400 font-bold">{activeDirectiveDaysLeft} jours</span>
              </div>
            </div>
          </div>

          {/* Current Progress bar */}
          {progress && (
            <div className="bg-slate-950 border border-slate-850 rounded p-3 space-y-2">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-400">Objectif : {progress.label}</span>
                <span className="font-semibold text-slate-300">
                  Actuel : <span className="text-cyan-400 font-bold">{progress.current}%</span> / Cible :{' '}
                  <span className="text-slate-200 font-bold">
                    {progress.targetKey.includes('Under') ? '≤' : '≥'} {progress.targetValue}%
                  </span>
                </span>
              </div>
              <div className="w-full bg-slate-900 h-2.5 rounded overflow-hidden relative">
                {/* target indicator */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-yellow-500 z-10"
                  style={{ left: `${progress.targetValue}%` }}
                  title={`Cible: ${progress.targetValue}%`}
                ></div>
                <div
                  className={`h-full ${
                    (progress.targetKey.includes('Under') && progress.current <= progress.targetValue) ||
                    (!progress.targetKey.includes('Under') && progress.current >= progress.targetValue)
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  } transition-all duration-500`}
                  style={{ width: `${progress.current}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Reward & Penalty columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-950/20 border border-green-950/40 rounded p-2.5 space-y-1">
              <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Récompense de réussite</span>
              <p className="text-[10px] text-slate-400 leading-normal">{activeDirective.rewardEffects.message}</p>
            </div>
            <div className="bg-red-950/20 border border-red-950/40 rounded p-2.5 space-y-1">
              <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Pénalité d'échec</span>
              <p className="text-[10px] text-slate-400 leading-normal">{activeDirective.penaltyEffects.message}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-slate-500 py-6 italic text-[10px]">
          Aucune directive active reçue de la Citadel pour le moment.
        </div>
      )}
    </div>
  );
};
