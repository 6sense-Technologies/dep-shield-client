import { test, expect } from '@playwright/test';

test('Sign-in', async ({ page }) => {
  await page.goto('http://localhost:3000/sign-in');
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page
    .getByRole('textbox', { name: 'Enter your email' })
    .fill('johndoe@example.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('StrongP@ssw0rd!');

  // Click the sign-in button and wait for navigation
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 60000 }), // Increased timeout and using 'networkidle'
    page.getByRole('button', { name: 'Sign in' }).click(),
  ]);

  // Verify successful sign-in by checking the URL
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});
