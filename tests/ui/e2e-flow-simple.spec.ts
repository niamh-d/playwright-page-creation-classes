import { test, expect } from '@playwright/test'
import LoginPage from '../pages/login-page'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { faker } from '@faker-js/faker'

test.describe('Login and Order Creation pages', () => {
  test('signIn button disabled when incorrect data inserted', async ({ page }) => {
    const authPage = new LoginPage(page)
    await authPage.open()
    await authPage.usernameField.fill(faker.lorem.word(2))
    await authPage.passwordField.fill(faker.lorem.word(7))
    await expect.soft(authPage.signInButton).toBeDisabled()
  })

  test('login with correct credentials and verify order creation page', async ({ page }) => {
    const authPage = new LoginPage(page)
    await authPage.open()
    const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
    await orderCreationPage.clickButton('status')
    await orderCreationPage.clickButton('orderStatusPopUp')
    await expect.soft(orderCreationPage.nameInput).toBeVisible()
    await expect.soft(orderCreationPage.commentInput).toBeVisible()
    await expect.soft(orderCreationPage.phoneInput).toBeVisible()
  })
})
