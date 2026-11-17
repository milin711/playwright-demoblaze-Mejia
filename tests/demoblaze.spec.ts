import { test, expect } from '@playwright/test';

test('CP-00 La página de inicio carga', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/STORE/);
});
