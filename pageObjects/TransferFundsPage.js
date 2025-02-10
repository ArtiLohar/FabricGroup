import transferFundsLocators from "../locators/transferFundsLocators.json";

class TransferFundsPage {

    constructor(page) {
        if (!page) {
            throw new Error("Page instance is required! Make sure to pass it from TestSetup.");
        }
        this.page = page;      
    }

    async openTransferFundsPage() {
        await this.page.goto("https://example.com/transfer-funds"); // Update URL as needed
    }

    async fillTransferDetails(amount, fromAccountId) {
        await this.page.locator(transferFundsLocators.amountField).fill(amount);
        await this.page.selectOption(transferFundsLocators.fromAccountDropdown, { value: fromAccountId });
       // await this.page.selectOption(transferFundsLocators.toAccountDropdown, { value: toAccountId });
    }

    async submitTransfer() {
        await this.page.locator(transferFundsLocators.transferButton).click();
    }

    async getTransferMessage() {
        return await this.page.locator(transferFundsLocators.transferMessage).textContent();
    }

    async verifyTransferConfirmationHeader() {
        await this.page.waitForTimeout(3000);      
        return await this.page.locator(transferFundsLocators.transferConfirmationHeader).isVisible();
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
