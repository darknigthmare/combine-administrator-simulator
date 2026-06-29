import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { FileText, Download, Archive, ChevronRight, FileJson } from 'lucide-react';
import { exportReportAsJson, exportReportAsText } from '../../utils/storage';

export const DailyReportPanel: React.FC = () => {
  const { dayReports, cityNumber } = useGameStore();
  const [selectedReportIdx, setSelectedReportIdx] = useState<number | null>(null);

  const selectedReport = selectedReportIdx !== null ? dayReports[selectedReportIdx] : null;

  return (
    <div className="border border-slate-800 bg-[#0d141b]/60 rounded p-4 font-mono text-xs flex flex-col md:flex-row gap-4 h-[350px]">
      {/* List of past reports */}
      <div className="w-full md:w-1/3 border-r border-slate-850 flex flex-col gap-2 overflow-y-auto pr-2">
        <h4 className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-850">
          <Archive className="w-3.5 h-3.5 text-slate-500" />
          Archives des rapports
        </h4>

        {dayReports.length === 0 ? (
          <div className="text-slate-600 italic py-6 text-center text-[10px]">
            Aucun rapport archivé. Les rapports sont générés en fin de journée.
          </div>
        ) : (
          dayReports.map((report, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedReportIdx(idx)}
              className={`w-full flex items-center justify-between p-2 rounded border text-left transition-all ${
                selectedReportIdx === idx
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 font-bold'
                  : 'bg-slate-900/40 border-transparent text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 shrink-0" />
                <span>RAPPORT JOUR {report.day}</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ))
        )}
      </div>

      {/* Selected Report details */}
      <div className="flex-1 flex flex-col justify-between overflow-y-auto">
        {selectedReport ? (
          <div className="space-y-4 flex flex-col justify-between h-full">
            <div className="space-y-3">
              {/* Report title and export buttons */}
              <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                <h4 className="font-bold text-slate-200 uppercase text-xs">
                  Rapport du Jour {selectedReport.day} — City {cityNumber}
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => exportReportAsJson(selectedReport)}
                    className="flex items-center gap-1.5 px-2 py-1 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-[10px] text-slate-300 rounded hover:text-white transition"
                    title="Exporter au format JSON"
                  >
                    <FileJson className="w-3.5 h-3.5" />
                    <span>JSON</span>
                  </button>
                  <button
                    onClick={() => exportReportAsText(selectedReport, cityNumber)}
                    className="flex items-center gap-1.5 px-2 py-1 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-[10px] text-slate-300 rounded hover:text-white transition"
                    title="Exporter au format Texte brut"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>TEXTE</span>
                  </button>
                </div>
              </div>

              {/* Stats overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-950/80 border border-slate-900 rounded p-2.5 text-[10px]">
                <div>
                  <span className="text-slate-500 block uppercase text-[9px]">Stabilité</span>
                  <span className="font-bold text-slate-300">{selectedReport.globalStats.stability}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase text-[9px]">Rébellion</span>
                  <span className="font-bold text-orange-400">{selectedReport.globalStats.rebelActivity}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase text-[9px]">Contamination Xen</span>
                  <span className="font-bold text-purple-400">{selectedReport.globalStats.xenContamination}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase text-[9px]">Rations</span>
                  <span className="font-bold text-cyan-400">{selectedReport.globalStats.rations}</span>
                </div>
              </div>

              {/* Human balance and log change */}
              <div className="grid grid-cols-2 gap-4 text-[10px] text-slate-400">
                <div>
                  <span className="text-slate-500 font-bold block uppercase text-[9px] mb-1">Bilan Opérationnel</span>
                  <ul className="space-y-1 list-disc pl-3">
                    <li>Pertes civiles : <span className="text-red-400">+{selectedReport.civilianCasualties}</span></li>
                    <li>Pertes Combine : <span className="text-slate-200">+{selectedReport.combineCasualties}</span></li>
                    <li>Variation des rations : <span className={selectedReport.rationsChange >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {selectedReport.rationsChange >= 0 ? '+' : ''}{selectedReport.rationsChange}
                    </span></li>
                  </ul>
                </div>
                <div>
                  <span className="text-slate-500 font-bold block uppercase text-[9px] mb-1">Citadel Status</span>
                  <p className="leading-relaxed italic text-slate-300 text-[10px]">{selectedReport.directiveProgress}</p>
                </div>
              </div>

              {/* Incident log */}
              <div className="space-y-1.5 pt-2 border-t border-slate-850">
                <span className="text-slate-500 font-bold block uppercase text-[9px]">Incidents Relevés</span>
                <div className="bg-slate-950/40 rounded p-2 border border-slate-900/60 max-h-[110px] overflow-y-auto space-y-1.5 text-[10px]">
                  {selectedReport.incidents.length === 0 ? (
                    <p className="text-slate-600 italic">Aucun incident de sécurité majeur relevé.</p>
                  ) : (
                    selectedReport.incidents.map((inc, i) => (
                      <p key={i} className="text-slate-300 leading-normal border-l-2 border-cyan-500 pl-2">
                        {inc}
                      </p>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 italic py-12 text-[10px]">
            <FileText className="w-10 h-10 text-slate-700 mb-2" />
            Sélectionnez un rapport d'archive pour afficher les détails.
          </div>
        )}
      </div>
    </div>
  );
};
