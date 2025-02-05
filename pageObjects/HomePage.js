import homePageLocators from "../locators/homePageLocators.json";

class HomePage {

    constructor(page) {
        this.page = page;
        this.homeTab = page.locator(homePageLocators.homeTab);
        this.aboutTab = page.locator(homePageLocators.aboutTab);
        this.contactTab = page.locator(homePageLocators.contactTab);
        this.servicesTab = page.locator(homePageLocators.servicesTab);
        this.adminPageLink = page.locator(homePageLocators.adminPageLink);
        this.logoutButton = page.locator(homePageLocators.logoutButton);
        this.welcomeMessage = page.locator(homePageLocators.welcomeMessage);
        this.accountOverviewHeader = page.locator(homePageLocators.accountOverviewHeader);
        this.accountTable = page.locator(homePageLocators.accountTable);
        this.newAccountButton = page.locator(homePageLocators.newAccountButton);
        this.transferFundsLink = page.locator(homePageLocators.transferFundsLink);
        this.billPayLink = page.locator(homePageLocators.billPayLink);
        this.findTransactionsLink = page.locator(homePageLocators.findTransactionsLink);
        this.updateProfileLink = page.locator(homePageLocators.updateProfileLink);
        this.requestLoanLink = page.locator(homePageLocators.requestLoanLink);
        this.footerText = page.locator(homePageLocators.footerText);
    }

    async openHomePage() {
        await this.page.goto("https://example.com/home"); // Update URL as needed
    }

    async navigateToAboutPage() {
        await this.aboutTab.click();
    }

    async navigateToContactPage() {
        await this.contactTab.click();
    }

    async navigateToServicesPage() {
        await this.servicesTab.click();
    }

    async navigateToAdminPage() {
        await this.adminPageLink.click();
    }

    async logout() {
        await this.logoutButton.click();
    }

    async getWelcomeMessage() {
        return await this.welcomeMessage.textContent();
    }

    async navigateToAccountOverview() {
        await this.accountOverviewHeader.click();
    }

    async openNewAccountPage() {
        await this.newAccountButton.click();
    }

    async navigateToTransferFundsPage() {
        await this.transferFundsLink.click();
    }

    async navigateToBillPayPage() {
        await this.billPayLink.click();
    }

    async navigateToFindTransactionsPage() {
        await this.findTransactionsLink.click();
    }

    async navigateToUpdateProfilePage() {
        await this.updateProfileLink.click();
    }

    async navigateToRequestLoanPage() {
        await this.requestLoanLink.click();
    }

    async getFooterText() {
        return await this.footerText.textContent();
    }
}

module.exports = { HomePage };
