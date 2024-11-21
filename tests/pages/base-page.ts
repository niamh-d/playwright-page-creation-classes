import { expect, Locator, Page } from '@playwright/test'

export default abstract class BasePage {
  readonly page: Page
  readonly languageSwitcherBlock: Locator
  readonly footerPrivacyLink: Locator

  protected constructor(page: Page) {
    this.page = page
    this.languageSwitcherBlock = page.locator('div.language')
    this.footerPrivacyLink = page.getByTestId('privacy-policy')
  }

  async checkLanguageSelector() {
    await expect(this.languageSwitcherBlock).toBeVisible()
  }

  async checkPrivacyPolicyLink() {
    await expect(this.footerPrivacyLink).toBeVisible()
  }
}
