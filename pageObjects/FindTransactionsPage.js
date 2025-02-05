import findTransactionsLocators from "../locators/findTransactionLocators.json";

class FindTransactionsPage {

    constructor(page) {
        this.page = page;
        this.findTransactionsHeader = page.locator(findTransactionsLocators.findTransactionsHeader);
        this.accountDropdown = page.locator(findTransactionsLocators.accountDropdown);
        this.transactionIdField = page.locator(findTransactionsLocators.transactionIdField);
        this.findByTransactionIdButton = page.locator(findTransactionsLocators.findByTransactionIdButton);
        this.fromDateField = page.locator(findTransactionsLocators.fromDateField);
        this.toDateField = page.locator(findTransactionsLocators.toDateField);
        this.findByDateButton = page.locator(findTransactionsLocators.findByDateButton);
        this.amountField = page.locator(findTransactionsLocators.amountField);
        this.findByAmountButton = page.locator(findTransactionsLocators.findByAmountButton);
        this.transactionResultsTable = page.locator(findTransactionsLocators.transactionResultsTable);
        this.noTransactionsMessage = page.locator(findTransactionsLocators.noTransactionsMessage);
    }

    async openFindTransactionsPage() {
        await this.page.goto("https://example.com/findtransactions"); // Update URL as needed
    }

    async selectAccount(accountId) {
        await this.accountDropdown.selectOption({ value: accountId });
    }

    async setTransactionId(transactionId) {
        await this.transactionIdField.fill(transactionId);
    }

    async setTransactionDateRange(fromDate, toDate) {
        await this.fromDateField.fill(fromDate);
        await this.toDateField.fill(toDate);
    }

    async setAmount(amount) {
        await this.amountField.fill(amount);
    }

    async findTransactionsByTransactionId() {
        await this.findByTransactionIdButton.click();
    }

    async findTransactionsByDate() {
        await this.findByDateButton.click();
    }

    async findTransactionsByAmount() {
        await this.findByAmountButton.click();
    }

    async getTransactionResults() {
        return await this.transactionResultsTable.textContent();
    }

    async isNoTransactionsMessageVisible() {
        return await this.noTransactionsMessage.isVisible();
    }

    async verifyFindTransactionsHeader() {
        await this.findTransactionsHeader.waitFor({ state: 'visible' });
    }
}

module.exports = { FindTransactionsPage };
