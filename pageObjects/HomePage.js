import homePageLocators from "../locators/homePageLocators.json";

class HomePage {

    constructor(page) {
        if (!page) {
            throw new Error("Page instance is required! Make sure to pass it from TestSetup.");
        }
        this.page = page;      
    }

    async navigateToAboutPage() {
        await this.page.locator(homePageLocators.aboutTab).click();
    }

    async navigateToContactPage() {
        await this.page.locator(homePageLocators.contactTab).click();
    }

    async navigateToServicesPage() {
        await this.page.locator(homePageLocators.servicesTab).click()
    }

    async navigateToProductsPage() {
       await this.page.locator(homePageLocators.productsTab).click();
    }
    async navigateToLocationsPage() {
        await this.page.locator(homePageLocators.locationsTab).click();
     }
     
    async logout() {
        this.page.locator(homePageLocators.logoutButton).click()
    }

    async getWelcomeMessage() {
        return await this.page.locator(homePageLocators.welcomeMessage).textContent();
    }

    async navigateToAccountOverview() {
        await this.page.locator(homePageLocators.accountOverviewLink).click();
    }

    async navigateToOpenNewAccountPage() {
        await this.page.locator(homePageLocators.openNewAccountLink).click();
    }

    async navigateToTransferFundsPage() {
        await this.page.locator(homePageLocators.transferFundsLink).click();
    }

    async navigateToBillPayPage() {
        await this.page.locator(homePageLocators.billPayLink).click();
    }

    async navigateToFindTransactionsPage() {
        await this.page.locator(homePageLocators.findTransactionsLink).click();
    }

    async navigateToUpdateProfilePage() {
        await this.page.locator(homePageLocators.updateProfileLink).click();
    }

    async navigateToRequestLoanPage() {
        await this.page.locator(homePageLocators.requestLoanLink).click();
    }

    async getFooterText() {
        return await this.page.textContent(homePageLocators.footerText);
    }

    async navigateBack() {
        await page.goBack({ waitUntil: 'domcontentloaded' });  
    }

    async navigateForward() {      
        await page.goForward({ waitUntil: 'domcontentloaded' });
    }
}

module.exports = { HomePage };
