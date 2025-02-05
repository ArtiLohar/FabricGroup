import registerPageLocators from "../locators/registerPageLocators.json";

class RegistrationPage {

    constructor(page) {
        this.page = page;
        this.firstName = page.locator(registerPageLocators.firstName);
        this.lastName = page.locator(registerPageLocators.lastName);
        this.address = page.locator(registerPageLocators.address);
        this.city = page.locator(registerPageLocators.city);
        this.state = page.locator(registerPageLocators.state);
        this.zipCode = page.locator(registerPageLocators.zipCode);
        this.phoneNumber = page.locator(registerPageLocators.phoneNumber);
        this.ssn = page.locator(registerPageLocators.ssn);
        this.username = page.locator(registerPageLocators.username);
        this.password = page.locator(registerPageLocators.password);
        this.confirmPassword = page.locator(registerPageLocators.confirmPassword);
        this.registerButton = page.locator(registerPageLocators.registerButton);
        this.registrationSuccessMessage = page.locator(registerPageLocators.registrationSuccessMessage);
        this.registrationErrorMessage = page.locator(registerPageLocators.registrationErrorMessage);
    }

    async openCustomerRegistrationPage() {
        await this.page.goto("https://example.com/customer-registration"); // Update URL as needed
    }

    async fillRegistrationForm(customerDetails) {
        await this.firstName.fill(customerDetails.firstName);
        await this.lastName.fill(customerDetails.lastName);
        await this.address.fill(customerDetails.address);
        await this.city.fill(customerDetails.city);
        await this.state.fill(customerDetails.state);
        await this.zipCode.fill(customerDetails.zipCode);
        await this.phoneNumber.fill(customerDetails.phoneNumber);
        await this.ssn.fill(customerDetails.ssn);
        await this.username.fill(customerDetails.username);
        await this.password.fill(customerDetails.password);
        await this.confirmPassword.fill(customerDetails.confirmPassword);
        await this.submitRegistration();
    }

    async submitRegistration() {
        await this.registerButton.click();
    }

    async getRegistrationSuccessMessage() {
        return await this.registrationSuccessMessage.textContent();
    }

    async isRegistrationErrorMessageVisible() {
        return await this.registrationErrorMessage.isVisible();
    }

    async verifyRegistrationPageHeader() {
        await this.page.locator("//h1[text()='Register']").waitFor({ state: 'visible' });
    }
}

module.exports = { RegistrationPage };
