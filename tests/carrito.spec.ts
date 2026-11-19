import { test, expect } from '@playwright/test';

test.describe('HU-02 Agregar producto al carrito', () => {
  // Precondición: abrir la página del Samsung galaxy s6
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
    await expect(page.getByRole('heading', { name: 'Samsung galaxy s6' })).toBeVisible();
  });

  test('CP-04 Agregar el Samsung galaxy s6', async ({ page }) => {
    const alerta = page.waitForEvent('dialog');
    await page.getByRole('link', { name: 'Add to cart' }).click();
    const dialog = await alerta;

    expect(dialog.message()).toBe('Product added');
    await dialog.accept();
  });

  test('CP-05 El producto aparece en el carrito', async ({ page }) => {
    // Agregar y aceptar la alerta
    const alerta = page.waitForEvent('dialog');
    await page.getByRole('link', { name: 'Add to cart' }).click();
    const dialog = await alerta;
    await dialog.accept();

    // Ir al carrito
    await page.getByRole('link', { name: 'Cart', exact: true }).click();

    await expect(page.getByRole('cell', { name: 'Samsung galaxy s6' })).toBeVisible();
    await expect(page.locator('#totalp')).toHaveText('360');
  });
});
