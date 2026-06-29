import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { propagandaMessages } from '../../data/propagandaMessages';
import { Users, Info, Radio, ShieldAlert, Award, FileText, Sparkles } from 'lucide-react';

export const CitizenControlPanel: React.FC = () => {
  const { stats, executeGlobalAction, cityNumber } = useGameStore();
  const [breenMessage, setBreenMessage] = useState<string>(propagandaMessages[0]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generateBreencast = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * propagandaMessages.length);
      setBreenMessage(propagandaMessages[idx]);
      setIsGenerating(false);
    }, 400);
  };

  const handleGlobalAction = (actionId: string) => {
    if (confirm(`Confirmer l'opération administrative à l'échelle de la ville ?`)) {
      executeGlobalAction(actionId);
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* 1. Brand Banner */}
      <div className="border border-cyan-500/20 bg-cyan-950/15 rounded p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
            MINISTÈRE CIVIL DU CONTRÔLE CIVIQUE
          </div>
          <h3 className="text-sm font-bold text-slate-200 uppercase flex items-center gap-2">
            <Users className="w-4.5 h-4.5 text-cyan-400" />
            Stabilisation Psychosociale et Rationnement
          </h3>
          <p className="text-[10px] text-slate-400 leading-normal max-w-xl">
            Ajuster l'alimentation et la censure informationnelle pour équilibrer la soumission par la peur et la loyauté morale de la population.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column: Rationing and Censure actions */}
        <div className="space-y-6">
          <div className="border border-slate-800 bg-[#0d141b]/60 rounded p-4 space-y-4">
            <h4 className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-850 pb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              Régulation du Rationnement et de la faim
            </h4>

            <div className="grid grid-cols-2 gap-3 text-[10px]">
              <div className="bg-slate-950/60 border border-slate-900 rounded p-3">
                <span className="text-slate-500 block uppercase text-[9px]">Rations en stock</span>
                <span className="font-bold text-slate-200 text-sm">{stats.rations} unités</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-900 rounded p-3">
                <span className="text-slate-500 block uppercase text-[9px]">Fatigue Civile</span>
                <span className="font-bold text-slate-200 text-sm">{stats.civilianFatigue}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleGlobalAction('ration_increase')}
                disabled={stats.rations < 200}
                className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 hover:text-white rounded text-left transition disabled:opacity-40"
              >
                <div className="font-bold text-green-400">Distribuer des Suppléments Alimentaires (-200 R.)</div>
                <span className="text-[9px] text-slate-500 block mt-0.5">Augmente la loyauté civile (+12%) et diminue la fatigue (-10%).</span>
              </button>

              <button
                onClick={() => handleGlobalAction('ration_cut')}
                className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 hover:text-white rounded text-left transition"
              >
                <div className="font-bold text-orange-400">Décréter le Rationnement de Crise (+250 R.)</div>
                <span className="text-[9px] text-slate-500 block mt-0.5">Économise des rations mais effondre la loyauté (-18%) et radicalise les rebelles (+10%).</span>
              </button>
            </div>
          </div>

          <div className="border border-slate-800 bg-[#0d141b]/60 rounded p-4 space-y-4">
            <h4 className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-850 pb-2 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-cyan-400" />
              Contrôle Informationnel et Censure
            </h4>

            <div className="grid grid-cols-2 gap-3 text-[10px]">
              <div className="bg-slate-950/60 border border-slate-900 rounded p-3">
                <span className="text-slate-500 block uppercase text-[9px]">Contrôle Info</span>
                <span className="font-bold text-slate-200 text-sm">{stats.infoControl}%</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-900 rounded p-3">
                <span className="text-slate-500 block uppercase text-[9px]">Loyauté Civile</span>
                <span className="font-bold text-slate-200 text-sm">{stats.loyalty}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleGlobalAction('breencast_broadcast')}
                disabled={stats.rations < 30}
                className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 hover:text-white rounded text-left transition disabled:opacity-40"
              >
                <div className="font-bold text-cyan-400">Lancer une Transmission Breencast (-30 R.)</div>
                <span className="text-[9px] text-slate-500 block mt-0.5">Augmente le contrôle info (+15%) mais fatigue légèrement la population (+4%).</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right column: Breencast Generator Screen */}
        <div className="border border-slate-800 bg-slate-950 rounded p-5 flex flex-col justify-between gap-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-950/5 pointer-events-none z-0"></div>
          
          <div className="space-y-2 z-10">
            <h4 className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-900 pb-2 flex items-center gap-2">
              <Radio className="w-4.5 h-4.5 text-cyan-400 animate-pulse shrink-0" />
              Breencast Live Stream // City {cityNumber}
            </h4>

            {/* CRT TV Screen mock */}
            <div className="bg-[#05080c] border border-cyan-500/20 rounded p-4 flex flex-col items-center justify-center gap-4 min-h-[220px] relative overflow-hidden text-center">
              {/* Breen background image */}
              <img
                src="/wallace_breen_cctv.png"
                alt="Dr. Wallace Breen"
                className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-lighten pointer-events-none z-0"
              />
              {/* Scanlines overlay locally */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-950/10 to-transparent bg-[size:100%_8px] pointer-events-none opacity-40 z-10"></div>
              
              {/* Dr Wallace Breen title */}
              <div className="z-20 bg-cyan-950/60 border border-cyan-500/25 px-3 py-1 rounded text-cyan-400 font-bold uppercase tracking-widest text-[9px]">
                DR. WALLACE BREEN // ADMINISTRATEUR DE LA TERRE
              </div>

              {/* Message text */}
              <p className={`z-20 font-serif italic text-sm text-cyan-100 max-w-md leading-relaxed px-4 bg-slate-950/60 border border-slate-900/40 rounded p-2.5 transition-all duration-300 ${isGenerating ? 'opacity-30 blur-xs' : 'opacity-100'}`}>
                &ldquo; {breenMessage} &rdquo;
              </p>
              
              <span className="z-20 text-[8px] text-cyan-500/60 font-mono tracking-widest">
                DIFFUSION PROTOCOLE DE L\'UNION UNIVERSELLE
              </span>
            </div>
          </div>

          <button
            onClick={generateBreencast}
            disabled={isGenerating}
            className="z-10 w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold uppercase tracking-wider rounded text-center transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 shadow-[0_0_15px_rgba(6,182,212,0.15)] disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Générer Nouvelle Transmission</span>
          </button>
        </div>
      </div>
    </div>
  );
};
