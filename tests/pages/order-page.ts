import { Locator, Page } from '@playwright/test'
import BasePage from './base-page'

export default class OrderPage extends BasePage {
  readonly statusButton: Locator
  readonly nameInput: Locator
  readonly phoneInput: Locator
  readonly commentInput: Locator
  readonly createOrderButton: Locator
  readonly okPopUpButton: Locator
  readonly orderCreationContainer: Locator
  readonly logOutButton: Locator

  constructor(page: Page) {
    super(page)

    this.statusButton = this.page.getByTestId('openStatusPopup-button')
    this.nameInput = this.page.getByTestId('username-input')
    this.commentInput = this.page.getByTestId('comment-input')
    this.phoneInput = this.page.getByTestId('phone-input')
    this.createOrderButton = this.page.getByTestId('createOrder-button')
    this.okPopUpButton = this.page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
    this.orderCreationContainer = this.page.getByTestId('orderSuccessfullyCreated-popup')
    this.logOutButton = this.page.getByTestId('logout-button')
  }

  public async clickButton(button: string): Promise<void> {
    if (button === 'orderStatusPopUp')
      await this.page.getByTestId('searchOrder-popup-close-button').click({ force: true })
    if (button === 'status') await this.statusButton.click({ force: true })
    if (button === 'createOrder') await this.createOrderButton.click()
    if (button === 'logOut') await this.logOutButton.click()
  }
}
