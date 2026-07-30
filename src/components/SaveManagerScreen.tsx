import { useEffect, useMemo, useState } from 'react';
import { Archive, Download, FileInput, HardDrive, Save, ShieldCheck, Trash2, Upload } from 'lucide-react';
import type { GameState, SaveSlotId, SaveSlotPayload } from '../types/game';
import { SAVE_APP_LABEL, SAVE_SCHEMA_VERSION, saveSlotDefinitions } from '../data/saveSlots';
import { timelinePresets } from '../data/timelinePresets';
import { newGameIntakeProfileLabels } from '../data/newGameIntake';
import { campaignPresets } from '../data/campaignScenarios';
import { buildSaveFileName, buildSaveSlotMeta, createSaveSlotPayload, deleteSaveSlot, downloadTextFile, exportAllManualSlots, exportCurrentGame, parseImportedSave, persistImportedSlot, readManualSaveSlots, writeSaveSlot } from '../systems/saveSlotSystem';

type SaveManagerScreenProps = {
  game: GameState;
  loadGame: (game: GameState, source: string) => void;
};

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value));
  } catch {
    return value;
  }
}

function SlotMetaSummary({ payload }: { payload: SaveSlotPayload | null }) {
  if (!payload) return <p className="muted">Archive vide — aucun mandat enregistré.</p>;
  const meta = payload.meta;
  return <>
    <div className="module-stat-grid save-stat-grid">
      <SaveStat label="City" value={meta.city} />
      <SaveStat label="Jour" value={meta.day} />
      <SaveStat label="Stabilité" value={`${meta.statsSnapshot.stability}%`} />
      <SaveStat label="Lambda" value={`${meta.statsSnapshot.rebel}%`} />
      <SaveStat label="Xen" value={`${meta.statsSnapshot.xen}%`} />
      <SaveStat label="Audit" value={`${meta.statsSnapshot.auditHeat}%`} />
    </div>
    <p className="save-meta-line"><b>{meta.campaignName}</b> · {timelinePresets[meta.timeline]?.name ?? meta.timeline} · {newGameIntakeProfileLabels[meta.profile] ?? meta.profile}</p>
    <p className="save-meta-line">Enregistrée le {formatDate(meta.savedAt)} · sceau COAN <code>{meta.checksum}</code></p>
    {meta.finalVerdictTitle && <p className="advice"><strong>Verdict :</strong> {meta.finalVerdictTitle}</p>}
    <details className="save-diagnostics">
      <summary>État critique au moment de l’archive</summary>
      <div className="event-tags">
        <span>Secteurs dangereux {meta.moduleSnapshot.dangerousSectors}</span>
        <span>Secteurs perdus {meta.moduleSnapshot.lostSectors}</span>
        <span>Faim {meta.moduleSnapshot.rationHunger}%</span>
        <span>Abus CP {meta.moduleSnapshot.cpAbuse}%</span>
        <span>Risque de fuite {meta.moduleSnapshot.videoLeakRisk}%</span>
      </div>
    </details>
  </>;
}

