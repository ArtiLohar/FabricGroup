import requestLoanLocators from "../locators/requestLoanLocators.json";

class RequestLoanPage {

    constructor(page) {
        this.page = page;
        this.requestLoanHeader = page.locator(requestLoanLocators.requestLoanHeader);
        this.loanAmountField = page.locator(requestLoanLocators.loanAmountField);
        this.downPaymentField = page.locator(requestLoanLocators.downPaymentField);
        this.fromAccountDropdown = page.locator(requestLoanLocators.fromAccountDropdown);
        this.applyNowButton = page.locator(requestLoanLocators.applyNowButton);
        this.loanRequestSuccessMessage = page.locator(requestLoanLocators.loanRequestSuccessMessage);
        this.loanRequestFailureMessage = page.locator(requestLoanLocators.loanRequestFailureMessage);
    }

    async openRequestLoanPage() {
        await this.page.goto("https://parabank.parasoft.com/parabank/requestloan.htm");
    }

    async applyForLoan(loanAmount, downPayment, fromAccount) {
        await this.loanAmountField.fill(loanAmount);
        await this.downPaymentField.fill(downPayment);
        await this.fromAccountDropdown.selectOption(fromAccount);
        await this.applyNowButton.click();
    }

    async verifyLoanApproval() {
        return await this.loanRequestSuccessMessage.isVisible();
    }

    async verifyLoanRejection() {
        return await this.loanRequestFailureMessage.isVisible();
    }

    async getLoanStatusMessage() {
        if (await this.loanRequestSuccessMessage.isVisible()) {
            return await this.loanRequestSuccessMessage.textContent();
        } else if (await this.loanRequestFailureMessage.isVisible()) {
            return await this.loanRequestFailureMessage.textContent();
        }
        return "No loan status message found";
    }
}

module.exports = { RequestLoanPage };
