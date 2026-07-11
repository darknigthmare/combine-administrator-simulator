import { useEffect, useMemo, useState } from 'react';
import type { GameState, SaveSlotId, SaveSlotPayload } from '../types/game';
import { saveSlotDefinitions } from '../data/saveSlots';
import { buildSaveFileName, buildSaveSlotMeta, createSaveSlotPayload, deleteSaveSlot, downloadTextFile, exportAllManualSlots, exportCurrentGame, parseImportedSave, persistImportedSlot, readManualSaveSlots, writeSaveSlot } from '../systems/saveSlotSystem';

type SaveManagerScreenProps = {
  game: GameState;
  loadGame: (game: GameState, source: string) => void;
};

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short', timeStyle: 'medium' }).format(new Date(value));
  } catch {
    return value;
  }
}

function SlotMetaSummary({ payload }: { payload: SaveSlotPayload | null }) {
  if (!payload) return <p className="muted">Slot vide — aucun mandat archivé.</p>;
  const meta = payload.meta;
  return <>
    <div className="module-stat-grid save-stat-grid">
      <span><small>City</small><b>{meta.city}</b></span>
      <span><small>Jour</small><b>{meta.day}</b></span>
      <span><small>Stabilité</small><b>{meta.statsSnapshot.stability}%</b></span>
      <span><small>Lambda</small><b>{meta.statsSnapshot.rebel}%</b></span>
      <span><small>Xen</small><b>{meta.statsSnapshot.xen}%</b></span>
      <span><small>Audit</small><b>{meta.statsSnapshot.auditHeat}%</b></span>
    </div>
    <p className="save-meta-line"><b>{meta.campaignName}</b> · {meta.timeline} · {meta.profile}</p>
    <p className="save-meta-line">Sauvé le {formatDate(meta.savedAt)} · checksum COAN <code>{meta.checksum}</code></p>
    {meta.finalVerdictTitle && <p className="advice"><strong>Verdict :</strong> {meta.finalVerdictTitle}</p>}
    <div className="event-tags">
      <span>danger sectors {meta.moduleSnapshot.dangerousSectors}</span>
      <span>lost sectors {meta.moduleSnapshot.lostSectors}</span>
      <span>hunger {meta.moduleSnapshot.rationHunger}%</span>
      <span>CP abuse {meta.moduleSnapshot.cpAbuse}%</span>
      <span>video leak {meta.moduleSnapshot.videoLeakRisk}%</span>
    </div>
  </>;
}

