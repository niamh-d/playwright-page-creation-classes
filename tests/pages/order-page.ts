import { Locator, Page } from '@playwright/test'
import BasePage from './base-page'
import { faker } from '@faker-js/faker'
import FoundOrderPage from './found-order-page'

export default class OrderPage extends BasePage {
  readonly statusButton: Locator
  readonly nameInput: Locator
  readonly phoneInput: Locator
  readonly commentInput: Locator
  readonly createOrderButton: Locator
  readonly okPopUpButton: Locator
  orderCreationContainer: Locator
  readonly logOutButton: Locator
  readonly searchOrderInput: Locator
  readonly searchOrderSubmitButton: Locator

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
    this.searchOrderInput = this.page.getByTestId('searchOrder-input')
    this.searchOrderSubmitButton = this.page.getByTestId('searchOrder-submitButton')
  }

  public async clickButton(button: string): Promise<void> {
    if (button === 'orderStatusPopUp')
      await this.page.getByTestId('searchOrder-popup-close-button').click({ force: true })
    if (button === 'status') await this.statusButton.click({ force: true })
    if (button === 'tracking') await this.searchOrderSubmitButton.click({ force: true })
    if (button === 'createOrder') await this.createOrderButton.click({ force: true })
    if (button === 'logOut') await this.logOutButton.click()
    if (button === 'closeOk') await this.okPopUpButton.click()
  }

  public async createOrder(): Promise<void> {
    await this.nameInput.fill(faker.lorem.word(7))
    await this.phoneInput.fill(faker.phone.number())
    await this.commentInput.fill(faker.lorem.word(7))
    await this.clickButton('createOrder')
  }

  public async checkOrderStatus(): Promise<FoundOrderPage> {
    await this.clickButton('status')
    await this.searchOrderInput.fill('2370')
    await this.clickButton('tracking')
    return new FoundOrderPage(this.page)
  }
}
