import { test, expect } from '@playwright/test'
import LoginPage from '../pages/login-page'
import OrderPage from '../pages/order-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'

test.describe('Login and Order Creation pages', () => {
  let authPage: LoginPage

  test.beforeEach(async ({ page }) => {
    authPage = new LoginPage(page)
    await authPage.open()
  })

  test.describe('Log in tests', () => {
    test('signIn button disabled when incorrect data inserted', async ({}) => {
      await authPage.usernameField.fill(faker.lorem.word(2))
      await authPage.passwordField.fill(faker.lorem.word(7))
      await expect.soft(authPage.signInButton).toBeDisabled()
    })

    test('error message displayed when incorrect credentials used', async ({}) => {
      await authPage.usernameField.fill(faker.lorem.word(2))
      await authPage.passwordField.fill(faker.lorem.word(8))
      await authPage.signInButton.click()
      await expect.soft(authPage.authErrorMessage).toBeVisible()
    })

    test('verify language container', async ({}) => {
      await authPage.checkLanguageSelector()
    })

    test('verify footer on login page', async ({}) => {
      await authPage.checkPrivacyPolicyLink()
    })
  })

  test.describe('Order creation tests', () => {
    let orderCreationPage: OrderPage

    test.beforeEach(async () => {
      orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
    })

    test('login with correct credentials and verify order creation page', async ({}) => {
      await expect.soft(orderCreationPage.statusButton).toBeVisible()
      await expect.soft(orderCreationPage.nameInput).toBeVisible()
      await expect.soft(orderCreationPage.phoneInput).toBeVisible()
      await expect.soft(orderCreationPage.commentInput).toBeVisible()
      await expect.soft(orderCreationPage.createOrderButton).toBeVisible()
    })

    test('login and create order', async ({}) => {
      await orderCreationPage.createOrder()
      await expect.soft(orderCreationPage.orderCreationContainer).toBeVisible()
      await expect.soft(orderCreationPage.okPopUpButton).toBeVisible()
      await orderCreationPage.clickButton('closeOk')
    })

    test('login and log out', async ({}) => {
      await orderCreationPage.clickButton('logOut')
      await expect.soft(authPage.signInButton).toBeEnabled()
    })

    test('verify privacy policy link', async ({}) => {
      await orderCreationPage.checkPrivacyPolicyLink()
      await expect
        .soft(orderCreationPage.statusButton)
        .toHaveCSS('background-color', 'rgb(253, 204, 0)')
    })

    test('check order exists', async ({}) => {
      const foundOrderPage = await orderCreationPage.checkOrderStatus()
      await expect.soft(foundOrderPage.orderOpenStatus).toBeVisible()
    })
  })
})
