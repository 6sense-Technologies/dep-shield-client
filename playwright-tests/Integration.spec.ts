import {test } from '@playwright/test';

test('Integration', async ({ page }) => {
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

    test('Integration', async ({ page }) => {
      await page.goto('http://localhost:3000/sign-in');
      await page.getByRole('textbox', { name: 'Enter your email' }).click();
      await page
        .getByRole('textbox', { name: 'Enter your email' })
        .fill('johndoe@example.com');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page
        .getByRole('textbox', { name: 'Password' })
        .fill('StrongP@ssw0rd!');
      await page.getByRole('button', { name: 'Sign in' }).click();
      await page.getByRole('button', { name: 'Integrations' }).click();
      await page.getByRole('button', { name: 'Connect' }).first().click();
      await page
        .getByRole('textbox', { name: 'Username or email address' })
        .click();
      await page
        .getByRole('textbox', { name: 'Username or email address' })
        .fill('khanatik1176@gmail.com');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page
        .getByRole('textbox', { name: 'Password' })
        .fill('Khanatik1176');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page
        .getByRole('textbox', { name: 'Password' })
        .fill('Khanatik-1176@6572');
      await page.getByRole('button', { name: 'Sign in', exact: true }).click();
      await page.goto(
        'https://github.com/apps/dummy-app-for-testing-00000010/installations/select_target'
      );
      await page
        .getByRole('link', { name: '@khanatik1176 khanatik1176' })
        .click();
      await page
        .getByRole('radio', { name: 'Only select repositories' })
        .check();
      await page.getByRole('button', { name: 'Select repositories' }).click();
      await page
        .getByRole('menuitem', {
          name: 'khanatik1176/restaurant_landing no description',
          exact: true,
        })
        .click();
      await page.getByRole('button', { name: 'Select repositories' }).click();
      await page
        .getByRole('menuitem', {
          name: 'khanatik1176/Softnio_Assignment no description',
          exact: true,
        })
        .click();
      await page.getByRole('button', { name: 'Install & Authorize' }).click();
      await page.goto('http://localhost:3000/integrations');
    });
  });
});
