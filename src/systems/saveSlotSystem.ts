import type { GameState, SaveImportResult, SaveSlotId, SaveSlotMeta, SaveSlotPayload, SaveStorageState } from '../types/game';
import { AUTOSAVE_STORAGE_KEY, SAVE_APP_LABEL, SAVE_EXPORT_KIND, SAVE_SCHEMA_VERSION, SAVE_SLOT_STORAGE_KEY, saveSlotDefinitions } from '../data/saveSlots';
import { campaignPresets } from '../data/campaignScenarios';

function nowIso() {
  return new Date().toISOString();
}

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function checksum(text: string): string {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36).toUpperCase().padStart(7, '0');
}

function safeJsonParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function serialiseGame(game: GameState): GameState {
  return JSON.parse(JSON.stringify(game)) as GameState;
}

export function buildSaveSlotMeta(game: GameState, slotId: SaveSlotId, label: string, savedAt = nowIso()): SaveSlotMeta {
  const campaignName = campaignPresets[game.campaign.activeCampaignId]?.name ?? game.campaign.activeCampaignId;
  const dangerousSectors = game.sectors.filter((sector) => sector.rebel > 65 || sector.xen > 65 || sector.infrastructure < 35).length;
  const lostSectors = game.sectors.filter((sector) => ['Scellé', 'Bombardé', 'Abandonné', 'Contrôle rebelle', 'Infesté'].includes(sector.status)).length;
  const text = JSON.stringify({ city: game.city, day: game.day, stats: game.stats, campaign: game.campaign.activeCampaignId, reports: game.reports.length, log: game.log.slice(0, 20) });

  return {
    slotId,
    label,
    appLabel: SAVE_APP_LABEL,
    schemaVersion: SAVE_SCHEMA_VERSION,
    savedAt,
    city: game.city,
    day: game.day,
    scenario: game.scenario,
    timeline: game.timeline,
    profile: game.profile,
    campaignId: game.campaign.activeCampaignId,
    campaignName,
    ending: game.ending,
    finalVerdictTitle: game.finalVerdict?.title,
    statsSnapshot: {
      stability: game.stats.stability,
      loyalty: game.stats.loyalty,
      fear: game.stats.fear,
      rebel: game.stats.rebel,
      xen: game.stats.xen,
      production: game.stats.production,
      rations: game.stats.rations,
      suspicion: game.stats.suspicion,
      auditHeat: game.auditHeat ?? 0,
      civilianLosses: game.stats.civilianLosses,
    },
    moduleSnapshot: {
      lambdaNetwork: clamp(game.resistanceNetwork?.networkCohesion ?? game.stats.rebel),
      xenMutation: clamp(game.xenMutation?.outbreakRisk ?? game.stats.xen),
      novaInstability: clamp(game.novaProspekt?.instability ?? 0),
      rationHunger: clamp(game.rationEconomy?.hungerIndex ?? 0),
      cpAbuse: clamp(game.civilProtection?.abuseReportIndex ?? 0),
      campaignMandate: clamp(game.campaignMission?.mandateScore ?? 0),
      videoLeakRisk: clamp(game.videoArchives?.publicLeakRisk ?? 0),
      dangerousSectors,
      lostSectors,
    },
    reportCount: game.reports.length,
    logCount: game.log.length,
    checksum: checksum(text),
  };
}

export function createSaveSlotPayload(game: GameState, slotId: SaveSlotId, customLabel?: string): SaveSlotPayload {
  const definition = saveSlotDefinitions.find((slot) => slot.id === slotId);
  const savedAt = nowIso();
  const label = customLabel?.trim() || definition?.label || slotId;
  const cleanGame = serialiseGame(game);
  const meta = buildSaveSlotMeta(cleanGame, slotId, label, savedAt);
  return {
    kind: SAVE_EXPORT_KIND,
    schemaVersion: SAVE_SCHEMA_VERSION,
    appLabel: SAVE_APP_LABEL,
    slotId,
    label,
    savedAt,
    meta,
    game: cleanGame,
  };
}

export function emptySaveStorage(): SaveStorageState {
  return {
    kind: 'coan-save-storage',
    schemaVersion: SAVE_SCHEMA_VERSION,
    updatedAt: nowIso(),
    slots: [],
  };
}

export function readSaveStorage(): SaveStorageState {
  const parsed = safeJsonParse<SaveStorageState>(localStorage.getItem(SAVE_SLOT_STORAGE_KEY));
  if (!parsed || !Array.isArray(parsed.slots)) return emptySaveStorage();
  return {
    kind: 'coan-save-storage',
    schemaVersion: parsed.schemaVersion ?? SAVE_SCHEMA_VERSION,
    updatedAt: parsed.updatedAt ?? nowIso(),
    slots: parsed.slots.filter((slot) => slot?.game && slot?.meta),
  };
}

export function readManualSaveSlots(): SaveSlotPayload[] {
  const storage = readSaveStorage();
  return storage.slots;
}

export function getSaveSlot(slotId: SaveSlotId): SaveSlotPayload | null {
  return readManualSaveSlots().find((slot) => slot.slotId === slotId) ?? null;
}

