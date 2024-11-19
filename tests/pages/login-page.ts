import { Locator, Page } from '@playwright/test'
import OrderPage from './order-page'
import { SERVICE_URL } from '../../config/env-data'

export default class LoginPage {
  readonly page: Page
  readonly url: string = SERVICE_URL
  readonly signInButton: Locator
  readonly usernameField: Locator
  readonly passwordField: Locator
  readonly authErrorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.signInButton = this.page.getByTestId('signIn-button')
    this.usernameField = this.page.getByTestId('username-input')
    this.passwordField = this.page.getByTestId('password-input')
    this.authErrorMessage = this.page.getByTestId('authorizationError-popup-close-button')
  }

  private async fillSignInFields(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username)
    await this.passwordField.fill(password)
  }

  public async open(): Promise<void> {
    await this.page.goto(this.url)
  }

  public async signIn(username: string, password: string): Promise<OrderPage> {
    await this.fillSignInFields(username, password)
    await this.clickButton('signIn')
    return new OrderPage(this.page)
  }

  public async clickButton(button: string): Promise<void> {
    if (button === 'signIn') await this.signInButton.click()
  }
}
