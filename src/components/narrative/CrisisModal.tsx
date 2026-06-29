import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { AlertOctagon, ShieldAlert, Award, FileText, ChevronRight } from 'lucide-react';
import { GameEffects } from '../../types/events';

export const CrisisModal: React.FC = () => {
  const { activeEvent, resolveActiveEvent, sectors } = useGameStore();

  if (!activeEvent) return null;

  // Retrieve sector name if applicable
  const sectorName = activeEvent.sectorId
    ? sectors.find(s => s.id === activeEvent.sectorId)?.name
    : null;

  const renderEffectBadge = (val: number, label: string, isPositiveGood: boolean) => {
    const isPositive = val > 0;
    const sign = isPositive ? '+' : '';
    
    let colorClass = 'text-slate-400 border-slate-800';
    if (val !== 0) {
      if ((isPositive && isPositiveGood) || (!isPositive && !isPositiveGood)) {
        colorClass = 'text-green-400 border-green-950/40 bg-green-950/10';
      } else {
        colorClass = 'text-red-400 border-red-950/40 bg-red-950/10';
      }
    }

    return (
      <span key={label} className={`border px-1.5 py-0.5 rounded text-[8.5px] uppercase font-bold tracking-wider ${colorClass}`}>
        {label} {sign}{val}
      </span>
    );
  };

  const getEffectsList = (effects: GameEffects) => {
    const badges: React.ReactNode[] = [];
    
    // Stats list
    if (effects.stability !== undefined) badges.push(renderEffectBadge(effects.stability, 'Stabilité', true));
    if (effects.loyalty !== undefined) badges.push(renderEffectBadge(effects.loyalty, 'Loyauté', true));
    if (effects.fear !== undefined) badges.push(renderEffectBadge(effects.fear, 'Peur', true));
    if (effects.rebelActivity !== undefined) badges.push(renderEffectBadge(effects.rebelActivity, 'Rébellion', false));
    if (effects.xenContamination !== undefined) badges.push(renderEffectBadge(effects.xenContamination, 'Xen', false));
    if (effects.combinePresence !== undefined) badges.push(renderEffectBadge(effects.combinePresence, 'Forces', true));
    if (effects.industrialProduction !== undefined) badges.push(renderEffectBadge(effects.industrialProduction, 'Production', true));
    if (effects.rations !== undefined) badges.push(renderEffectBadge(effects.rations, 'Rations', true));
    if (effects.citadelEnergy !== undefined) badges.push(renderEffectBadge(effects.citadelEnergy, 'Citadelle', true));
    if (effects.infoControl !== undefined) badges.push(renderEffectBadge(effects.infoControl, 'Info', true));
    if (effects.civilianFatigue !== undefined) badges.push(renderEffectBadge(effects.civilianFatigue, 'Fatigue', false));
    
    // Casualties
    if (effects.civilianCasualties !== undefined) badges.push(renderEffectBadge(effects.civilianCasualties, 'Pertes Civiles', false));
    if (effects.combineCasualties !== undefined) badges.push(renderEffectBadge(effects.combineCasualties, 'Pertes Combine', false));

    // Local Sector modifications
    if (effects.sectorLoyalty !== undefined) badges.push(renderEffectBadge(effects.sectorLoyalty, 'Loyauté Secteur', true));
    if (effects.sectorFear !== undefined) badges.push(renderEffectBadge(effects.sectorFear, 'Peur Secteur', true));
    if (effects.sectorXen !== undefined) badges.push(renderEffectBadge(effects.sectorXen, 'Xen Secteur', false));
    if (effects.sectorRebel !== undefined) badges.push(renderEffectBadge(effects.sectorRebel, 'Rébellion Secteur', false));
    if (effects.sectorInfrastructure !== undefined) badges.push(renderEffectBadge(effects.sectorInfrastructure, 'Infra Secteur', true));

    return badges;
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex justify-center items-center z-50 p-4 font-mono text-xs select-none crt-flicker">
      <div className="bg-[#0b1015] border border-orange-500/40 rounded w-full max-w-2xl overflow-hidden flex flex-col shadow-[0_0_40px_rgba(249,115,22,0.2)]">
        
        {/* Header Alert Flag */}
        <div className="bg-orange-600 border-b border-orange-500/30 p-4 flex items-center gap-3 text-slate-950 font-bold uppercase tracking-wider">
          <AlertOctagon className="w-5 h-5 shrink-0" />
          <div className="flex-1">
            <div className="text-sm">Alerte de Sécurité // Crise Narrative Active</div>
            <div className="text-[9px] opacity-75">Priorité administrative de stabilisation</div>
          </div>
          <span className="text-[8px] bg-slate-950 text-orange-400 px-2 py-0.5 border border-orange-400 rounded">
            NIV: {activeEvent.severity}
          </span>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-200 uppercase">{activeEvent.title}</h3>
            {sectorName && (
              <span className="text-[9px] text-cyan-400 font-semibold uppercase">
                Contexte Géographique : {sectorName}
              </span>
            )}
            {/* Lore tags list */}
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {activeEvent.loreTags.map(tag => (
                <span key={tag} className="border border-slate-800 text-slate-500 text-[8px] px-1.5 py-0.2 rounded uppercase">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed bg-[#05070a] border border-slate-900 rounded p-4 text-[10.5px]">
            {activeEvent.description}
          </p>

          {/* Action Options List */}
          <div className="space-y-2.5 pt-2">
            <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">
              Directives administratives disponibles
            </span>
            
            {activeEvent.choices.map(choice => (
              <button
                key={choice.id}
                onClick={() => resolveActiveEvent(choice.id)}
                className="w-full border border-slate-800 hover:border-orange-500/50 bg-slate-900/40 hover:bg-slate-900/80 rounded p-3 text-left transition-all duration-200 group flex justify-between items-start gap-4 active:scale-99"
              >
                <div className="space-y-2 flex-1">
                  <div className="font-bold text-slate-200 group-hover:text-orange-400 flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-orange-400 shrink-0 transition-colors" />
                    {choice.label}
                  </div>
                  <p className="text-[9.5px] text-slate-400 leading-normal pl-5">
                    {choice.description}
                  </p>
                  
                  {/* Option Effects Badges */}
                  <div className="flex flex-wrap gap-1.5 pl-5 pt-1.5">
                    {getEffectsList(choice.effects)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
