const { LoginPage } = require('../pageObjects/LoginPage');
const { RegistrationPage } = require('../pageObjects/RegistrationPage');
class TestHelper {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.registrationPage = new RegistrationPage(page);
        this.logoutButton = page.locator("//a[text()='Log Out']");
        this.registeredUser = null;
    }
    generateRandomCustomerDetails() {
        const randomNum = Math.floor(Math.random() * 100000);
        return {
            firstName: "Test" + randomNum,
            lastName: "User" + randomNum,
            address: "123 Main Street",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            phoneNumber: "1234567890",
            ssn: "123-45-6789",
            username: "User" + randomNum,
            password: "Test$100",
            confirmPassword: "Test$100"
        };
    }
    async registerUser() {
        this.registeredUser = this.generateRandomCustomerDetails();
        await this.page.goto("https://parabank.parasoft.com/parabank/register.htm");
        await this.registrationPage.fillRegistrationForm(this.registeredUser);
    }
    async logoutUser() {
        await this.page.locator("//a[text()='Log Out']").click();
    }
}
module.exports = { TestHelper };
