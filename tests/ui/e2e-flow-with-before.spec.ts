import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'

let authPage: LoginPage

test.describe('Login and Order Creation pages', () => {

test.beforeEach(async ({ page }) => {
  authPage = new LoginPage(page)
  await authPage.open()
})

test('signIn button disabled when incorrect data inserted', async ({}) => {
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(7))
  await expect(authPage.signInButton).toBeDisabled()
})

test('error message displayed when incorrect credentials used', async ({}) => {
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(8))
  await authPage.signInButton.click()
  await expect(authPage.authErrorMessage).toBeVisible()
})

test('login with correct credentials and verify order creation page', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await expect(orderCreationPage.statusButton).toBeVisible()
  await expect(orderCreationPage.nameInput).toBeVisible()
  await expect(orderCreationPage.phoneInput).toBeVisible()
  await expect(orderCreationPage.commentInput).toBeVisible()
  await expect(orderCreationPage.createOrderButton).toBeVisible()
})

test('login and create order', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.nameInput.fill(faker.lorem.word(6))
  await orderCreationPage.phoneInput.fill(faker.lorem.word(6))
  await orderCreationPage.commentInput.fill(faker.lorem.word(20))
  await orderCreationPage.createOrderButton.click()
  await expect.soft(orderCreationPage.orderCreationContainer).toBeVisible()
  await expect.soft(orderCreationPage.okPopUpButton).toBeVisible()
})

test('login and log out', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.logOutButton.click()
  await expect.soft(authPage.signInButton).toBeEnabled()
})
})