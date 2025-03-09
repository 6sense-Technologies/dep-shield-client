import { expect, test } from '@playwright/test';

test('Verification', async ({ page }) => {
  // Set a longer timeout for the entire test
  test.setTimeout(120000); // 2 minutes

  // Mock the network request for the sign-up process
  await page.route('**/api/auth/signup', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        userInfo: { emailAddress: 'nesame9192@bmixr.com' },
        accessToken: 'mockAccessToken',
      }),
    });
  });

  // Mock the network request for the verification process
  await page.route('**/api/auth/verify', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, isValidated: true }),
    });
  });

  // Mock the network request for the session update
  await page.route('**/api/auth/session', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ isVerified: true, hasOrganization: false }),
    });

    test('test', async ({ page }) => {
      await page.goto('http://localhost:3000/sign-up');
      await page.getByRole('textbox', { name: 'Enter your full name' }).click();
      await page
        .getByRole('textbox', { name: 'Enter your full name' })
        .fill('Khan Atik Faisal');
      await page.getByRole('textbox', { name: 'Enter your email' }).click();
      await page.getByRole('textbox', { name: 'Enter your email' }).click();
      await page
        .getByRole('textbox', { name: 'Enter your email' })
        .fill('kojicit633@makroyal.com');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page
        .getByRole('textbox', { name: 'Password' })
        .fill('Khanatik1176@');
      await page.getByRole('button', { name: 'Sign up' }).click();
      await page.goto('http://localhost:3000/sign-up/verification');
      await page.getByText('Resend').click();
      await page.locator('input[name="token"]').click();
      await page.locator('input[name="token"]').fill('104280');
      await page.getByRole('button', { name: 'Submit' }).click();
      await page.waitForURL('http://localhost:3000/dashboard');
      expect(page.url()).toBe('http://localhost:3000/dashboard');
    });
  });
});