export function SaveManagerScreen({ game, loadGame }: SaveManagerScreenProps) {
  const [slots, setSlots] = useState<SaveSlotPayload[]>(() => readManualSaveSlots());
  const [notice, setNotice] = useState('Registre prêt. La continuité automatique du mandat est active.');
  const [imported, setImported] = useState<SaveSlotPayload | null>(null);
  const [importWarnings, setImportWarnings] = useState<string[]>([]);
  const [importTarget, setImportTarget] = useState<SaveSlotId>('slot_06');

  const campaignName = campaignPresets[game.campaign.activeCampaignId]?.name ?? 'Mandat personnalisé';
  const currentMeta = useMemo(() => buildSaveSlotMeta(game, 'slot_01', 'Session active'), [game]);
  const slotMap = useMemo(() => new Map(slots.map((slot) => [slot.slotId, slot])), [slots]);

  function refresh() {
    setSlots(readManualSaveSlots());
  }

  useEffect(() => {
    refresh();
  }, []);

  function saveToSlot(slotId: SaveSlotId) {
    const payload = writeSaveSlot(game, slotId);
    refresh();
    setNotice(`${payload.label} enregistrée — City ${payload.meta.city}, jour ${payload.meta.day}.`);
  }

  function removeSlot(slotId: SaveSlotId) {
    const payload = slotMap.get(slotId);
    if (!payload || !window.confirm(`Purger définitivement ${payload.label} ?`)) return;
    deleteSaveSlot(slotId);
    refresh();
    setNotice('Archive purgée du registre local.');
  }

  function loadSlot(slotId: SaveSlotId) {
    const payload = slotMap.get(slotId);
    if (!payload) {
      setNotice('Cette archive est vide.');
      return;
    }
    if (!window.confirm(`Charger ${payload.label} remplacera l’état actuel du mandat. Continuer ?`)) return;
    loadGame(payload.game, `${payload.label} / ${payload.meta.checksum}`);
  }

  function exportSlot(slotId: SaveSlotId) {
    const payload = slotMap.get(slotId);
    if (!payload) {
      setNotice('Impossible d’exporter une archive vide.');
      return;
    }
    downloadTextFile(buildSaveFileName(payload.meta), JSON.stringify(payload, null, 2));
    setNotice('Dossier de transfert généré.');
  }

  function exportCurrent() {
    const payload = createSaveSlotPayload(game, 'slot_06', 'Export session active');
    downloadTextFile(buildSaveFileName(payload.meta), exportCurrentGame(game, 'slot_06'));
    setNotice('Dossier de la session active généré.');
  }

  function exportAll() {
    downloadTextFile(`coan-archives-${new Date().toISOString().replace(/[:.]/g, '-')}.json`, exportAllManualSlots());
    setNotice('Registre complet exporté.');
  }

  async function importFile(file: File | null) {
    if (!file) return;
    const result = parseImportedSave(await file.text());
    if (!result.ok) {
      setImported(null);
      setImportWarnings([]);
      setNotice(`Import refusé : ${result.error}`);
      return;
    }
    setImported(result.payload);
    setImportWarnings(result.warnings);
    setNotice(`Dossier reconnu : City ${result.payload.meta.city}, jour ${result.payload.meta.day}.`);
  }

  function loadImported() {
    if (!imported || !window.confirm('Charger ce dossier remplacera l’état actuel du mandat. Continuer ?')) return;
    loadGame(imported.game, `Dossier importé / ${imported.meta.checksum}`);
  }

  function saveImportedToSlot() {
    if (!imported) return;
    const payload = persistImportedSlot(imported, importTarget);
    refresh();
    setNotice(`Dossier importé dans ${payload.label}.`);
  }

  return <section className="panel-grid dedicated-screen save-manager-screen">
    <div className="panel module-command save-command wide">
      <span className="brand-kicker"><HardDrive size={14} /> ARCHIVES LOCALES COAN</span>
      <h2>Continuité du mandat</h2>
      <p>Enregistrez un point de divergence, restaurez une journée antérieure ou préparez un dossier de transfert.</p>
      <div className="module-stat-grid save-stat-grid">
        <SaveStat label="City active" value={game.city} />
        <SaveStat label="Jour" value={game.day} />
        <SaveStat label="Campagne" value={campaignName} />
        <SaveStat label="Rapports" value={game.reports.length} />
        <SaveStat label="Chronique" value={game.finalChronicle ? 'Générée' : 'En cours'} />
        <SaveStat label="Verdict" value={game.finalVerdict ? 'Prononcé' : 'Ouvert'} />
      </div>
      <p className="advice" role="status"><strong>Statut :</strong><br />{notice}</p>
      <div className="actions save-actions-row">
        <button onClick={exportCurrent}><Download size={15} /> Exporter la session</button>
        <button onClick={exportAll}><Archive size={15} /> Exporter le registre</button>
      </div>
    </div>

    <div className="panel current-save-panel">
      <span className="brand-kicker"><ShieldCheck size={14} /> CONTINUITÉ AUTOMATIQUE</span>
      <h2>Session actuelle</h2>
      <SlotMetaSummary payload={{ kind: 'coan-city-save', schemaVersion: SAVE_SCHEMA_VERSION, appLabel: SAVE_APP_LABEL, slotId: 'slot_01', label: 'Session active', savedAt: currentMeta.savedAt, meta: currentMeta, game }} />
      <p className="lore-note">Le terminal conserve automatiquement la dernière situation validée.</p>
    </div>

    <div className="panel import-panel">
      <span className="brand-kicker"><FileInput size={14} /> TRANSFERT DE DOSSIER</span>
      <h2>Importer une archive</h2>
      <input aria-label="Choisir une archive COAN" type="file" accept="application/json,.json,.coan-save" onChange={(event) => importFile(event.currentTarget.files?.[0] ?? null)} />
      {imported ? <div className="import-preview">
        <SlotMetaSummary payload={imported} />
        {importWarnings.length > 0 && <div className="lore-note">{importWarnings.map((warning) => <p key={warning}>{warning}</p>)}</div>}
        <label htmlFor="save-import-target">Archive cible</label>
        <select id="save-import-target" value={importTarget} onChange={(event) => setImportTarget(event.target.value as SaveSlotId)}>
          {saveSlotDefinitions.map((slot) => <option key={slot.id} value={slot.id}>{slot.label}</option>)}
        </select>
        <div className="actions save-actions-row">
          <button onClick={loadImported}><Upload size={15} /> Charger maintenant</button>
          <button onClick={saveImportedToSlot}><Save size={15} /> Archiver le dossier</button>
        </div>
      </div> : <p className="muted">Aucun dossier sélectionné. Les anciens mandats compatibles seront adaptés à l’ouverture.</p>}
    </div>

    <div className="panel save-slots-panel wide">
      <span className="brand-kicker">POINTS DE DIVERGENCE</span>
      <h2>Archives manuelles</h2>
      <div className="save-slot-grid">
        {saveSlotDefinitions.map((definition) => {
          const payload = slotMap.get(definition.id) ?? null;
          return <article key={definition.id} className={`save-slot-card tone-${definition.tone} ${payload ? 'filled' : 'empty'}`}>
            <div className="save-slot-header">
              <div><span>{definition.shortLabel}</span><strong>{definition.label}</strong><small>{definition.description}</small></div>
              <b>{payload ? `J${String(payload.meta.day).padStart(3, '0')}` : 'VIDE'}</b>
            </div>
            <SlotMetaSummary payload={payload} />
            <div className="actions save-slot-actions">
              <button onClick={() => saveToSlot(definition.id)}><Save size={14} /> Enregistrer</button>
              <button disabled={!payload} onClick={() => loadSlot(definition.id)}><Upload size={14} /> Charger</button>
              <button disabled={!payload} onClick={() => exportSlot(definition.id)}><Download size={14} /> Exporter</button>
              <button disabled={!payload} onClick={() => removeSlot(definition.id)} aria-label={`Purger ${definition.label}`} title="Purger"><Trash2 size={14} /></button>
            </div>
          </article>;
        })}
      </div>
    </div>

    <div className="panel save-protocol-panel wide">
      <span className="brand-kicker">SÉCURITÉ DU REGISTRE</span>
      <h2>Transfert et compatibilité</h2>
      <div className="codex-grid compact-codex">
        <article><strong>Continuité locale</strong><p>La dernière situation reste disponible sur ce terminal sans connexion.</p></article>
        <article><strong>Archives complètes</strong><p>Chaque point conserve la City, ses secteurs, ses ressources et l’historique du mandat.</p></article>
        <article><strong>Transfert portable</strong><p>Les dossiers exportés peuvent être déplacés vers un autre terminal compatible.</p></article>
        <article><strong>Anciens mandats</strong><p>Les archives des versions précédentes sont adaptées automatiquement lorsque cela reste possible.</p></article>
      </div>
    </div>
  </section>;
}

function SaveStat({ label, value }: { label: string; value: string | number }) {
  return <span className="module-mini-stat"><small>{label}</small><b>{value}</b></span>;
}
