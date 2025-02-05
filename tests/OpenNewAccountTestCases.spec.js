const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { OpenNewAccountPage } = require('../pageObjects/OpenNewAccountPage');
const { TestHelper } = require('../Base/TestHelper');
const { getPage } = require('../Base/TestSetup'); // ✅ Use getPage()

test('Open New Account and select Savings account type', async ({  }) => {
    const page = getPage(); 
    const loginPage = new LoginPage(page);
    const openNewAccountPage = new OpenNewAccountPage(page);
    await loginPage.openApplication();
    await loginPage.validLogin("arlohar", "Test$100");
    await page.locator("//li/a[text()='Open New Account']").click();
    const accountTypeDD = page.locator("//select[@id='type']");
    await accountTypeDD.selectOption({ value: "1" });
    await page.locator("//input[@value='Open New Account']").click();
    const successMessage = await page.locator("//div[@id='rightPanel']/p").textContent();
    console.log("Account opened successfully. Message: " + successMessage?.trim());
    expect(successMessage?.trim()).toContain("Your new account has been opened!");
});

test('Open New Account - Handle error message if account type is not selected', async ({  }) => {
    const page = getPage(); 
    const loginPage = new LoginPage(page);
    await loginPage.openApplication();
    await loginPage.validLogin("arlohar", "Test$100");
    await page.locator("//li/a[text()='Open New Account']").click();
    await page.locator("//input[@value='Open New Account']").click();
    const errorMessage = await page.locator("//span[@class='error']").textContent();
    console.log("Error message: " + errorMessage?.trim());
    expect(errorMessage?.trim()).toContain("Please select an account type.");
});
