import React, { useState, useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import { AppShell } from './components/layout/AppShell';
import { MainDashboard } from './components/dashboard/MainDashboard';
import { CityMap } from './components/city/CityMap';
import { CombineManagement } from './components/combine/CombineManagement';
import { RebelActivityPanel } from './components/resistance/RebelActivityPanel';
import { XenThreatPanel } from './components/xen/XenThreatPanel';
import { CitizenControlPanel } from './components/citizens/CitizenControlPanel';
import { DirectivePanel } from './components/dashboard/DirectivePanel';
import { DailyReportPanel } from './components/dashboard/DailyReportPanel';
import { CrisisModal } from './components/narrative/CrisisModal';
import { EndingScreen } from './components/narrative/EndingScreen';
import { Cpu, Play, Volume2, VolumeX, Eye, EyeOff, ShieldAlert, Award, FileText, Settings, AlertTriangle } from 'lucide-react';
import { generateSeed } from './systems/seededRandom';

function App() {
  const {
    gameStarted,
    endingTriggered,
    activeEvent,
    initializeGame,
    loadSavedGame,
    settings,
    setSoundEnabled,
    setScanlinesEnabled,
    resetGame,
    cityNumber
  } = useGameStore();

  const [currentTab, setTab] = useState<string>('dashboard');

  // Start Screen Form States
  const [inputCityNumber, setInputCityNumber] = useState<string>('17');
  const [selectedScenario, setSelectedScenario] = useState<any>('standard');
  const [selectedProfile, setSelectedProfile] = useState<any>('loyalist');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [inputSeed, setInputSeed] = useState<string>('');

  // Attempt to load saved game on mount
  useEffect(() => {
    loadSavedGame();
  }, []);

  const handleStartGame = () => {
    const seedNum = inputSeed ? parseInt(inputSeed) : generateSeed();
    initializeGame(
      inputCityNumber || '17',
      selectedScenario,
      selectedProfile,
      selectedDifficulty,
      seedNum
    );
    setTab('dashboard');
  };

  // Render correct panel content based on tab
  const renderTabContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <MainDashboard />;
      case 'map':
        return <CityMap />;
      case 'combine':
        return <CombineManagement />;
      case 'resistance':
        return <RebelActivityPanel />;
      case 'xen':
        return <XenThreatPanel />;
      case 'citizens':
        return <CitizenControlPanel />;
      case 'reports':
        return (
          <div className="space-y-6">
            <DirectivePanel />
            <DailyReportPanel />
          </div>
        );
      case 'settings':
        return (
          <div className="border border-slate-800 bg-[#0d141b]/60 rounded p-6 font-mono text-xs space-y-6">
            <h3 className="text-sm font-bold text-slate-200 uppercase border-b border-slate-850 pb-2 flex items-center gap-2">
              <Settings className="w-4.5 h-4.5 text-cyan-400" />
              Paramètres du Terminal Civil Authority
            </h3>

            {/* Audio/Visual toggles */}
            <div className="space-y-4 max-w-md">
              <div className="flex justify-between items-center bg-slate-950/40 p-3 border border-slate-900 rounded">
                <div>
                  <div className="font-bold text-slate-300">Sons et Alertes Système</div>
                  <p className="text-[9px] text-slate-500 leading-normal">Bruits de scan, bips radio, sirènes de l'Overwatch.</p>
                </div>
                <button
                  onClick={() => setSoundEnabled(!settings.soundEnabled)}
                  className={`p-2 rounded border transition ${
                    settings.soundEnabled
                      ? 'border-cyan-500/50 bg-cyan-950/20 text-cyan-400'
                      : 'border-slate-800 text-slate-500 bg-slate-950'
                  }`}
                >
                  {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex justify-between items-center bg-slate-950/40 p-3 border border-slate-900 rounded">
                <div>
                  <div className="font-bold text-slate-300">Effet Visuel Scanlines CRT</div>
                  <p className="text-[9px] text-slate-500 leading-normal">Simule le moniteur vidéo d'époque de la Citadel.</p>
                </div>
                <button
                  onClick={() => setScanlinesEnabled(!settings.scanlinesEnabled)}
                  className={`p-2 rounded border transition ${
                    settings.scanlinesEnabled
                      ? 'border-cyan-500/50 bg-cyan-950/20 text-cyan-400'
                      : 'border-slate-800 text-slate-500 bg-slate-950'
                  }`}
                >
                  {settings.scanlinesEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* System information */}
            <div className="bg-slate-950/80 border border-slate-900 rounded p-4 space-y-2 text-[10px] text-slate-400 leading-normal">
              <div className="font-bold text-slate-300 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-900 mb-2">
                Rapport Matériel COAN Node
              </div>
              <div>Connexion Principale : <span className="text-green-400 font-bold">ACTIVE (100% SIGNAL)</span></div>
              <div>Base de Données Locale : <span className="text-slate-200">LocalStorage (Prêt pour SQLite/IndexedDB)</span></div>
              <div>Identifiant Administratif : <span className="text-slate-200">#ADMIN-BREEN-CITY-{cityNumber}</span></div>
            </div>

            {/* Clear save */}
            <div className="pt-4 border-t border-slate-850 flex justify-end">
              <button
                onClick={() => {
                  if (confirm('Voulez-vous effacer toutes les données et recommencer ?')) {
                    resetGame();
                  }
                }}
                className="py-2.5 px-4 border border-red-950 bg-red-950/10 hover:bg-red-950/30 text-red-400 rounded transition"
              >
                Effacer la Sauvegarde Locale
              </button>
            </div>
          </div>
        );
      default:
        return <MainDashboard />;
    }
  };

  // Render Start Screen if game hasn't started yet
  if (!gameStarted) {
    return (
      <div className={`h-screen w-screen bg-[#070b0e] text-slate-100 flex flex-col justify-center items-center p-6 font-mono text-xs overflow-y-auto ${settings.scanlinesEnabled ? 'scanlines' : ''}`}>
        <div className="w-full max-w-3xl border border-slate-800 bg-[#0d141b]/60 rounded p-6 md:p-8 space-y-6 shadow-[0_0_45px_rgba(0,0,0,0.8)] relative overflow-hidden crt-flicker">
          {/* Banner image background at the top */}
          <div className="h-32 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6 relative overflow-hidden border-b border-cyan-500/20">
            <img
              src="/combine_terminal_banner.png"
              alt="Combine Terminal Banner"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d141b] via-[#0d141b]/40 to-transparent"></div>
          </div>

          <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-950/5 to-transparent pointer-events-none z-10"></div>

          {/* Title */}
          <div className="text-center space-y-2 z-20 relative">
            <div className="inline-flex p-3 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-cyan-400 animate-pulse mb-1">
              <Cpu className="w-8 h-8" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-slate-100">
              Combine Civil Authority — City {inputCityNumber}
            </h1>
            <p className="text-[10px] text-cyan-500 uppercase tracking-widest font-semibold">
              Interface Administrative de Stabilisation Urbaine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-900">
            {/* Inputs Column */}
            <div className="space-y-4">
              {/* City number */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-bold block">Numéro de Cité</label>
                <input
                  type="text"
                  value={inputCityNumber}
                  onChange={(e) => setInputCityNumber(e.target.value)}
                  placeholder="Ex: 17, 24, 12, 8"
                  className="w-full bg-[#05080c] border border-slate-800 focus:border-cyan-500/50 rounded px-3 py-2 text-slate-200 outline-none transition"
                />
              </div>

              {/* Starting scenario */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-bold block">Scénario de Départ</label>
                <select
                  value={selectedScenario}
                  onChange={(e) => setSelectedScenario(e.target.value)}
                  className="w-full bg-[#05080c] border border-slate-800 focus:border-cyan-500/50 rounded px-3 py-2 text-slate-200 outline-none transition"
                >
                  <option value="standard">Occupation standard (Stable mais sous tension)</option>
                  <option value="dormant_rebellion">Insurrection dormante (Cellules rebelles actives)</option>
                  <option value="quarantine_zone">Zone de quarantaine (Infestation Xen propagée)</option>
                  <option value="citadel_instability">Citadelle instable (Énergie fluctuating, Advisors stressés)</option>
                  <option value="post_nova_prospekt">Après Nova Prospekt (Insurrection déclarée)</option>
                  <option value="pre_hl2">Pré-Half-Life 2 (Clandestin, propagande forte)</option>
                  <option value="uprising">Mode Uprising (Guerre ouverte urbaine)</option>
                </select>
              </div>

              {/* Governance Profile */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-bold block">Profil de Gouvernance</label>
                <select
                  value={selectedProfile}
                  onChange={(e) => setSelectedProfile(e.target.value)}
                  className="w-full bg-[#05080c] border border-slate-800 focus:border-cyan-500/50 rounded px-3 py-2 text-slate-200 outline-none transition"
                >
                  <option value="loyalist">Loyaliste Combine (Bonus Overwatch, Haine civile)</option>
                  <option value="technocrat">Technocrate administratif (Bonus Production/Rations, Lenteur militaire)</option>
                  <option value="tyrant">Tyran local (Bonus Peur élevée, Explosivité sociale)</option>
                  <option value="collaborator">Collaborateur opportuniste (Privilèges Breen, Corruption CP)</option>
                  <option value="sympathizer">Sympathisant secret de la Résistance (Aide civils, Risque Advisors)</option>
                  <option value="quarantine_manager">Gestionnaire de quarantaine (Bonus Confinement Xen, Méfiance civile)</option>
                </select>
              </div>
            </div>

            {/* Difficulty and Seed Column */}
            <div className="space-y-4">
              {/* Difficulty */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-bold block">Difficulté Logistique</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['easy', 'medium', 'hard'] as const).map(diff => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`py-2 px-1 border rounded uppercase font-bold tracking-wider text-[9px] text-center transition ${
                        selectedDifficulty === diff
                          ? 'border-cyan-500/50 bg-cyan-950/20 text-cyan-400 font-bold'
                          : 'border-slate-800 bg-[#05080c] text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {diff === 'easy' ? 'FAIBLE' : diff === 'medium' ? 'UNION' : 'SÉDITION'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seed */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-bold block">Seed Aléatoire (Optionnel)</label>
                <input
                  type="text"
                  value={inputSeed}
                  onChange={(e) => setInputSeed(e.target.value)}
                  placeholder="Laisser vide pour seed aléatoire"
                  className="w-full bg-[#05080c] border border-slate-800 focus:border-cyan-500/50 rounded px-3 py-2 text-slate-200 outline-none transition"
                />
              </div>

              {/* Explanation note */}
              <div className="bg-[#05080c] border border-slate-900 rounded p-3 text-[9px] text-slate-500 leading-normal flex items-start gap-2 select-none">
                <AlertTriangle className="w-4 h-4 text-cyan-500/60 shrink-0 mt-0.5" />
                <p>
                  Attention Administrateur : Vous êtes responsable de la conformité de ce secteur. Toute incompétence entraînera un transfert ou reconditionnement forcé.
                </p>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartGame}
            className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold uppercase tracking-widest rounded transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 active:scale-99"
          >
            <Play className="w-4.5 h-4.5 fill-slate-950" />
            <span>Initialiser l'Administration</span>
          </button>
        </div>
      </div>
    );
  }

  // Render Game view if started
  return (
    <AppShell currentTab={currentTab} setTab={setTab}>
      {renderTabContent()}

      {/* Narrative event overlays */}
      <CrisisModal />
      <EndingScreen />
    </AppShell>
  );
}

export default App;
