import { Locator, Page } from '@playwright/test'
import BasePage from './base-page'

export default class FoundOrderPage extends BasePage {
  readonly orderOpenStatus: Locator

  constructor(page: Page) {
    super(page)
    this.orderOpenStatus = this.page.getByTestId('status-item-0')
  }
}
