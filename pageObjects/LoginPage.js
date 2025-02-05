import loginLocators from "../locators/loginPageLocators.json";

class LoginPage{

page;

constructor(page) {
    this.page = page;
    this.userName = page.locator(loginLocators.userName);
    this.password = page.locator(loginLocators.password);
    this.loginButton = page.locator(loginLocators.loginButton);
    this.forgotLoginInfoLink = page.locator(loginLocators.forgotLoginInfoLink);
    this.registerLink = page.locator(loginLocators.registerLink);
    this.errorMessage = page.locator(loginLocators.errorMessage);
    this.loginPanelTitle = page.locator(loginLocators.loginPanelTitle);
    this.footerText = page.locator(loginLocators.footerText);
    this.adminPageLink = page.locator(loginLocators.adminPageLink);
    this.homeTab = page.locator(loginLocators.homeTab);
    this.aboutTab = page.locator(loginLocators.aboutTab);
    this.contactTab = page.locator(loginLocators.contactTab);
    this.servicesTab = page.locator(loginLocators.servicesTab);
}
  async openApplication()
    {
        await this.page.goto("https://parabank.parasoft.com/");
    }

   async validLogin(usernameData, PasswordData)
    {
       
        await this.userName.fill(usernameData);
        await this.password.fill(PasswordData);
        await this.loginButton.click();
    }
}
module.exports = {LoginPage};