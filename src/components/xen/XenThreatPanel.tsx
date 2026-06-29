import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { xenEntities } from '../../data/xenEntities';
import { Biohazard, AlertTriangle, ShieldAlert, Heart, Calendar } from 'lucide-react';

export const XenThreatPanel: React.FC = () => {
  const { stats, sectors, history } = useGameStore();

  const activeInfestations = sectors
    .filter(s => s.xenContamination > 25 && s.status !== 'Scellé' && s.status !== 'Abandonné')
    .sort((a, b) => b.xenContamination - a.xenContamination);

  const xenLogs = history.filter(log => log.type === 'event' && (log.message.includes('Xen') || log.message.includes('headcrab') || log.message.includes('zombie') || log.message.includes('spore') || log.message.includes('barnacle') || log.message.includes('antlion') || log.message.includes('infest')));

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* 1. Xen Infection Summary Banner */}
      <div className="border border-purple-500/20 bg-purple-950/10 rounded p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="text-[10px] text-purple-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Biohazard className="w-4 h-4 text-purple-400 animate-pulse" />
            CONTAMINATION BIOLOGIQUE XEN ACTIVE
          </div>
          <h3 className="text-sm font-bold text-slate-200 uppercase flex items-center gap-2">
            TAUX DE COMPROMISSION ORGANIQUE : {stats.xenContamination}%
          </h3>
          <p className="text-[10px] text-slate-400 leading-normal max-w-xl">
            L'intrusion de spores et d'organismes Xen se produit principalement dans les zones souterraines et humides. Utilisez des barrières, des quarantaines ou purgez par incinération.
          </p>
        </div>
        <div className="bg-[#0b1015] border border-slate-800 px-4 py-2.5 rounded shrink-0 text-right">
          <span className="text-[8px] text-slate-500 block uppercase">Niveau de confinement global</span>
          <span className="text-purple-400 font-bold text-xs">
            {stats.xenContamination > 50 ? 'RUPTURE DE SÉCURITÉ' : 'SURVEILLANCE ACCRUE'}
          </span>
        </div>
      </div>

      {/* 2. Active Infestations by Sector */}
      <div className="border border-slate-800 bg-[#0d141b]/40 rounded p-4 space-y-3">
        <h4 className="text-[10px] text-purple-400 font-bold uppercase tracking-wider border-b border-slate-850 pb-2 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5" />
          Foyers d'Infection Actifs dans la Cité
        </h4>

        {activeInfestations.length === 0 ? (
          <div className="text-slate-500 italic py-8 text-center">
            Aucun foyer biologique critique supérieur à 25% n'est signalé dans les secteurs actifs.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeInfestations.map(sec => (
              <div key={sec.id} className="border border-slate-900 bg-slate-950/40 rounded p-3 space-y-2">
                <div className="flex justify-between items-start border-b border-slate-900 pb-1.5">
                  <span className="font-bold text-slate-200">{sec.name}</span>
                  <span className={`text-[8.5px] border px-2 py-0.5 rounded font-bold uppercase ${sec.status === 'En quarantaine' ? 'text-purple-400 border-purple-500/30 bg-purple-950/20' : 'text-orange-400 border-orange-500/30 bg-orange-950/20'}`}>
                    {sec.status}
                  </span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500">Contamination Xen :</span>
                  <span className="text-purple-400 font-bold">{sec.xenContamination}%</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500">Population Menacée :</span>
                  <span className="text-slate-300 font-bold">{sec.population} citoyens</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded overflow-hidden">
                  <div className="bg-purple-500 h-full" style={{ width: `${sec.xenContamination}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Xen Roster & Creature Information */}
      <div className="border border-slate-800 bg-[#0d141b]/40 rounded p-4 space-y-3">
        <h4 className="text-[10px] text-purple-400 font-bold uppercase tracking-wider border-b border-slate-850 pb-2 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5" />
          Fiche de Spécifications Biologiques Xen (COAN Node)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {xenEntities.map(ent => (
            <div key={ent.id} className="border border-slate-900 bg-slate-950/40 rounded p-3 flex flex-col justify-between gap-3">
              <div className="space-y-1">
                <div className="flex justify-between items-start gap-1">
                  <span className="font-bold text-slate-200">{ent.name}</span>
                  <span className="text-[8.5px] font-bold text-purple-400 bg-purple-950/20 px-1.5 border border-purple-950 rounded uppercase">
                    DANGER: {ent.danger}
                  </span>
                </div>
                <p className="text-[9px] text-slate-500 leading-relaxed">
                  Méthode de Confinement : <span className="text-slate-400 font-semibold">{ent.confinementMethod}</span>
                </p>
              </div>

              <div className="border-t border-slate-900/60 pt-2 grid grid-cols-3 gap-2 text-[9px] text-slate-500">
                <div>
                  <span>Propagation</span>
                  <span className="block font-bold text-slate-300">{ent.spreadRate}%</span>
                </div>
                <div>
                  <span>Peur Générée</span>
                  <span className="block font-bold text-slate-300">+{ent.fearGenerated}</span>
                </div>
                <div>
                  <span>Risque Civil</span>
                  <span className="block font-bold text-slate-300">{ent.civilianRisk}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Xen logs */}
      <div className="border border-slate-800 bg-[#0d141b]/60 rounded p-4 space-y-3">
        <h4 className="text-[10px] text-purple-400 font-bold uppercase tracking-wider border-b border-slate-850 pb-2 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          Rapports Sanitaires et Dimensionnels
        </h4>

        <div className="space-y-1.5 bg-[#05070a] border border-slate-900 rounded p-3 max-h-[160px] overflow-y-auto">
          {xenLogs.length === 0 ? (
            <p className="text-slate-700 italic text-center py-6">Aucun incident biologique Xen enregistré.</p>
          ) : (
            xenLogs.map((log, i) => (
              <p key={i} className="text-slate-300 border-l-2 border-purple-500 pl-2 leading-relaxed text-[10px]">
                <span className="text-slate-500 font-semibold mr-1">[Jour {log.day}]</span> {log.message}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
