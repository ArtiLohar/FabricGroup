const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { TransferFundsPage } = require('../pageObjects/TransferFundsPage');
const { TestHelper } = require('../Base/TestHelper');
const { getPage } = require('../Base/TestSetup'); // ✅ Use getPage()

test('Verify Transfer Funds Page Elements', async ({  }) => {
    const page = getPage(); 
    const loginPage = new LoginPage(page);
    const transferFundsPage = new TransferFundsPage(page);

    await loginPage.openApplication();
    await loginPage.validLogin("arlohar", "Test$100");

    await page.goto("https://parabank.parasoft.com/parabank/transfer.htm");

    await expect(transferFundsPage.transferFundsHeader).toBeVisible();
    await expect(transferFundsPage.amountField).toBeVisible();
    await expect(transferFundsPage.fromAccountDropdown).toBeVisible();
    await expect(transferFundsPage.toAccountDropdown).toBeVisible();
    await expect(transferFundsPage.transferButton).toBeVisible();
});

test('Perform Fund Transfer', async ({  }) => {
    const page = getPage(); 
    const loginPage = new LoginPage(page);
    const transferFundsPage = new TransferFundsPage(page);

    await loginPage.openApplication();
    await loginPage.validLogin("arlohar", "Test$100");

    await page.goto("https://parabank.parasoft.com/parabank/transfer.htm");

    await transferFundsPage.enterAmount("500");
    await transferFundsPage.selectFromAccount("12345");
    await transferFundsPage.selectToAccount("67890");
    await transferFundsPage.clickTransfer();

    await expect(transferFundsPage.transferConfirmationHeader).toBeVisible();
    const confirmationMessage = await transferFundsPage.getTransferMessage();
    console.log("Transfer Confirmation Message:", confirmationMessage);
    await expect(confirmationMessage).toContain("successfully transferred");
});

test('Verify Transfer Details', async ({  }) => {
    const page = getPage(); 
    const loginPage = new LoginPage(page);
    const transferFundsPage = new TransferFundsPage(page);

    await loginPage.openApplication();
    await loginPage.validLogin("arlohar", "Test$100");

    await page.goto("https://parabank.parasoft.com/parabank/transfer.htm");

    await transferFundsPage.enterAmount("250");
    await transferFundsPage.selectFromAccount("12345");
    await transferFundsPage.selectToAccount("67890");
    await transferFundsPage.clickTransfer();

    await expect(transferFundsPage.transferredAmount).toHaveText("250");
    await expect(transferFundsPage.fromAccountNumber).toHaveText("12345");
    await expect(transferFundsPage.toAccountNumber).toHaveText("67890");
});

