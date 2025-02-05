import billPayLocators from "../locators/billPayLocators.json";
const {expect} = require('@playwright/test');

class BillPayPage {
    constructor(page) {
        if (!page) {
            throw new Error("Page instance is required! Make sure to pass it from TestSetup.");
        }
        this.page = page;      
    }

async openBillPayPage() {
        await this.page.click(billPayLocators.billPayLinkFromLeftPanel);
        console.log("Clicked on BillPay link from left panel");
    }

async fetchAccountNumberPaidFrom()
{
   // return await this.page.locator(billPayLocators.fromAccountNumber).textContent();
   return await this.page.textContent(billPayLocators.fromAccountNumber);

} 

async fillBillPayFormAndVerify() {
        const formData = {
            payeeName: 'John Doe',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            phoneNumber: '1234567890',
            accountNumber: '123456789',
            verifyAccount: '123456789',
            amount: '500'
        };
    
        await this.page.fill(billPayLocators.payeeNameField, formData.payeeName);
        await this.page.fill(billPayLocators.payeeAddressField, formData.street);
        await this.page.fill(billPayLocators.payeeCityField, formData.city);
        await this.page.fill(billPayLocators.payeeStateField, formData.state);
        await this.page.fill(billPayLocators.payeeZipCodeField, formData.zipCode);
        await this.page.fill(billPayLocators.payeePhoneField, formData.phoneNumber);
        await this.page.fill(billPayLocators.payeeAccountNumberField, formData.accountNumber);
        await this.page.fill(billPayLocators.payeeVerifyAccountField, formData.verifyAccount);
        await this.page.fill(billPayLocators.amountField, formData.amount);
        await this.page.click(billPayLocators.sendPaymentButton);
        const successMessage = await this.page.locator(billPayLocators.billPaymentCompleteMessage).textContent();
        expect(successMessage).toContain("Bill Payment Complete"); // Adjust the expected message as needed
        const account = await this.page.locator(billPayLocators.bilPaymentAccountOnSuccessMsg).textContent();
        return account;

    }
}   

module.exports = { BillPayPage };
