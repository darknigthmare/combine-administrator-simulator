import { describe, expect, it } from 'vitest';
import { createInitialGame } from '../App';
import { finalEndingOrder } from '../data/finalVerdicts';
import { buildFinalVerdict } from './finalVerdictSystem';
import { getLoreCodexEntries, buildLoreCodexExport } from './loreCodexSystem';
import { runLongRunVerification } from './longRunSimulation';
import { runPreReleaseMatrix } from './preReleaseMatrixSystem';

describe('pre-release quality gates', () => {
  it('validates every campaign creation combination', () => {
    const report = runPreReleaseMatrix();
    expect(report.ok, report.checks.filter((check) => !check.pass).map((check) => check.label).join(', ')).toBe(true);
    expect(report.cases).toHaveLength(6 * 7 * 6);
  });

  it('keeps long campaigns sustainable while producing pressure', () => {
    const report = runLongRunVerification();
    expect(report.ok, report.checks.filter((check) => !check.pass).map((check) => check.label).join(', ')).toBe(true);
    expect(report.scenarios.every((scenario) => scenario.crisisDays > 0 && scenario.quietDays > 0)).toBe(true);
  });

  it.each(finalEndingOrder)('builds the %s final verdict end to end', (endingId) => {
    const game = createInitialGame('17', 'pre_hl2', 'pre_hl2', 'loyalist', 'city17_pre_hl2', 'standard_occupation');
    const verdict = buildFinalVerdict(game, game.stats, game.sectors, endingId);
    expect(verdict?.endingId).toBe(endingId);
    expect(verdict?.axes.length).toBeGreaterThanOrEqual(8);
    expect(verdict?.archiveLines.length).toBeGreaterThan(4);
  });

  it('exports a player-facing codex with resolved city references', () => {
    const text = buildLoreCodexExport(getLoreCodexEntries('all').slice(0, 3), '17');
    expect(text).toContain('CITY 17');
    expect(text).not.toContain('{{CITY_NUMBER}}');
    expect(text).not.toContain('relatedSystems');
    expect(text).not.toContain('relatedModules');
  });
});
