import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Terminal, AlertTriangle, AlertCircle, Sparkles, Target } from 'lucide-react';

export const AlertFeed: React.FC = () => {
  const { stats, activeDirective, activeDirectiveDaysLeft, recentAlerts } = useGameStore();

  const getCoanRecommendations = () => {
    const recs: string[] = [];

    if (stats.loyalty < 20) {
      recs.push("La loyauté civile est sous le seuil recommandé. Risque d'infiltration Lambda élevé.");
    }
    if (stats.rebelActivity > 40) {
      recs.push("L'activité rebelle exige le déploiement d'Overwatch Soldats ou l'usage de Manhacks dans les égouts.");
    }
    if (stats.xenContamination > 35) {
      recs.push("Contamination Xen détectée. Déclarer le confinement ou déployer les Grunts.");
    }
    if (stats.rations < 250) {
      recs.push("Réserves de rations critiques. Probabilité d'émeutes de la faim imminentes.");
    }
    if (stats.citadelEnergy < 50) {
      recs.push("Fluctuations d'énergie Citadel détectées. La surveillance Advisor est accrue.");
    }
    if (stats.civilianCasualties > 1000) {
      recs.push("Note COAN : Les pertes civiles cumulées restent dans la fourchette d'acceptabilité administrative.");
    }

    if (recs.length === 0) {
      recs.push("Stabilité nominale. Poursuivre le protocole d'observation standard.");
    }

    return recs;
  };

  const recommendations = getCoanRecommendations();

  return (
    <aside className="w-80 bg-[#090d11] border-l border-slate-800 p-4 font-mono text-xs flex flex-col gap-6 overflow-y-auto select-none">
      {/* 1. CITADEL DIRECTIVE TRACKER */}
      <div className="border border-slate-800 bg-[#0d141b]/60 rounded p-3 space-y-2">
        <h3 className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2 text-[10px]">
          <Target className="w-3.5 h-3.5 text-cyan-400" />
          Directive Citadel Active
        </h3>
        
        {activeDirective ? (
          <div className="space-y-2 text-slate-300">
            <div className="text-[11px] font-bold text-slate-200">{activeDirective.title}</div>
            <p className="text-[10px] text-slate-400 leading-normal">{activeDirective.description}</p>
            <div className="border-t border-slate-800/80 pt-2 flex justify-between items-center text-[10px]">
              <span className="text-slate-500">Temps Restant :</span>
              <span className="text-yellow-500 font-bold">{activeDirectiveDaysLeft} jours</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-slate-500">Cible Requise :</span>
              <span className="text-cyan-400 font-bold uppercase">
                {activeDirective.targetStat === 'rebelActivityUnder' ? 'Rébellion' : activeDirective.targetStat} : {activeDirective.targetStat === 'rebelActivityUnder' || activeDirective.targetStat === 'xenContaminationUnder' ? `≤ ${activeDirective.targetValue}%` : `≥ ${activeDirective.targetValue}%`}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-slate-500 text-[10px]">Aucune directive active.</p>
        )}
      </div>

      {/* 2. RECENT ALERTS FEED */}
      <div className="flex-1 flex flex-col gap-2 min-h-[150px]">
        <h3 className="text-orange-400 font-bold uppercase tracking-wider flex items-center gap-2 text-[10px]">
          <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
          Alertes Réseau Overwatch
        </h3>
        
        <div className="flex-1 border border-slate-800 bg-[#070b0e] rounded p-2 overflow-y-auto space-y-2 max-h-[220px]">
          {recentAlerts.length === 0 ? (
            <p className="text-slate-600 text-[10px] italic text-center py-4">Aucune alerte active.</p>
          ) : (
            recentAlerts.map((alert, idx) => (
              <div key={idx} className="flex gap-2 items-start text-[10px] border-b border-slate-900 pb-1.5 last:border-0">
                <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-normal">{alert}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 3. COAN AI RECOMMENDATIONS */}
      <div className="border border-slate-800/80 bg-[#0d141b]/40 rounded p-3 space-y-2">
        <h3 className="text-purple-400 font-bold uppercase tracking-wider flex items-center gap-2 text-[10px]">
          <Terminal className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          Node d'Analyse COAN
        </h3>
        
        <div className="space-y-2">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="bg-purple-950/20 border border-purple-950/40 rounded p-2 text-slate-300 leading-relaxed text-[9px] relative">
              <span className="absolute top-1 right-1 text-purple-500 font-semibold">[AUTO]</span>
              {rec}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
