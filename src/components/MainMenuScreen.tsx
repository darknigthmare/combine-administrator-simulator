import { Archive, Play, Plus, Radio } from 'lucide-react';
import type { AdministratorAvatarId } from '../types/game';
import { administratorAvatars } from '../data/visualAssets';
import './MainMenuScreen.css';

type Props = {
  hasCampaign: boolean;
  campaignEnded: boolean;
  city: string;
  day: number;
  administratorAvatar: AdministratorAvatarId;
  continueCampaign: () => void;
  createCampaign: () => void;
};

export function MainMenuScreen({ hasCampaign, campaignEnded, city, day, administratorAvatar, continueCampaign, createCampaign }: Props) {
  const administrator = administratorAvatars[administratorAvatar];
  return <section className="main-menu-screen">
    <div className="main-menu-backdrop" aria-hidden="true" />
    <div className="main-menu-content">
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
      </div>
    </div>
  </section>;
}
