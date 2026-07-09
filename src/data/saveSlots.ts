import type { SaveSlotDefinition, SaveSlotId } from '../types/game';

export const SAVE_SCHEMA_VERSION = 36;
export const SAVE_APP_LABEL = 'Combine Administrator Simulator — Lore Upgrade Step 36';
export const AUTOSAVE_STORAGE_KEY = 'combine-city-lore-upgrade';
export const SAVE_SLOT_STORAGE_KEY = 'combine-city-lore-manual-slots-v36';
export const SAVE_EXPORT_KIND = 'coan-city-save';

export const saveSlotDefinitions: SaveSlotDefinition[] = [
  {
    id: 'slot_01',
    label: 'Slot 01 — Mandat principal',
    shortLabel: 'S01',
    description: 'Sauvegarde manuelle recommandée avant les journées critiques, audits Advisor ou crises Xen.',
    tone: 'city',
  },
  {
    id: 'slot_02',
    label: 'Slot 02 — Branche alternative',
    shortLabel: 'S02',
    description: 'Point de divergence pour tester une autre doctrine Citadel, un autre rationnement ou une autre ligne BreenCast.',
    tone: 'citadel',
  },
  {
    id: 'slot_03',
    label: 'Slot 03 — Dossier Nova Prospekt',
    shortLabel: 'S03',
    description: 'Sauvegarde à réserver aux décisions de transfert, Biotics, interrogatoires et dossiers noirs Nova.',
    tone: 'nova',
  },
  {
    id: 'slot_04',
    label: 'Slot 04 — Quarantaine Xen',
    shortLabel: 'S04',
    description: 'Point de sécurité avant mutation, catastrophe Xen, purge, scellement ou statut Ravenholm-like.',
    tone: 'xen',
  },
  {
    id: 'slot_05',
    label: 'Slot 05 — Double jeu / Lambda',
    shortLabel: 'S05',
    description: 'Slot utile pour les branches sympathisant secret, libération clandestine ou falsification de rapports.',
    tone: 'resistance',
  },
  {
    id: 'slot_06',
    label: 'Slot 06 — Archive finale',
    shortLabel: 'S06',
    description: 'Slot de conservation avant verdict final, chronique COAN ou export long de campagne.',
    tone: 'archive',
  },
];

export const saveSlotOrder: SaveSlotId[] = saveSlotDefinitions.map((slot) => slot.id);
