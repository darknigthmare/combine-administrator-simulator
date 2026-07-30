import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
  await page.goto('/');
});

test('creates a campaign through prologue and tutorial', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Combine Administrator Simulator' })).toBeVisible();
  await page.getByRole('button', { name: 'Nouvelle campagne' }).click();
  await expect(page.getByRole('heading', { name: /Nouvelle Partie/ })).toBeVisible();

  await page.getByRole('button', { name: /City 17 vitrine/ }).click();
  await page.getByRole('button', { name: 'Configurer le mandat' }).click();
  await page.getByRole('button', { name: 'Vérifier le mandat' }).click();
  await page.getByRole('button', { name: 'Valider le mandat et ouvrir le prologue' }).click();

  await expect(page.getByRole('heading', { name: 'Le mandat est maintenant verrouillé' })).toBeVisible();
  await page.getByRole('button', { name: 'Ouvrir le tutoriel COAN' }).click();
  await expect(page.getByRole('heading', { name: 'Prise de fonction' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Nouvelle campagne' })).toHaveCount(0);
});

test('keeps settings, accessibility and credits outside the campaign', async ({ page }) => {
  await page.getByRole('button', { name: 'Réglages', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Réglages audio' })).toBeVisible();
  await expect(page.locator('.main-menu-content')).toHaveAttribute('inert', '');
  await page.getByRole('button', { name: 'Appliquer', exact: true }).click();

  await page.getByRole('button', { name: 'Crédits', exact: true }).click();
  const credits = page.getByRole('dialog', { name: 'Crédits et mentions' });
  await expect(credits).toContainText('Valve Corporation');
  await expect(credits).toContainText('fangame non commercial et non officiel');
});

test('shows a clear transition when a day closes', async ({ page }) => {
  await page.getByRole('button', { name: 'Nouvelle campagne' }).click();
  await page.getByRole('button', { name: 'Configurer le mandat' }).click();
  await page.getByRole('button', { name: 'Vérifier le mandat' }).click();
  await page.getByRole('button', { name: 'Valider le mandat et ouvrir le prologue' }).click();
  await page.getByRole('button', { name: 'Ouvrir le tutoriel COAN' }).click();
  await page.getByRole('button', { name: 'Ouvrir Command Deck', exact: true }).click();
  await page.getByRole('button', { name: 'Clôturer la journée' }).click();
  const confirmation = page.getByRole('dialog');
  if (await confirmation.getByRole('button', { name: 'Clôturer malgré tout' }).isVisible()) {
    await confirmation.getByRole('button', { name: 'Clôturer malgré tout' }).click();
  }
  await expect(page.getByRole('heading', { name: 'JOUR 002' })).toBeVisible();
});
