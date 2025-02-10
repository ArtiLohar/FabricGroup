import loginLocators from "../locators/loginPageLocators.json";

class LoginPage{

    constructor(page) {
        if (!page) {
            throw new Error("Page instance is required! Make sure to pass it from TestSetup.");
        }
        this.page = page;      
    }
  async openApplication()
    {
        await this.page.goto("https://parabank.parasoft.com/");
    }

   async validLogin(usernameData, PasswordData)
    { 
        await this.page.fill(loginLocators.userName, usernameData);
        await this.page.fill(loginLocators.password, PasswordData);
        await this.page.click(loginLocators.loginButton);
    }
    async fetchErrorMsgAfterUnsuccessfulLogin()
    {
        return await this.page.locator(loginLocators.unsuccessfulLoginErrorMsg).textContent();

    }
}
module.exports = {LoginPage};