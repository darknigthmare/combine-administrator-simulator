import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { CitySector } from '../../types/game';
import { combineUnits } from '../../data/combineUnits';
import { X, Shield, ShieldAlert, Plus, Minus, AlertOctagon, Flame, Biohazard, UserCheck, Wrench, Siren } from 'lucide-react';

interface SectorDetailsModalProps {
  sector: CitySector;
  onClose: () => void;
}

export const SectorDetailsModal: React.FC<SectorDetailsModalProps> = ({ sector, onClose }) => {
  const { combineReserve, deployUnit, undeployUnit, executeSectorAction, stats } = useGameStore();

  const isClosed = sector.status === 'Scellé' || sector.status === 'Abandonné';

  const handleDeploy = (unitId: string) => {
    deployUnit(sector.id, unitId, 1);
  };

  const handleUndeploy = (unitId: string) => {
    undeployUnit(sector.id, unitId, 1);
  };

  const handleAction = (actionId: string) => {
    if (confirm(`Confirmer l'opération administrative : ${actionId} sur ${sector.name} ? Cette action a des conséquences irréversibles sur le moral ou les ressources.`)) {
      executeSectorAction(actionId, sector.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 font-mono text-xs select-none">
      <div className="bg-[#0b1015] border border-cyan-500/30 rounded w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col shadow-[0_0_30px_rgba(6,182,212,0.15)]">
        {/* Header */}
        <div className="border-b border-slate-800 bg-[#090d11] p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-200 uppercase">{sector.name} // DOSSIER ADMINISTRATIVE</h3>
              <span className="text-[10px] text-slate-500">STATUT : {sector.status.toUpperCase()}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-900 border border-transparent hover:border-slate-800 rounded text-slate-400 hover:text-white transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Local Stats */}
          <div className="space-y-4">
            <h4 className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-900 pb-1 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" />
              Indicateurs Sectoriels Locaux
            </h4>

            <div className="grid grid-cols-2 gap-3 bg-slate-950/60 border border-slate-900 rounded p-4 text-[10px]">
              <div>
                <span className="text-slate-500 block uppercase text-[9px]">Population active</span>
                <span className="font-bold text-slate-200 text-sm">{sector.population} citoyens</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase text-[9px]">Santé des infrastructures</span>
                <span className={`font-bold text-sm ${sector.infrastructureStatus < 50 ? 'text-orange-400' : 'text-green-400'}`}>
                  {sector.infrastructureStatus}%
                </span>
              </div>
              <div className="col-span-2 border-t border-slate-900 my-2 pt-2 grid grid-cols-3 gap-2">
                <div>
                  <span className="text-slate-500 block uppercase text-[8px]">Surveillance</span>
                  <span className="font-bold text-slate-300">{sector.surveillance}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase text-[8px]">Peur Locale</span>
                  <span className="font-bold text-slate-300">{sector.fear}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase text-[8px]">Loyauté Locale</span>
                  <span className="font-bold text-slate-300">{sector.loyalty}%</span>
                </div>
              </div>
            </div>

            {/* Tactical Status Bars */}
            {!isClosed && (
              <div className="space-y-3 bg-slate-950/20 border border-slate-900 rounded p-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-orange-400 flex items-center gap-1"><Flame className="w-3.5 h-3.5" /> Infiltration Lambda</span>
                    <span className="text-orange-400">{sector.rebelRisk}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded overflow-hidden">
                    <div className="bg-orange-500 h-full" style={{ width: `${sector.rebelRisk}%` }}></div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-purple-400 flex items-center gap-1"><Biohazard className="w-3.5 h-3.5" /> Contamination Xen</span>
                    <span className="text-purple-400">{sector.xenContamination}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded overflow-hidden">
                    <div className="bg-purple-500 h-full" style={{ width: `${sector.xenContamination}%` }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Administrative Operations */}
            <div className="space-y-2">
              <h4 className="text-[10px] text-orange-400 font-bold uppercase tracking-wider border-b border-slate-900 pb-1 flex items-center gap-1.5">
                <AlertOctagon className="w-3.5 h-3.5" />
                Opérations Martiales d'Urgence
              </h4>

              <div className="grid grid-cols-2 gap-2">
                {!isClosed ? (
                  <>
                    <button
                      onClick={() => handleAction('raid_sector')}
                      disabled={stats.rations < 50}
                      className="py-2.5 px-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded text-left transition disabled:opacity-50"
                    >
                      <div className="font-bold flex items-center gap-1"><Siren className="w-3.5 h-3.5 text-cyan-400" /> Raid de la CP</div>
                      <span className="text-[9px] text-slate-500 block mt-0.5">Coûte 50 rations. Réduit la sédition.</span>
                    </button>

                    {sector.status !== 'Sous couvre-feu' ? (
                      <button
                        onClick={() => handleAction('curfew_sector')}
                        className="py-2.5 px-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded text-left transition"
                      >
                        <div className="font-bold">Décréter Couvre-feu</div>
                        <span className="text-[9px] text-slate-500 block mt-0.5">Limite la sédition, fatigue les civils.</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAction('lift_curfew')}
                        className="py-2.5 px-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded text-left transition"
                      >
                        <div className="font-bold">Lever le Couvre-feu</div>
                        <span className="text-[9px] text-slate-500 block mt-0.5">Restaure la production civile.</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleAction('quarantine_sector')}
                      className="py-2.5 px-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded text-left transition"
                    >
                      <div className="font-bold flex items-center gap-1"><Biohazard className="w-3.5 h-3.5 text-purple-400" /> Quarantaine</div>
                      <span className="text-[9px] text-slate-500 block mt-0.5">Bloque la propagation des parasites Xen.</span>
                    </button>

                    <button
                      onClick={() => handleAction('seal_sector')}
                      className="py-2.5 px-3 border border-red-950/40 bg-red-950/10 hover:bg-red-950/20 text-red-400 rounded text-left transition"
                    >
                      <div className="font-bold">Sceller le Secteur</div>
                      <span className="text-[9px] text-red-500/60 block mt-0.5">Condamne 90% des civils. Stoppe tout.</span>
                    </button>

                    <button
                      onClick={() => handleAction('burn_sector')}
                      className="py-2.5 px-3 border border-purple-950/50 bg-purple-950/10 hover:bg-purple-950/20 text-purple-300 rounded text-left transition col-span-2"
                    >
                      <div className="font-bold flex items-center gap-1.5"><Wrench className="w-3.5 h-3.5 text-purple-400" /> Purge Thermique Globale</div>
                      <span className="text-[9px] text-purple-400/60 block mt-0.5">Stérilise Xen et Résistance. Détruit l'infrastructure.</span>
                    </button>
                  </>
                ) : (
                  <p className="text-slate-600 italic text-[10px] col-span-2 py-4 text-center select-none">
                    Ce secteur a été administrativement retiré de la grille opérationnelle (Scellé/Abandonné).
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Deployment of Units */}
          <div className="space-y-4">
            <h4 className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-900 pb-1 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              Répartition des Forces Combine
            </h4>

            {isClosed ? (
              <p className="text-slate-600 italic text-[10px] py-10 text-center select-none">
                Déploiement militaire interdit sur un secteur hors réseau.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                {combineUnits.filter(u => u.id !== 'advisor').map(unit => {
                  const deployed = sector.unitsDeployed[unit.id] || 0;
                  const reserve = combineReserve[unit.id] || 0;

                  return (
                    <div key={unit.id} className="flex justify-between items-center border border-slate-900 bg-slate-950/40 p-2.5 rounded text-[10px]">
                      <div className="space-y-1">
                        <div className="font-bold text-slate-300">{unit.name}</div>
                        <div className="text-[8.5px] text-slate-500 flex items-center gap-2">
                          <span>Puissance: {unit.power}</span>
                          <span>Surv: +{unit.surveillanceBoost}%</span>
                          <span>Réserve: <span className="text-cyan-500 font-bold">{reserve}</span></span>
                        </div>
                      </div>

                      {/* Add/Remove buttons */}
                      <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded p-1">
                        <button
                          onClick={() => handleUndeploy(unit.id)}
                          disabled={deployed <= 0}
                          className="p-1 border border-slate-800 hover:border-slate-700 bg-slate-950 text-slate-400 hover:text-slate-200 disabled:opacity-30 rounded transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-slate-200 font-bold">{deployed}</span>
                        <button
                          onClick={() => handleDeploy(unit.id)}
                          disabled={reserve <= 0}
                          className="p-1 border border-slate-800 hover:border-slate-700 bg-slate-950 text-slate-400 hover:text-slate-200 disabled:opacity-30 rounded transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
