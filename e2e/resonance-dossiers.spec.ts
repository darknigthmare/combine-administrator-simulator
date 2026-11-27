import { expect, test } from '@playwright/test';

test('explains a locked dossier and prepares its operation without locking the playable roster', async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
  await page.goto('/?module=resonance-boss-battle');
  await expect(page.getByRole('heading', { name: 'Boss Battle', exact: true })).toBeVisible();

  const dossiers = page.getByRole('region', { name: '04 — Dossiers de terrain' });
  await expect(dossiers.getByRole('button', { name: /Dossier classifié — à débloquer/ })).toHaveCount(4);
  await dossiers.getByRole('button', { name: /Dropship.*Dossier classifié — à débloquer/ }).click();
  const conditions = page.locator('#dossier_dropship_hl2_detail');
  await expect(conditions).toBeVisible();
  await expect(conditions).toContainText('Réussir l’opération Dropship OU terminer les quatre opérations du Boss Rush.');
  await conditions.getByRole('button', { name: 'Préparer l’opération Dropship', exact: true }).click();

  await expect(page.getByRole('heading', { name: 'Détruire la nacelle, neutraliser les renforts, puis laisser le transport se retirer.' })).toBeVisible();
  await expect(page.locator('#bb-mode')).toHaveValue('single');
  await expect(page.locator('.bb-fighters > button')).toHaveCount(6);
  await expect(page.locator('.bb-fighters > button:disabled')).toHaveCount(0);
  await expect(page.locator('.bb-bosses > button')).toHaveCount(4);
  await expect(page.locator('.bb-bosses > button:disabled')).toHaveCount(0);
  await expect(page.locator('#bb-mode > option')).toHaveCount(3);
});

test('recovers a legacy Strider victory and retains its permanent dossier after records are removed', async ({ page }) => {
  await page.addInitScript(() => {
    // Seed once per tab so reloading really exercises the migrated collection.
    if (sessionStorage.getItem('resonance.dossiers.e2e.seeded')) return;
    localStorage.clear();
    localStorage.setItem('resonance.bossBattle.records.v1', JSON.stringify({
      version: 1,
      entries: { 'gordon_hl2|strider_hl2|single|normal': { score: 5000, rank: 'B', activeTicks: 1000 } },
    }));
    sessionStorage.setItem('resonance.dossiers.e2e.seeded', 'true');
  });
  await page.goto('/?module=resonance-boss-battle');

  const dossiers = page.getByRole('region', { name: '04 — Dossiers de terrain' });
  const strider = dossiers.getByRole('button', { name: /Strider.*Acquis définitivement/ });
  await expect(strider).toBeVisible();
  await expect(dossiers.getByRole('button', { name: /Dossier classifié — à débloquer/ })).toHaveCount(3);
  await strider.click();
  await expect(page.locator('#dossier_strider_hl2_detail')).toContainText('Le RPG et les orbes AR2 peuvent détruire le Strider');
  await expect.poll(async () => page.evaluate(() => {
    const saved = JSON.parse(localStorage.getItem('resonance.progression.dossiers.v1') ?? 'null');
    return saved?.permanent?.dossier_strider_hl2;
  })).toEqual({ ruleId: 'unlock_dossier_strider_hl2_v1', source: 'legacy_record', acquiredAt: null });

  await page.evaluate(() => localStorage.removeItem('resonance.bossBattle.records.v1'));
  await page.reload();
  await expect(dossiers.getByRole('button', { name: /Strider.*Acquis définitivement/ })).toBeVisible();
  await expect(dossiers.getByRole('button', { name: /Dossier classifié — à débloquer/ })).toHaveCount(3);
  await expect(page.locator('.bb-fighters > button')).toHaveCount(6);
  await expect(page.locator('.bb-fighters > button:disabled')).toHaveCount(0);
  await expect(page.locator('.bb-bosses > button')).toHaveCount(4);
  await expect(page.locator('.bb-bosses > button:disabled')).toHaveCount(0);
});
