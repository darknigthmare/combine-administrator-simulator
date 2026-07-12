import type { GameState } from '../types/game';
import { campaignPresets } from '../data/campaignScenarios';
import { difficultyPresets } from '../data/difficultySettings';
import { timelinePresets } from '../data/timelinePresets';
import { administratorAvatars } from '../data/visualAssets';

export function CampaignPrologueScreen({ game, continueToTutorial }: { game: GameState; continueToTutorial: () => void }) {
  const campaign = campaignPresets[game.campaign.activeCampaignId];
  const timeline = timelinePresets[game.timeline];
  const difficulty = difficultyPresets[game.difficultySettings.activePresetId];
  const avatar = administratorAvatars[game.administratorAvatar];

  return <section className="campaign-prologue-screen">
    <div className="prologue-visual" style={{ backgroundImage: "url('/openai-visuals/banners/command-deck.png')" }}>
      <div className="prologue-copy">
        <span className="brand-kicker">CITADEL MANDATE / PROLOGUE</span>
        <h1>City {game.city}</h1>
        <p>{campaign.briefing}</p>
      </div>
    </div>
    <div className="prologue-dossier panel">
      <img src={avatar.image} alt="" aria-hidden="true" />
      <div>
        <span className="brand-kicker">MANDAT ATTRIBUÉ</span>
        <h2>{avatar.title}</h2>
        <p>{campaign.openingReport}</p>
        <div className="tag-row"><span>{campaign.name}</span><span>{timeline.name}</span><span>{difficulty.name}</span></div>
      </div>
    </div>
    <div className="panel prologue-order">
      <span className="brand-kicker">ORDRE DE PRISE DE FONCTION</span>
      <h2>Le mandat est maintenant verrouillé</h2>
      <p>La campagne, la timeline, le profil et la difficulté ne pourront plus être remplacés pendant cette session. Le tutoriel COAN présente ensuite les outils disponibles avant la première décision.</p>
      <button className="primary" onClick={continueToTutorial}>Ouvrir le tutoriel COAN</button>
    </div>
  </section>;
}
