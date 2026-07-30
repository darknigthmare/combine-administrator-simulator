import type { AtmosphereSettings } from '../types/game';
import { defaultAtmosphereSettings, mergeAtmosphereSettings } from './atmosphereSystem';

export const PLAYER_PREFERENCES_STORAGE_KEY = 'coan-player-preferences-v1';

export function hasStoredPlayerPreferences(): boolean {
  return typeof localStorage !== 'undefined' && localStorage.getItem(PLAYER_PREFERENCES_STORAGE_KEY) !== null;
}

export function readPlayerPreferences(): AtmosphereSettings {
  if (typeof localStorage === 'undefined') return defaultAtmosphereSettings;
  try {
    const saved = JSON.parse(localStorage.getItem(PLAYER_PREFERENCES_STORAGE_KEY) ?? '{}') as Partial<AtmosphereSettings>;
    return mergeAtmosphereSettings(saved);
  } catch {
    return defaultAtmosphereSettings;
  }
}

export function writePlayerPreferences(settings: AtmosphereSettings): AtmosphereSettings {
  const merged = mergeAtmosphereSettings(settings);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(PLAYER_PREFERENCES_STORAGE_KEY, JSON.stringify(merged));
  }
  return merged;
}
