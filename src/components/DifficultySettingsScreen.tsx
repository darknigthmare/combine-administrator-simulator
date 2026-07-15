import type { DifficultyPresetId, DifficultyScalarKey, DifficultyScalars, GameState } from '../types/game';
import { difficultyPresetOrder, difficultyPresets, difficultyScalarLabels } from '../data/difficultySettings';

function ScalarControl({ scalarKey, value, onChange, readOnly }: { scalarKey: DifficultyScalarKey; value: number; onChange: (key: DifficultyScalarKey, value: number) => void; readOnly: boolean }) {
  const meta = difficultyScalarLabels[scalarKey];
  const percent = Math.round(((value - 0.35) / 1.65) * 100);
  return <article className="difficulty-scalar-card">
    <div className="difficulty-scalar-head">
      <div>
        <strong>{meta.label}</strong>
        <span>{meta.help}</span>
      </div>
      <b>×{value.toFixed(2)}</b>
    </div>
    <input type="range" min="0.35" max="2" step="0.05" value={value} disabled={readOnly} onChange={(event) => onChange(scalarKey, Number(event.target.value))} />
    <div className="difficulty-range-note">
      <span>{meta.low}</span>
      <i><em style={{ width: `${percent}%` }} /></i>
      <span>{meta.high}</span>
    </div>
  </article>;
}

const scalarGroups: Array<{ title: string; subtitle: string; keys: DifficultyScalarKey[] }> = [
  { title: 'Menaces principales', subtitle: 'Rythme Lambda/Xen et pression de campagne.', keys: ['lambdaForce', 'xenVelocity', 'campaignPressure'] },
  { title: 'Citadelle / audits', subtitle: 'Sévérité haute autorité, tolérance Advisor et rapports.', keys: ['citadelSeverity', 'advisorTolerance', 'reportAuditStrictness'] },
  { title: 'Économie civique', subtitle: 'Rations, production et fragilité sociale.', keys: ['rationScarcity', 'productionBase', 'citizenFragility'] },
  { title: 'Appareil de contrôle', subtitle: 'Civil Protection, Nova Prospekt et dette technologique.', keys: ['cpBrutality', 'novaPressure', 'technologyDebt'] },
];

export function DifficultyScalarControls({ scalars, onChange, readOnly = false, compact = false }: { scalars: DifficultyScalars; onChange: (key: DifficultyScalarKey, value: number) => void; readOnly?: boolean; compact?: boolean }) {
  return <div className={`difficulty-scalar-controls ${compact ? 'compact' : ''}`}>
    {scalarGroups.map((group) => <details key={group.title} open={compact ? undefined : true}>
      <summary><strong>{group.title}</strong><span>{group.subtitle}</span></summary>
      <div className="difficulty-scalar-grid">
        {group.keys.map((key) => <ScalarControl key={key} scalarKey={key} value={scalars[key]} onChange={onChange} readOnly={readOnly} />)}
      </div>
    </details>)}
  </div>;
}

