import { test, expect } from '@playwright/test';

const routes = [
  '/',
  '/about',
  '/projects',
  '/projects/ai-code-reviewer',
  '/blog',
  '/contact'
];

for (const route of routes) {
  test(`smoke test ${route} in light and dark mode`, async ({ page }) => {
    // Light mode
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto(route);
    await expect(page).toHaveTitle(/Rohan/);
    
    // Check main element exists
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Dark mode
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(route);
    await expect(page).toHaveTitle(/Rohan/);
  });
}
