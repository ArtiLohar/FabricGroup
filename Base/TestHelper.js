const { LoginPage } = require('../pageObjects/LoginPage');
const { RegistrationPage } = require('../pageObjects/RegistrationPage');

class TestHelper {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.registrationPage = new RegistrationPage(page);
        this.logoutButton = page.locator("//a[text()='Log Out']");
        this.registeredUser = null; // Store registered user details
    }

    generateRandomCustomerDetails() {
        const randomNum = Math.floor(Math.random() * 100000); // Generate unique number

        return {
            firstName: "Test" + randomNum,
            lastName: "User" + randomNum,
            address: "123 Main Street",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            phoneNumber: "1234567890",
            ssn: "123-45-6789",
            username: "User" + randomNum, // Unique username
            password: "Test$100", // Fixed password
            confirmPassword: "Test$100"
        };
    }

    async registerUser() {
        console.log("Registering a new user...");
        this.registeredUser = this.generateRandomCustomerDetails(); // Store user details
        await this.page.goto("https://parabank.parasoft.com/parabank/register.htm");
        await this.registrationPage.fillRegistrationForm(this.registeredUser);
        console.log("Registration successful with Username:", this.registeredUser.username);
      
    }

    async logoutUser() {
        console.log("Trying to Log Out...");
        await this.logoutButton.click();
        console.log("Logout successful");
    }
}

module.exports = { TestHelper };