export function SaveManagerScreen({ game, loadGame }: SaveManagerScreenProps) {
  const [slots, setSlots] = useState<SaveSlotPayload[]>(() => readManualSaveSlots());
  const [notice, setNotice] = useState('COAN Save Manager prêt. Autosave locale active via localStorage.');
  const [imported, setImported] = useState<SaveSlotPayload | null>(null);
  const [importWarnings, setImportWarnings] = useState<string[]>([]);
  const [importTarget, setImportTarget] = useState<SaveSlotId>('slot_06');

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
    setNotice(`Sauvegarde écrite dans ${payload.label} — City ${payload.meta.city}, jour ${payload.meta.day}, checksum ${payload.meta.checksum}.`);
  }

  function removeSlot(slotId: SaveSlotId) {
    deleteSaveSlot(slotId);
    refresh();
    setNotice(`Slot ${slotId.toUpperCase()} purgé du registre local.`);
  }

  function loadSlot(slotId: SaveSlotId) {
    const payload = slotMap.get(slotId);
    if (!payload) {
      setNotice('Aucun dossier dans ce slot.');
      return;
    }
    loadGame(payload.game, `${payload.label} / ${payload.meta.checksum}`);
  }

  function exportSlot(slotId: SaveSlotId) {
    const payload = slotMap.get(slotId);
    if (!payload) {
      setNotice('Impossible d’exporter un slot vide.');
      return;
    }
    downloadTextFile(buildSaveFileName(payload.meta), JSON.stringify(payload, null, 2));
    setNotice(`Export du slot ${slotId.toUpperCase()} généré.`);
  }

  function exportCurrent() {
    const payload = createSaveSlotPayload(game, 'slot_06', 'Export session active');
    downloadTextFile(buildSaveFileName(payload.meta), exportCurrentGame(game, 'slot_06'));
    setNotice('Export JSON de la session active généré.');
  }

  function exportAll() {
    downloadTextFile(`coan-manual-save-slots-${new Date().toISOString().replace(/[:.]/g, '-')}.json`, exportAllManualSlots());
    setNotice('Archive JSON de tous les slots manuels générée.');
  }

  async function importFile(file: File | null) {
    if (!file) return;
    const raw = await file.text();
    const result = parseImportedSave(raw);
    if (!result.ok) {
      setImported(null);
      setImportWarnings([]);
      setNotice(`Import refusé : ${result.error}`);
      return;
    }
    setImported(result.payload);
    setImportWarnings(result.warnings);
    setNotice(`Import lu : City ${result.payload.meta.city}, jour ${result.payload.meta.day}, checksum ${result.payload.meta.checksum}.`);
  }

  function loadImported() {
    if (!imported) return;
    loadGame(imported.game, `Import JSON / ${imported.meta.checksum}`);
  }

  function saveImportedToSlot() {
    if (!imported) return;
    const payload = persistImportedSlot(imported, importTarget);
    refresh();
    setNotice(`Import écrit dans ${importTarget.toUpperCase()} — ${payload.meta.campaignName}.`);
  }

  return <section className="panel-grid dedicated-screen save-manager-screen">
    <div className="panel module-command save-command wide">
      <span className="brand-kicker">COAN Save Manager / local archive</span>
      <h2>Sauvegardes multiples</h2>
      <p>Gestion locale des mandats City : slots manuels, autosave, export/import JSON et restauration complète de l’état de simulation. Les modules ajoutés jusque l’étape 36 sont conservés dans le payload.</p>
      <div className="module-stat-grid save-stat-grid">
        <span><small>City active</small><b>{game.city}</b></span>
        <span><small>Jour</small><b>{game.day}</b></span>
        <span><small>Campagne</small><b>{game.campaign.activeCampaignId}</b></span>
        <span><small>Rapports</small><b>{game.reports.length}</b></span>
        <span><small>Chronique</small><b>{game.finalChronicle ? 'générée' : 'inactive'}</b></span>
        <span><small>Verdict</small><b>{game.finalVerdict ? 'verrouillé' : 'ouvert'}</b></span>
      </div>
      <p className="advice"><strong>Statut :</strong><br />{notice}</p>
      <div className="actions save-actions-row">
        <button onClick={exportCurrent}>Exporter la session active</button>
        <button onClick={exportAll}>Exporter tous les slots</button>
      </div>
    </div>

    <div className="panel current-save-panel">
      <span className="brand-kicker">Autosave active</span>
      <h2>Session actuelle</h2>
      <SlotMetaSummary payload={{ kind: 'coan-city-save', schemaVersion: 36, appLabel: currentMeta.appLabel, slotId: 'slot_01', label: 'Session active', savedAt: currentMeta.savedAt, meta: currentMeta, game }} />
      <p className="lore-note">Cette autosave continue d’utiliser la clé historique <code>combine-city-lore-upgrade</code> pour rester compatible avec les étapes précédentes.</p>
    </div>

    <div className="panel import-panel">
      <span className="brand-kicker">Import / transfert</span>
      <h2>Importer un fichier COAN</h2>
      <input type="file" accept="application/json,.json,.coan-save" onChange={(event) => importFile(event.currentTarget.files?.[0] ?? null)} />
      {imported ? <div className="import-preview">
        <SlotMetaSummary payload={imported} />
        {importWarnings.length > 0 && <div className="lore-note">{importWarnings.map((warning) => <p key={warning}>⚠ {warning}</p>)}</div>}
        <label>Slot cible pour stocker l’import</label>
        <select value={importTarget} onChange={(event) => setImportTarget(event.target.value as SaveSlotId)}>
          {saveSlotDefinitions.map((slot) => <option key={slot.id} value={slot.id}>{slot.label}</option>)}
        </select>
        <div className="actions save-actions-row">
          <button onClick={loadImported}>Charger maintenant</button>
          <button onClick={saveImportedToSlot}>Stocker dans le slot</button>
        </div>
      </div> : <p className="muted">Aucun fichier importé. Les anciens exports GameState directs sont acceptés et migrés au chargement.</p>}
    </div>

    <div className="panel save-slots-panel wide">
      <span className="brand-kicker">Slots manuels</span>
      <h2>Archives locales</h2>
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
              <button onClick={() => saveToSlot(definition.id)}>Sauver ici</button>
              <button disabled={!payload} onClick={() => loadSlot(definition.id)}>Charger</button>
              <button disabled={!payload} onClick={() => exportSlot(definition.id)}>Exporter</button>
              <button disabled={!payload} onClick={() => removeSlot(definition.id)}>Purger</button>
            </div>
          </article>;
        })}
      </div>
    </div>

    <div className="panel save-protocol-panel wide">
      <span className="brand-kicker">Compatibilité / migration</span>
      <h2>Protocole de sauvegarde Step 36</h2>
      <div className="codex-grid compact-codex">
        <article><strong>Compatibilité ancienne autosave</strong><p>Les parties déjà présentes dans <code>combine-city-lore-upgrade</code> sont hydratées avec les migrations de tous les modules.</p></article>
        <article><strong>Payload complet</strong><p>Chaque slot contient le GameState complet : City, secteurs, citoyens, Lambda, Xen, Nova, Vortigaunts, objectifs, verdicts, archives vidéo et audio.</p></article>
        <article><strong>Export portable</strong><p>Un fichier <code>.coan-save.json</code> peut être copié entre machines ou placé dans un repo privé.</p></article>
        <article><strong>Limite</strong><p>Le stockage reste local au navigateur/Tauri. Pour cloud sync ou SQLite, il faudra une étape dédiée.</p></article>
      </div>
    </div>
  </section>;
}
