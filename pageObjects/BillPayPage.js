import billPayLocators from "../locators/billPayLocators.json";
const {test,expect} = require('@playwright/test');

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

async fillBillPayFormAndVerify(account) {
    const formData = {
        payeeName: 'Arti Lohar',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        phoneNumber: '1234567890',
        accountNumber: account,
        verifyAccount: account,
        amount: '500'
    };

    await this.page.locator(billPayLocators.payeeNameField).fill(formData.payeeName);
    await this.page.locator(billPayLocators.payeeAddressField).fill(formData.street);
    await this.page.locator(billPayLocators.payeeCityField).fill(formData.city);
    await this.page.locator(billPayLocators.payeeStateField).fill(formData.state);
    await this.page.locator(billPayLocators.payeeZipCodeField).fill(formData.zipCode);
    await this.page.locator(billPayLocators.payeePhoneField).fill(formData.phoneNumber);
    await this.page.locator(billPayLocators.payeeAccountNumberField).fill(formData.accountNumber);
    await this.page.locator(billPayLocators.payeeVerifyAccountField).fill(formData.verifyAccount);
    await this.page.locator(billPayLocators.amountField).fill(formData.amount);
    await this.page.locator(billPayLocators.sendPaymentButton).click();
    
    const successMessage = await this.page.locator(billPayLocators.billPaymentCompleteMessage).textContent();
     expect(successMessage).toContain("Bill Payment Complete");

    
}

}   

module.exports = { BillPayPage };
