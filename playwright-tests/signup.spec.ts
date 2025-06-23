import { test} from '@playwright/test';

test('Sign-up', async ({ page }) => {
  await page.goto('http://localhost:3000/sign-up');
  await page.getByRole('textbox', { name: 'Enter your full name' }).click();
  await page.getByRole('textbox', { name: 'Enter your full name' }).fill('Khan Atik Faisal');
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('kojicit633@makroyal.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Khanatik1176@');
  await page.getByRole('button', { name: 'Sign up' }).click();
});