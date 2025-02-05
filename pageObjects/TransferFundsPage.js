import transferFundsLocators from "../locators/transferFundsLocators.json";

class TransferFundsPage {

    constructor(page) {
        this.page = page;
        this.transferFundsHeader = page.locator(transferFundsLocators.transferFundsHeader);
        this.amountField = page.locator(transferFundsLocators.amountField);
        this.fromAccountDropdown = page.locator(transferFundsLocators.fromAccountDropdown);
        this.toAccountDropdown = page.locator(transferFundsLocators.toAccountDropdown);
        this.transferButton = page.locator(transferFundsLocators.transferButton);
        this.transferMessage = page.locator(transferFundsLocators.transferMessage);
        this.transferConfirmationHeader = page.locator(transferFundsLocators.transferConfirmationHeader);
        this.transferredAmount = page.locator(transferFundsLocators.transferredAmount);
        this.fromAccountNumber = page.locator(transferFundsLocators.fromAccountNumber);
        this.toAccountNumber = page.locator(transferFundsLocators.toAccountNumber);
    }

    async openTransferFundsPage() {
        await this.page.goto("https://example.com/transfer-funds"); // Update URL as needed
    }

    async fillTransferDetails(amount, fromAccountId, toAccountId) {
        await this.amountField.fill(amount);
        await this.fromAccountDropdown.selectOption({ value: fromAccountId });
        await this.toAccountDropdown.selectOption({ value: toAccountId });
    }

    async submitTransfer() {
        await this.transferButton.click();
    }

    async getTransferMessage() {
        return await this.transferMessage.textContent();
    }

    async verifyTransferConfirmationHeader() {
        await this.transferConfirmationHeader.waitFor({ state: 'visible' });
    }

    async getTransferredAmount() {
        return await this.transferredAmount.textContent();
    }

    async getFromAccountNumber() {
        return await this.fromAccountNumber.textContent();
    }

    async getToAccountNumber() {
        return await this.toAccountNumber.textContent();
    }

    async verifyTransferSuccess() {
        const headerVisible = await this.transferConfirmationHeader.isVisible();
        const transferredAmount = await this.getTransferredAmount();
        return headerVisible && transferredAmount !== '';
    }
}

module.exports = { TransferFundsPage };
