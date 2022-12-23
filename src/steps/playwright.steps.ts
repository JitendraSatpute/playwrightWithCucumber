import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

const emailTextField = '[data-cy="email"]';
const passwordTextField = '[data-cy="password"]';
const submitButton = '[type="submit"]';
const sideBar = "[id='sidebar']";

Given('Navigate to the visn website', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.goto(config.BASE_URL);
  await page.locator(emailTextField).waitFor();
});

When(
  'Enter user credentials {string} and {string}',
  async function (this: ICustomWorld, username: string, password: string) {
    const page = this.page!;
    await page.locator(emailTextField).fill(username);
    await page.locator(passwordTextField).fill(password);
  },
);

When('Click on submit button', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.locator(submitButton).click();
});

Then('App should land on HomePage', async function (this: ICustomWorld) {
  const page = this.page!;
  await expect(page.locator(sideBar)).toHaveCount(0);
});

Then(
  'App should throw inline message for invalid username and password',
  async function (this: ICustomWorld) {
    const page = this.page!;
    await expect(page.getByText('Invalid email or password')).toBeVisible();
  },
);

Then(
  'App should throw inline message for username and password required field',
  async function (this: ICustomWorld) {
    const page = this.page!;
    await expect(page.getByText('Email address is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  },
);
