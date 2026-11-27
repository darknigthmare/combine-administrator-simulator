/** Rules are authored with the catalogue; player saves contain facts, never rules. */
export type UnlockCondition =
  | { type: 'counter'; counter: string; atLeast: number; label: string }
  | { type: 'all' | 'any'; conditions: readonly UnlockCondition[]; label: string };

export interface ConditionResult {
  met: boolean;
  label: string;
  operator: 'counter' | 'all' | 'any';
  current?: number;
  target?: number;
  children?: readonly ConditionResult[];
}

export function evaluateCondition(
  condition: UnlockCondition,
  counters: Readonly<Record<string, number>>,
  depth = 0,
): ConditionResult {
  // Fail closed for an accidentally empty or excessively nested authored rule.
  if (depth > 16) return { met: false, label: condition.label, operator: condition.type };
  if (condition.type === 'counter') {
    const raw = Object.hasOwn(counters, condition.counter) ? counters[condition.counter] : 0;
    const current = Number.isFinite(raw) && raw >= 0 ? Math.floor(raw) : 0;
    const validTarget = Number.isSafeInteger(condition.atLeast) && condition.atLeast > 0;
    return {
      met: validTarget && current >= condition.atLeast,
      label: condition.label,
      operator: 'counter',
      current: validTarget ? Math.min(current, condition.atLeast) : current,
      target: condition.atLeast,
    };
  }
  const children = condition.conditions.map((child) => evaluateCondition(child, counters, depth + 1));
  return {
    met: children.length > 0 && (condition.type === 'all' ? children.every((child) => child.met) : children.some((child) => child.met)),
    label: condition.label,
    operator: condition.type,
    children,
  };
}