export function DifficultySettingsScreen({ game, applyPreset, updateScalar, resetCustom, readOnly = false }: { game: GameState; applyPreset: (presetId: DifficultyPresetId) => void; updateScalar: (key: DifficultyScalarKey, value: number) => void; resetCustom: () => void; readOnly?: boolean }) {
  const difficulty = game.difficultySettings;
  const preset = difficultyPresets[difficulty.activePresetId] ?? difficultyPresets.standard_occupation;
  const highScalars = Object.entries(difficulty.scalars).filter(([, value]) => value >= 1.3);
  const lowScalars = Object.entries(difficulty.scalars).filter(([, value]) => value <= 0.75);

  return <section className="panel-grid dedicated-screen difficulty-screen">
    <div className="panel module-command difficulty-command wide">
      <span className="brand-kicker">COAN Difficulty Matrix / Operator mandate</span>
      <h2>Paramètres avancés de difficulté</h2>
      <p>La difficulté n’est pas seulement un niveau : elle modifie le comportement de Lambda, Xen, Citadel, Advisor, les rations, la production, la Civil Protection, Nova Prospekt et la fragilité civile.</p>
      <div className="module-stat-grid">
        <span className="module-mini-stat"><small>Profil actif</small><b>{preset.name}</b></span>
        <span className="module-mini-stat danger"><small>Menace projetée</small><b>{difficulty.projectedThreat}%</b></span>
        <span className="module-mini-stat danger"><small>Pression/jour</small><b>{difficulty.dailyPressure}%</b></span>
        <span className="module-mini-stat danger"><small>Mod. audit</small><b>{difficulty.auditModifier}%</b></span>
        <span className="module-mini-stat"><small>Appliqué jour</small><b>{difficulty.lastAppliedDay}</b></span>
      </div>
      <p className="lore-note"><b>Résumé :</b> {difficulty.startSummary}</p>
      <p className="advice"><strong>{preset.classification}</strong><br />{preset.loreFrame}</p>
      {readOnly && <p className="lore-note">Mandat verrouillé : ces paramètres sont définis à la création et restent en lecture seule pendant la campagne.</p>}
    </div>

    <div className="panel difficulty-presets-panel">
      <span className="brand-kicker">Profils prédéfinis</span>
      <h2>Mandats COAN</h2>
      <div className="operation-list difficulty-preset-list">
        {difficultyPresetOrder.map((id) => {
          const item = difficultyPresets[id];
          return <button key={id} disabled={readOnly} className={difficulty.activePresetId === id ? 'selected-operation' : ''} onClick={() => applyPreset(id)}>
            <strong>{item.name}</strong>
            <span>{item.subtitle}</span>
            <em>{item.recommendedFor}</em>
          </button>;
        })}
      </div>
      <button className="module-danger-button" disabled={readOnly} onClick={resetCustom}>Réinitialiser vers occupation standard</button>
    </div>

    <div className="panel difficulty-summary-panel">
      <span className="brand-kicker">Diagnostic</span>
      <h2>Lecture opératoire</h2>
      <div className="feed compact-feed">
        <p>▸ Si Lambda est haut, les cellules avancent plus vite vers opérations simultanées et soulèvement ouvert.</p>
        <p>▸ Si Xen est haut, les couches biologiques, chaînes de mutation, quarantaines et catastrophes gagnent du terrain.</p>
        <p>▸ Si tolérance Advisor est basse, chaque rapport falsifié devient une menace de remplacement.</p>
        <p>▸ Si rations sont rares et citoyens fragiles, la faim devient une mécanique centrale de radicalisation.</p>
        <p>▸ Si CP/Nova sont hauts, la peur monte vite, mais la mémoire sociale devient explosive.</p>
      </div>
      <div className="event-tags difficulty-tags">
        {highScalars.map(([key, value]) => <span key={key} className="negative">{difficultyScalarLabels[key as DifficultyScalarKey].label} ×{Number(value).toFixed(2)}</span>)}
        {lowScalars.map(([key, value]) => <span key={key} className="positive">{difficultyScalarLabels[key as DifficultyScalarKey].label} ×{Number(value).toFixed(2)}</span>)}
      </div>
      <p className="lore-note">Les réglages sont sauvegardés dans les slots/export JSON. Les anciennes sauvegardes migrent en occupation standard.</p>
    </div>

    {scalarGroups.map((group) => <div key={group.title} className="panel difficulty-group-panel wide">
      <span className="brand-kicker">{group.subtitle}</span>
      <h2>{group.title}</h2>
      <div className="difficulty-scalar-grid">
        {group.keys.map((key) => <ScalarControl key={key} scalarKey={key} value={difficulty.scalars[key]} onChange={updateScalar} readOnly={readOnly} />)}
      </div>
    </div>)}

    <div className="panel wide">
      <span className="brand-kicker">Journal difficulté</span>
      <h2>Historique COAN</h2>
      <div className="feed compact-feed">
        {difficulty.log.slice(0, 12).map((line, index) => <p key={`${line}-${index}`}>▸ {line}</p>)}
      </div>
    </div>
  </section>;
}
