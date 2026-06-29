import { DayReport } from '../types/game';

const LOCAL_STORAGE_KEY = 'combine_civil_authority_save';

export const saveGameState = (state: any): void => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, serialized);
  } catch (error) {
    console.error('Failed to save game state to localStorage:', error);
  }
};

export const loadGameState = (): any | null => {
  try {
    const serialized = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!serialized) return null;
    return JSON.parse(serialized);
  } catch (error) {
    console.error('Failed to load game state from localStorage:', error);
    return null;
  }
};

export const clearGameState = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const exportReportAsJson = (report: DayReport): void => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `Combine_Report_Day_${report.day}_City_${report.globalStats.rations}.json`); // Or pass city number
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

export const exportReportAsText = (report: DayReport, cityNumber: string | number): void => {
  const text = `
============================================================
           UNION UNIVERSELLE — SECTEUR CITY ${cityNumber}
            RAPPORT JOURNALIER NIVEAU ADMINISTRATIF
============================================================
RAPPORT DU JOUR : ${report.day}

STATISTIQUES GLOBALES :
------------------------------------------------------------
- Stabilité urbaine : ${report.globalStats.stability}%
- Loyauté civile    : ${report.globalStats.loyalty}%
- Peur civile       : ${report.globalStats.fear}%
- Activité rebelle  : ${report.globalStats.rebelActivity}%
- Contamination Xen : ${report.globalStats.xenContamination}%
- Présence Combine  : ${report.globalStats.combinePresence}%
- Production indus. : ${report.globalStats.industrialProduction}%
- Rations en stock  : ${report.globalStats.rations} unités
- Énergie Citadel   : ${report.globalStats.citadelEnergy}%
- Contrôle info     : ${report.globalStats.infoControl}%

BILAN HUMAIN & LOGISTIQUE :
------------------------------------------------------------
- Pertes civiles cumulées : ${report.globalStats.civilianCasualties} (+${report.civilianCasualties})
- Pertes Combine cumulées  : ${report.globalStats.combineCasualties} (+${report.combineCasualties})
- Variation des rations   : ${report.rationsChange >= 0 ? '+' : ''}${report.rationsChange}
- Variation de production  : ${report.productionChange >= 0 ? '+' : ''}${report.productionChange}%

DIRECTIVE DE LA CITADEL :
------------------------------------------------------------
${report.directiveProgress}

INCIDENTS ET RAPPORTS DU RÉSEAU COAN :
------------------------------------------------------------
${report.incidents.length === 0 ? '- Aucun incident majeur signalé.' : report.incidents.map(inc => `- ${inc}`).join('\n')}

============================================================
    LA LOYAUTÉ OBSERVÉE EST LA LOYAUTÉ RÉCOMPENSÉE.
============================================================
  `;

  const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `Combine_Report_Day_${report.day}_City_${cityNumber}.txt`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};
