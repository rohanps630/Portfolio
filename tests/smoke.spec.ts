import { test, expect } from '@playwright/test';

const routes = [
  '/',
  '/about',
  '/projects',
  '/projects/ai-code-reviewer',
  '/notes',
  '/notes/building-ai-code-reviewer',
  '/contact',
  '/resume',
];

for (const route of routes) {
  test(`smoke test ${route} in light and dark mode`, async ({ page }) => {
    // Light mode
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto(route);
    await expect(page).toHaveTitle(/Rohan/);

    // main landmark + a real heading must render (catches error boundaries)
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Dark mode
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(route);
    await expect(page).toHaveTitle(/Rohan/);
  });
}

test('search palette results navigate to real pages', async ({ page }) => {
  await page.goto('/');
  // Click the trigger rather than pressing ⌘K: the palette is a client-only
  // dynamic import, and clicking waits for hydration; the hotkey would race it.
  await page.getByRole('button', { name: 'Search' }).click();

  const dialog = page.getByRole('dialog', { name: 'Site search' });
  await expect(dialog).toBeVisible();

  await dialog.getByRole('textbox').fill('architecture');
  const firstResult = dialog.locator('ul button').first();
  await expect(firstResult).toBeVisible();
  await firstResult.click();

  // Pagefind URLs come from static build output — a regression here surfaces
  // as ".html" in the address bar and a 404 page.
  await expect(page).not.toHaveURL(/\.html/);
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('h1, h2').first()).toBeVisible();
});

test('contact form submits successfully', async ({ page }) => {
  await page.goto('/contact');
  // getByRole('textbox') scopes to form fields — the page also has a mailto
  // icon link with aria-label="Email" that getByLabel would collide with.
  await page.getByRole('textbox', { name: 'Name' }).fill('Test Visitor');
  await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
  await page
    .getByRole('textbox', { name: 'Message' })
    .fill('This is an automated smoke-test message with enough characters.');
  await page.getByRole('button', { name: /send message/i }).click();
  await expect(
    page.getByRole('heading', { name: /thank you for reaching out/i })
  ).toBeVisible();
});
