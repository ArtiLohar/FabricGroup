import openNewAccountLocators from "../locators/openNewAccountLocators.json";

class OpenNewAccountPage {

    constructor(page) {
        if (!page) {
            throw new Error("Page instance is required! Make sure to pass it from TestSetup.");
        }
        this.page = page;      
    }

    async clickOnOpenNewAccountLeftPanel() {
        await this.page.click(openNewAccountLocators.openNewAccountLeftMenuOption);
    }

    async selectAccountType(accountType) {
        await this.page.selectOption(openNewAccountLocators.accountTypeDropdown, { value: accountType });
    }
    

    async selectExistingAccount(existingAccountId) {
        await this.page.selectOption(openNewAccountLocators.existingAccountDropdown, { value: existingAccountId });
    }

    async clickOnOpenNewAccountBttn() {
     await this.page.click(openNewAccountLocators.existingAccountDropdown);
     await this.page.keyboard.press('Tab');
     await this.page.waitForTimeout(2000); 
     await this.page.keyboard.press('Tab');
     await this.page.waitForTimeout(2000); 
     await this.page.keyboard.press('Enter');
    }
    

    async getAccountOpeningSuccessMessage() {
        return await this.page.textContent(openNewAccountLocators.accountOpeningSuccessMessage);
    }

    async getNewAccountNumber() {
        await this.page.waitForSelector(openNewAccountLocators.newAccountNumber, { state: 'visible' });
        return await this.page.textContent(openNewAccountLocators.newAccountNumber);
    }
    

    async isErrorMessageVisible() {
        return await this.page.isVisible(openNewAccountLocators.errorMessage);
    }

    async verifyOpenNewAccountHeader() {
        await this.page(openNewAccountLocators.openNewAccountHeader);
    }
}

module.exports = { OpenNewAccountPage };
