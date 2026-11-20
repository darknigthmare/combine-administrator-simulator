import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Accessibility, Archive, Music2, Play, Plus, Radio, RotateCcw, ScrollText, Settings, Volume2, X } from 'lucide-react';
import type { AdministratorAvatarId, AtmosphereSettings } from '../types/game';
import { administratorAvatars } from '../data/visualAssets';
import { defaultAtmosphereSettings } from '../systems/atmosphereSystem';
import './MainMenuScreen.css';

type MenuPanel = 'settings' | 'accessibility' | 'credits' | null;

type Props = {
  hasCampaign: boolean;
  campaignEnded: boolean;
  city: string;
  day: number;
  administratorAvatar: AdministratorAvatarId;
  settings: AtmosphereSettings;
  continueCampaign: () => void;
  createCampaign: () => void;
  launchBossBattle?: () => void;
  updateSettings: (patch: Partial<AtmosphereSettings>) => void;
};

export function MainMenuScreen({
  hasCampaign,
  campaignEnded,
  city,
  day,
  administratorAvatar,
  settings,
  continueCampaign,
  createCampaign,
  launchBossBattle,
  updateSettings,
}: Props) {
  const [panel, setPanel] = useState<MenuPanel>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLElement>(null);
  const administrator = administratorAvatars[administratorAvatar];

  useEffect(() => {
    if (!panel) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();
    const handleModalKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPanel(null);
        return;
      }
      if (event.key !== 'Tab' || !modalRef.current) return;
      const controls = Array.from(modalRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      ));
      if (controls.length === 0) {
        event.preventDefault();
        modalRef.current.focus();
        return;
      }
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleModalKeyboard);
    return () => {
      window.removeEventListener('keydown', handleModalKeyboard);
      previouslyFocused?.focus();
    };
  }, [panel]);

  return <section className="main-menu-screen">
    <div className="main-menu-backdrop" aria-hidden="true" />
    <div className="main-menu-content" aria-hidden={panel ? 'true' : undefined} inert={panel ? true : undefined}>
      <span className="brand-kicker"><Radio size={14} /> COMBINE CIVIL AUTHORITY</span>
      <h1>Combine Administrator Simulator</h1>
      <p className="main-menu-subtitle">Mandat de gouvernance urbaine sous supervision Citadel.</p>

      {hasCampaign && <div className="main-menu-save">
        <img src={administrator.image} alt="" aria-hidden="true" />
        <div>
          <span>{campaignEnded ? 'Archive de campagne' : 'Mandat actif'}</span>
          <strong>City {city} / Jour {String(day).padStart(3, '0')}</strong>
          <small>{administrator.title}</small>
        </div>
      </div>}

      <div className="main-menu-actions">
        {hasCampaign && <button className="primary" onClick={continueCampaign}>
          {campaignEnded ? <Archive size={18} /> : <Play size={18} />}
          {campaignEnded ? 'Consulter la chronique' : 'Continuer la campagne'}
        </button>}
        <button className={hasCampaign ? 'secondary' : 'primary'} onClick={createCampaign}>
          <Plus size={18} /> Nouvelle campagne
        </button>
        {launchBossBattle && <button className="secondary" onClick={launchBossBattle}>
          <Play size={18} /> Half Life Resonance · Boss Battle
        </button>}
      </div>
      <div className="main-menu-utility-actions">
        <button onClick={() => setPanel('settings')}><Settings size={17} /> Réglages</button>
        <button onClick={() => setPanel('accessibility')}><Accessibility size={17} /> Accessibilité</button>
        <button onClick={() => setPanel('credits')}><ScrollText size={17} /> Crédits</button>
      </div>
    </div>

    {panel && <div className="main-menu-modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) setPanel(null);
    }}>
      <section ref={modalRef} className="main-menu-modal" role="dialog" aria-modal="true" aria-labelledby="main-menu-modal-title" tabIndex={-1}>
        <header>
          <div>
            <span className="brand-kicker">TERMINAL LOCAL / PRÉFÉRENCES JOUEUR</span>
            <h2 id="main-menu-modal-title">{panel === 'settings' ? 'Réglages audio' : panel === 'accessibility' ? 'Accessibilité visuelle' : 'Crédits et mentions'}</h2>
          </div>
          <button ref={closeButtonRef} className="icon-button" aria-label="Fermer" title="Fermer" onClick={() => setPanel(null)}><X size={19} /></button>
        </header>

        {panel === 'settings' && <div className="main-menu-settings">
          <PreferenceToggle icon={<Volume2 size={18} />} label="Audio actif" description="Active tous les sons et la musique." checked={settings.audioEnabled} onChange={(checked) => updateSettings({ audioEnabled: checked })} />
          <PreferenceToggle icon={<Music2 size={18} />} label="Partition adaptative" description="Fait évoluer la musique originale selon la pression active." checked={settings.musicEnabled} onChange={(checked) => updateSettings({ musicEnabled: checked })} />
          <label className="preference-slider"><span>Volume général <b>{settings.masterVolume}%</b></span><input type="range" min="0" max="100" value={settings.masterVolume} onChange={(event) => updateSettings({ masterVolume: Number(event.target.value) })} /></label>
          <label className="preference-slider"><span>Musique <b>{settings.musicVolume}%</b></span><input type="range" min="0" max="100" value={settings.musicVolume} onChange={(event) => updateSettings({ musicVolume: Number(event.target.value) })} /></label>
          <label className="preference-slider"><span>Effets et signaux <b>{settings.effectsVolume}%</b></span><input type="range" min="0" max="100" value={settings.effectsVolume} onChange={(event) => updateSettings({ effectsVolume: Number(event.target.value) })} /></label>
        </div>}

        {panel === 'accessibility' && <div className="main-menu-settings">
          <PreferenceToggle icon={<Accessibility size={18} />} label="Réduire les animations" description="Désactive les mouvements longs et pulsations rapides." checked={settings.reducedMotion} onChange={(checked) => updateSettings({ reducedMotion: checked })} />
          <PreferenceToggle label="Lignes de balayage" description="Effet de terminal horizontal." checked={settings.scanlines} onChange={(checked) => updateSettings({ scanlines: checked })} />
          <PreferenceToggle label="Perturbations visuelles" description="Glitch contextuel lors des crises." checked={settings.glitch} onChange={(checked) => updateSettings({ glitch: checked })} />
          <PreferenceToggle label="Aberration chromatique" description="Décalage colorimétrique lors des alertes." checked={settings.chromatic} onChange={(checked) => updateSettings({ chromatic: checked })} />
          <PreferenceToggle label="Pulsation ambiante" description="Respiration lumineuse de l’interface." checked={settings.ambientPulse} onChange={(checked) => updateSettings({ ambientPulse: checked })} />
        </div>}

        {panel === 'credits' && <div className="main-menu-credits">
          <article><strong>Conception et développement</strong><p>darknigthmare — projet de simulation administrative non officiel.</p></article>
          <article><strong>Direction visuelle</strong><p>Visuels originaux générés avec OpenAI puis intégrés spécifiquement à cette application.</p></article>
          <article><strong>Musique et effets</strong><p>Partition et signaux originaux synthétisés localement. Aucun fichier audio propriétaire de Half-Life n’est inclus.</p></article>
          <article><strong>Mentions</strong><p>Half-Life, City 17, Combine et les éléments associés appartiennent à Valve Corporation. Ce fangame non commercial et non officiel n’est ni affilié, ni approuvé par Valve.</p></article>
          <article><strong>Technologies</strong><p>React, Vite, Tauri, Recharts, Zustand, Lucide et leurs licences respectives.</p></article>
        </div>}

        {panel !== 'credits' && <footer>
          <button onClick={() => updateSettings(defaultAtmosphereSettings)}><RotateCcw size={16} /> Restaurer les réglages</button>
          <button className="primary" onClick={() => setPanel(null)}>Appliquer</button>
        </footer>}
      </section>
    </div>}
  </section>;
}

function PreferenceToggle({
  icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon?: ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return <label className="preference-toggle">
    <span className="preference-toggle-icon" aria-hidden="true">{icon}</span>
    <span><strong>{label}</strong><small>{description}</small></span>
    <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
  </label>;
}
