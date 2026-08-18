import { test, expect } from '@playwright/test';

test.describe('SauceDemo login', () => {
  test('rejects invalid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('invalid_user');
    await page.locator('#password').fill('wrong_password');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match any user in this service'
    );
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test('rejects a locked out user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('locked_out_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Sorry, this user has been locked out'
    );
  });

  test('requires a username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });

  test('requires a password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]')).toContainText('Password is required');
  });

  test('logs out and blocks direct access to protected pages', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory\.html/);

    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();

    await expect(page.locator('#login-button')).toBeVisible();

    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="error"]')).toContainText(
      "you are logged in"
    );
  });
});
