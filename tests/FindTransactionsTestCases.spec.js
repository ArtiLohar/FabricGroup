const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { FindTransactionsPage } = require('../pageObjects/FindTransactionsPage');
const { TestHelper } = require('../Base/TestHelper');
const { getPage } = require('../Base/TestSetup'); // ✅ Use getPage()

test('Verify Find Transactions Page Elements', async ({  }) => {
    const page = getPage(); 
    const loginPage = new LoginPage(page);
    const findTransactionsPage = new FindTransactionsPage(page);

    await loginPage.openApplication();
    await loginPage.validLogin("arlohar", "Test$100");

    await page.goto("https://parabank.parasoft.com/parabank/findtrans.htm");

    await expect(findTransactionsPage.findTransactionsHeader).toBeVisible();
    await expect(findTransactionsPage.accountDropdown).toBeVisible();
    await expect(findTransactionsPage.transactionIdField).toBeVisible();
    await expect(findTransactionsPage.findByTransactionIdButton).toBeVisible();
    await expect(findTransactionsPage.fromDateField).toBeVisible();
    await expect(findTransactionsPage.toDateField).toBeVisible();
    await expect(findTransactionsPage.findByDateButton).toBeVisible();
    await expect(findTransactionsPage.amountField).toBeVisible();
    await expect(findTransactionsPage.findByAmountButton).toBeVisible();
});

test('Find Transactions by ID', async ({  }) => {
    const page = getPage(); 
    const loginPage = new LoginPage(page);
    const findTransactionsPage = new FindTransactionsPage(page);

    await loginPage.openApplication();
    await loginPage.validLogin("arlohar", "Test$100");

    await page.goto("https://parabank.parasoft.com/parabank/findtrans.htm");

    await findTransactionsPage.searchByTransactionId("12345");

    if (await findTransactionsPage.transactionResultsTable.isVisible()) {
        console.log("Transaction found successfully.");
    } else if (await findTransactionsPage.noTransactionsMessage.isVisible()) {
        console.log("No transactions found.");
    }
});

test('Find Transactions by Date', async ({  }) => {
    const page = getPage(); 
    const loginPage = new LoginPage(page);
    const findTransactionsPage = new FindTransactionsPage(page);

    await loginPage.openApplication();
    await loginPage.validLogin("arlohar", "Test$100");

    await page.goto("https://parabank.parasoft.com/parabank/findtrans.htm");

    await findTransactionsPage.searchByDate("01-01-2024", "01-31-2024");

    if (await findTransactionsPage.transactionResultsTable.isVisible()) {
        console.log("Transactions found for the given date range.");
    } else if (await findTransactionsPage.noTransactionsMessage.isVisible()) {
        console.log("No transactions found for the given date range.");
    }
});

test('Find Transactions by Amount', async ({  }) => {
    const page = getPage(); 
    const loginPage = new LoginPage(page);
    const findTransactionsPage = new FindTransactionsPage(page);

    await loginPage.openApplication();
    await loginPage.validLogin("arlohar", "Test$100");

    await page.goto("https://parabank.parasoft.com/parabank/findtrans.htm");

    await findTransactionsPage.searchByAmount("100");

    if (await findTransactionsPage.transactionResultsTable.isVisible()) {
        console.log("Transactions found for the given amount.");
    } else if (await findTransactionsPage.noTransactionsMessage.isVisible()) {
        console.log("No transactions found for the given amount.");
    }
});
