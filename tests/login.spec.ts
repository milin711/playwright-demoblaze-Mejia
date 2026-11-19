import { test, expect } from '@playwright/test';

test.describe('HU-01 Inicio de sesión', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Log in' }).click();
  });

  test('CP-01 Login exitoso', async ({ page }) => {
    await page.locator('#loginusername').fill(process.env.DEMO_USER!);
    await page.locator('#loginpassword').fill(process.env.DEMO_PASSWORD!);
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.locator('#nameofuser')).toHaveText(`Welcome ${process.env.DEMO_USER}`);
  });

  test('CP-02 Login con contraseña incorrecta', async ({ page }) => {
    await page.locator('#loginusername').fill(process.env.DEMO_USER!);
    await page.locator('#loginpassword').fill('clave_incorrecta_123');

    const alerta = page.waitForEvent('dialog');
    await page.getByRole('button', { name: 'Log in' }).click();
    const dialog = await alerta;

    expect(dialog.message()).toBe('Wrong password.');
    await dialog.accept();
  });

  test('CP-03 Login con usuario inexistente', async ({ page }) => {
    await page.locator('#loginusername').fill('usuario_que_no_existe_98765');
    await page.locator('#loginpassword').fill('cualquier_clave');

    const alerta = page.waitForEvent('dialog');
    await page.getByRole('button', { name: 'Log in' }).click();
    const dialog = await alerta;

    expect(dialog.message()).toBe('User does not exist.');
    await dialog.accept();
  });
});
