import { expect, test } from '@playwright/test';

test('counter works on the home page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible();
  const count = page.getByLabel('Current count');

  await expect(count).toHaveText('0');

  await page.getByRole('button', { name: 'Increment' }).click();
  await page.getByRole('button', { name: 'Increment' }).click();
  await expect(count).toHaveText('2');

  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(count).toHaveText('0');
});

test('navigates to users and lists them from the mocked API', async ({
  page,
}) => {
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Users' })
    .click();

  await expect(page).toHaveURL('/users');
  await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(3);
});

test('deep links work and unknown routes show not found', async ({ page }) => {
  await page.goto('/users');
  await expect(page.getByText('Grace Hopper')).toBeVisible();

  await page.goto('/nope');
  await expect(
    page.getByRole('heading', { name: 'Page not found' }),
  ).toBeVisible();
});
