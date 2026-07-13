import type { DailyOrderState, DifficultyPresetId, GameState } from '../types/game';

const orderBudgetByDifficulty: Record<DifficultyPresetId, number> = {
  civil_observer: 5,
  standard_occupation: 4,
  hardline_city: 4,
  quarantine_blacksite: 4,
  uprising_nightmare: 3,
  custom: 4,
};

export function createDailyOrderState(day: number, difficulty: DifficultyPresetId): DailyOrderState {
  const total = orderBudgetByDifficulty[difficulty] ?? 4;
  return { day, total, remaining: total, usedActionIds: [], issuedLabels: [] };
}

export function migrateDailyOrderState(game: Partial<GameState>): DailyOrderState {
  const difficulty = game.difficultySettings?.activePresetId ?? 'standard_occupation';
  const base = createDailyOrderState(game.day ?? 1, difficulty);
  const saved = game.dailyOrders;
  if (!saved || saved.day !== (game.day ?? 1)) return base;
  return {
    ...base,
    ...saved,
    total: Math.max(1, saved.total ?? base.total),
    remaining: Math.max(0, Math.min(saved.remaining ?? base.remaining, saved.total ?? base.total)),
    usedActionIds: [...new Set(saved.usedActionIds ?? [])],
    issuedLabels: (saved.issuedLabels ?? []).slice(0, 8),
  };
}

export function dailyOrderRefusal(state: DailyOrderState, actionId: string, cost = 1): string | null {
  if (state.usedActionIds.includes(actionId)) return 'Ordre déjà exécuté pendant ce cycle.';
  if (state.remaining < cost) return 'Capacité administrative épuisée. Clôturez la journée pour recevoir de nouveaux ordres.';
  return null;
}

export function spendDailyOrder(state: DailyOrderState, actionId: string, label: string, cost = 1): DailyOrderState {
  return {
    ...state,
    remaining: Math.max(0, state.remaining - cost),
    usedActionIds: [...state.usedActionIds, actionId],
    issuedLabels: [label, ...state.issuedLabels].slice(0, 8),
  };
}

export function resetDailyOrders(game: Pick<GameState, 'day' | 'difficultySettings'>, nextDay: number): DailyOrderState {
  return createDailyOrderState(nextDay, game.difficultySettings.activePresetId);
}
