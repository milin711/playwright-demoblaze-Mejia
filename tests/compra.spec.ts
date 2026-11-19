import { test, expect } from '@playwright/test';

test.describe('HU-03 Finalizar compra', () => {
  // Precondición: tener el Samsung galaxy s6 en el carrito y abrir el formulario
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();

    const alerta = page.waitForEvent('dialog');
    await page.getByRole('link', { name: 'Add to cart' }).click();
    const dialog = await alerta;
    await dialog.accept();

    await page.getByRole('link', { name: 'Cart', exact: true }).click();
    await expect(page.getByRole('cell', { name: 'Samsung galaxy s6' })).toBeVisible();
    await page.getByRole('button', { name: 'Place Order' }).click();
  });

  test('CP-06 Compra completa', async ({ page }) => {
    await page.locator('#name').fill('Cliente de Prueba');
    await page.locator('#country').fill('Colombia');
    await page.locator('#city').fill('Bogotá');
    await page.locator('#card').fill('4111111111111111');
    await page.locator('#month').fill('12');
    await page.locator('#year').fill('2030');
    await page.getByRole('button', { name: 'Purchase' }).click();

    await expect(page.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();
    await expect(page.getByText('Amount: 360 USD')).toBeVisible();
  });

  test('CP-07 Compra sin datos obligatorios', async ({ page }) => {
    const alerta = page.waitForEvent('dialog').then(async (dialog) => {
      const mensaje = dialog.message();
      await dialog.accept();
      return mensaje;
    });
    await page.getByRole('button', { name: 'Purchase' }).click();

    expect(await alerta).toBe('Please fill out Name and Creditcard.');
  });

  test('CP-08 La fecha de la compra es la de hoy', async ({ page }) => {
    // Defecto conocido: Demoblaze muestra el mes anterior.
    // Con test.fail() la prueba "pasa" mientras el defecto exista,
    // y avisa cuando lo arreglen.
    test.fail(true, 'Defecto: la fecha muestra el mes anterior');

    await page.locator('#name').fill('Cliente de Prueba');
    await page.locator('#card').fill('4111111111111111');
    await page.getByRole('button', { name: 'Purchase' }).click();

    const hoy = new Date();
    const fechaEsperada = `Date: ${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}`;
    await expect(page.getByText(fechaEsperada)).toBeVisible();
  });
});
