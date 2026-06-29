import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Shield, Eye, Flame, Biohazard, Zap, ShieldAlert, Cpu, Heart, AlertTriangle } from 'lucide-react';

export const CityStatsPanel: React.FC = () => {
  const { stats } = useGameStore();

  const statItems = [
    {
      label: 'Stabilité Urbaine',
      value: stats.stability,
      color: 'bg-green-500',
      textColor: 'text-green-400',
      icon: Shield,
      desc: 'Capacité globale à maintenir l\'ordre civil. Si elle tombe à 0%, l\'insurrection est inévitable.'
    },
    {
      label: 'Loyauté Civile',
      value: stats.loyalty,
      color: 'bg-cyan-500',
      textColor: 'text-cyan-400',
      icon: Heart,
      desc: 'Attachement apparent de la population aux discours de Wallace Breen. Réduit le taux de sédition.'
    },
    {
      label: 'Peur Civile',
      value: stats.fear,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-400',
      icon: Eye,
      desc: 'Pression de la menace physique et de la CP. Une peur élevée réduit les grèves mais radicalise à terme.'
    },
    {
      label: 'Activité Rebelle',
      value: stats.rebelActivity,
      color: 'bg-orange-500',
      textColor: 'text-orange-400',
      icon: Flame,
      desc: 'Infiltration et emprise des cellules Lambda. Menace directe sur nos infrastructures.'
    },
    {
      label: 'Contamination Xen',
      value: stats.xenContamination,
      color: 'bg-purple-500',
      textColor: 'text-purple-400',
      icon: Biohazard,
      desc: 'Infestation parasitaire organique. Bloque la production industrielle et tue les résidents.'
    },
    {
      label: 'Présence Combine',
      value: stats.combinePresence,
      color: 'bg-blue-500',
      textColor: 'text-blue-400',
      icon: ShieldAlert,
      desc: 'Densité de patrouilles CP et de troupes Overwatch déployées pour pacifier la ville.'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="border border-slate-800 bg-[#0d141b]/60 rounded p-4 flex flex-col justify-between gap-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded bg-slate-900 border border-slate-850 ${item.textColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-bold text-slate-300 text-xs">{item.label}</span>
              </div>
              <span className={`text-base font-bold ${item.textColor}`}>{item.value}%</span>
            </div>

            {/* Description */}
            <p className="text-[10px] text-slate-500 leading-normal min-h-[32px]">{item.desc}</p>

            {/* Progress Bar */}
            <div className="w-full bg-slate-950 h-2 rounded border border-slate-850 overflow-hidden">
              <div
                className={`h-full ${item.color} transition-all duration-500`}
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        );
      })}

      {/* Industrial info & casualties summaries */}
      <div className="border border-slate-800 bg-[#0d141b]/40 rounded p-4 col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">Production Industrielle</div>
          <div className="text-base font-bold text-cyan-400 mt-1">{stats.industrialProduction}%</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">Fatigue Civile</div>
          <div className={`text-base font-bold mt-1 ${stats.civilianFatigue > 60 ? 'text-orange-450 animate-pulse' : 'text-slate-300'}`}>
            {stats.civilianFatigue}%
          </div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">Pertes Civiles</div>
          <div className="text-base font-bold text-red-500 mt-1">{stats.civilianCasualties}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">Pertes Combine</div>
          <div className="text-base font-bold text-slate-400 mt-1">{stats.combineCasualties}</div>
        </div>
      </div>
    </div>
  );
};
