import openNewAccountLocators from "../locators/openNewAccountLocators.json";

class OpenNewAccountPage {

    page;
    
    constructor(page) {
        this.page = page;
        this.openNewAccountHeader = page.locator(openNewAccountLocators.openNewAccountHeader);
        this.accountTypeDropdown = page.locator(openNewAccountLocators.accountTypeDropdown);
        this.existingAccountDropdown = page.locator(openNewAccountLocators.existingAccountDropdown);
        this.openAccountButton = page.locator(openNewAccountLocators.openAccountButton);
        this.accountOpeningSuccessMessage = page.locator(openNewAccountLocators.accountOpeningSuccessMessage);
        this.newAccountNumber = page.locator(openNewAccountLocators.newAccountNumber);
        this.errorMessage = page.locator(openNewAccountLocators.errorMessage);
    }

    async openOpenNewAccountPage() {
        await this.page.goto("https://example.com/open-new-account"); // Update URL as needed
    }

    async selectAccountType(accountType) {
        await this.accountTypeDropdown.selectOption({ value: accountType });
    }

    async selectExistingAccount(existingAccountId) {
        await this.existingAccountDropdown.selectOption({ value: existingAccountId });
    }

    async openNewAccount() {
        await this.openAccountButton.click();
    }

    async getAccountOpeningSuccessMessage() {
        return await this.accountOpeningSuccessMessage.textContent();
    }

    async getNewAccountNumber() {
        return await this.newAccountNumber.textContent();
    }

    async isErrorMessageVisible() {
        return await this.errorMessage.isVisible();
    }

    async verifyOpenNewAccountHeader() {
        await this.openNewAccountHeader.waitFor({ state: 'visible' });
    }
}

module.exports = { OpenNewAccountPage };
