import { test, expect } from '@playwright/test';

test('CP-01 Login exitoso', async ({ page }) => {
  // 1. IR
  await page.goto('/');

  // 2. ACTUAR
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill(process.env.DEMO_USER!);
  await page.locator('#loginpassword').fill(process.env.DEMO_PASSWORD!);
  await page.getByRole('button', { name: 'Log in' }).click();

  // 3. VERIFICAR
  await expect(page.locator('#nameofuser')).toHaveText(`Welcome ${process.env.DEMO_USER}`);
});