export function writeSaveSlot(game: GameState, slotId: SaveSlotId, customLabel?: string): SaveSlotPayload {
  const payload = createSaveSlotPayload(game, slotId, customLabel);
  const storage = readSaveStorage();
  const next: SaveStorageState = {
    ...storage,
    schemaVersion: SAVE_SCHEMA_VERSION,
    updatedAt: payload.savedAt,
    slots: [payload, ...storage.slots.filter((slot) => slot.slotId !== slotId)],
  };
  localStorage.setItem(SAVE_SLOT_STORAGE_KEY, JSON.stringify(next));
  return payload;
}

export function deleteSaveSlot(slotId: SaveSlotId): SaveStorageState {
  const storage = readSaveStorage();
  const next = {
    ...storage,
    updatedAt: nowIso(),
    slots: storage.slots.filter((slot) => slot.slotId !== slotId),
  };
  localStorage.setItem(SAVE_SLOT_STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function readAutosaveGame(): GameState | null {
  return safeJsonParse<GameState>(localStorage.getItem(AUTOSAVE_STORAGE_KEY));
}

export function buildAutosavePayload(currentGame: GameState): SaveSlotPayload {
  return createSaveSlotPayload(currentGame, 'slot_01', 'Autosave active / COAN localStorage');
}

export function exportCurrentGame(game: GameState, slotId: SaveSlotId = 'slot_06'): string {
  return JSON.stringify(createSaveSlotPayload(game, slotId, 'Export manuel COAN'), null, 2);
}

export function exportAllManualSlots(): string {
  const storage = readSaveStorage();
  return JSON.stringify(storage, null, 2);
}

export function buildSaveFileName(meta: SaveSlotMeta): string {
  const city = `city-${meta.city}`.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
  const stamp = meta.savedAt.replace(/[:.]/g, '-');
  return `${city}-day-${String(meta.day).padStart(3, '0')}-${meta.slotId}-${stamp}.coan-save.json`;
}

export function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function isGameShape(value: unknown): value is GameState {
  const game = value as Partial<GameState> | null;
  return !!game && typeof game === 'object' && typeof game.city === 'string' && typeof game.day === 'number' && !!game.stats && Array.isArray(game.sectors);
}

export function parseImportedSave(raw: string): SaveImportResult {
  const parsed = safeJsonParse<unknown>(raw);
  if (!parsed) return { ok: false, error: 'JSON illisible ou fichier corrompu.' };

  const warnings: string[] = [];
  const candidate = parsed as Omit<Partial<SaveSlotPayload>, 'kind'> & { kind?: string; game?: unknown; slots?: SaveSlotPayload[] };

  if (candidate.kind === 'coan-save-storage' && Array.isArray(candidate.slots)) {
    return { ok: false, error: 'Ce fichier est une archive de slots complète. Importe d’abord un slot individuel ou réexporte la partie courante.' };
  }

  if (candidate.game && isGameShape(candidate.game)) {
    if ((candidate.schemaVersion ?? 0) < SAVE_SCHEMA_VERSION) warnings.push('Sauvegarde plus ancienne : migration de modules appliquée au chargement.');
    if ((candidate.schemaVersion ?? SAVE_SCHEMA_VERSION) > SAVE_SCHEMA_VERSION) warnings.push('Sauvegarde plus récente : chargement possible mais non garanti.');
    const slotId = (candidate.slotId as SaveSlotId) || 'slot_06';
    const label = candidate.label || 'Import COAN';
    const savedAt = candidate.savedAt || nowIso();
    const meta = candidate.meta ?? buildSaveSlotMeta(candidate.game, slotId, label, savedAt);
    return {
      ok: true,
      payload: {
        kind: SAVE_EXPORT_KIND,
        schemaVersion: candidate.schemaVersion ?? SAVE_SCHEMA_VERSION,
        appLabel: candidate.appLabel ?? SAVE_APP_LABEL,
        slotId,
        label,
        savedAt,
        meta,
        game: candidate.game,
      },
      warnings,
    };
  }

  if (isGameShape(parsed)) {
    warnings.push('Ancien export détecté : le fichier contenait directement GameState sans enveloppe COAN.');
    const payload = createSaveSlotPayload(parsed, 'slot_06', 'Import ancien GameState');
    return { ok: true, payload, warnings };
  }

  return { ok: false, error: 'Le fichier ne ressemble pas à une sauvegarde COAN valide.' };
}

export function persistImportedSlot(payload: SaveSlotPayload, targetSlotId: SaveSlotId): SaveSlotPayload {
  const imported = {
    ...payload,
    slotId: targetSlotId,
    label: `${payload.label} / import`,
    savedAt: nowIso(),
    meta: {
      ...payload.meta,
      slotId: targetSlotId,
      label: `${payload.label} / import`,
      savedAt: nowIso(),
    },
  };
  const storage = readSaveStorage();
  const next: SaveStorageState = {
    ...storage,
    updatedAt: imported.savedAt,
    slots: [imported, ...storage.slots.filter((slot) => slot.slotId !== targetSlotId)],
  };
  localStorage.setItem(SAVE_SLOT_STORAGE_KEY, JSON.stringify(next));
  return imported;
}
