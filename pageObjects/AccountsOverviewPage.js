import accountsOverviewLocators from "../locators/accountOverviewLocators.json";

class AccountsOverviewPage {

    constructor(page) {
        this.page = page;
        this.accountsOverviewHeader = page.locator(accountsOverviewLocators.accountsOverviewHeader);
        this.accountsTable = page.locator(accountsOverviewLocators.accountsTable);
        this.accountRows = page.locator(accountsOverviewLocators.accountRows);
        this.accountColumnHeaders = page.locator(accountsOverviewLocators.accountColumnHeaders);
        this.accountLinks = page.locator(accountsOverviewLocators.accountLinks);
        this.totalBalance = page.locator(accountsOverviewLocators.totalBalance);
        this.goToTransactionHistory = page.locator(accountsOverviewLocators.goToTransactionHistory);
    }

    async openAccountsOverviewPage() {
        await this.page.goto("https://parabank.parasoft.com/parabank/overview.htm");
    }

    async getAccountsCount() {
        return await this.accountRows.count();
    }

    async getAccountColumnHeaders() {
        const headers = await this.accountColumnHeaders.allTextContents();
        return headers.map(header => header.trim());
    }

    async getAllAccountLinks() {
        const links = await this.accountLinks.all();
        return Promise.all(links.map(async (link) => await link.getAttribute('href')));
    }

    async getTotalBalance() {
        return await this.totalBalance.textContent();
    }

    async navigateToTransactionHistory() {
        await this.goToTransactionHistory.click();
    }
}

module.exports = { AccountsOverviewPage };
