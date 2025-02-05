const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { AccountsOverviewPage } = require('../pageObjects/AccountsOverviewPage');
const { TestHelper } = require('../Base/TestHelper');
const { getPage } = require('../Base/TestSetup'); 

test('Verify Accounts Overview Page Elements', async ({}) => {
    const page = getPage(); 
    const loginPage = new LoginPage(page);
    const accountsOverviewPage = new AccountsOverviewPage(page);

    await loginPage.openApplication();
    await loginPage.validLogin("arlohar", "Test$100");

    await page.goto("https://parabank.parasoft.com/parabank/overview.htm");

    await expect(accountsOverviewPage.accountsOverviewHeader).toBeVisible();
    await expect(accountsOverviewPage.accountsTable).toBeVisible();
});

test('Get Number of Accounts Listed', async ({  }) => {
    const page = getPage(); 
    const loginPage = new LoginPage(page);
    const accountsOverviewPage = new AccountsOverviewPage(page);

    await loginPage.openApplication();
    await loginPage.validLogin("arlohar", "Test$100");

    await page.goto("https://parabank.parasoft.com/parabank/overview.htm");

    const accountCount = await accountsOverviewPage.getAccountsCount();
    console.log("Total Accounts:", accountCount);

    await expect(accountCount).toBeGreaterThan(0);
});

test('Retrieve and Print Account Column Headers', async ({  }) => {
    const page = getPage(); 
    const loginPage = new LoginPage(page);
    const accountsOverviewPage = new AccountsOverviewPage(page);

    await loginPage.openApplication();
    await loginPage.validLogin("arlohar", "Test$100");

    await page.goto("https://parabank.parasoft.com/parabank/overview.htm");

    const headers = await accountsOverviewPage.getAccountColumnHeaders();
    console.log("Account Column Headers:", headers);

    await expect(headers.length).toBeGreaterThan(0);
});

test('Retrieve All Account Links', async ({  }) => {
    const page = getPage(); 
    const loginPage = new LoginPage(page);
    const accountsOverviewPage = new AccountsOverviewPage(page);

    await loginPage.openApplication();
    await loginPage.validLogin("arlohar", "Test$100");

    await page.goto("https://parabank.parasoft.com/parabank/overview.htm");

    const accountLinks = await accountsOverviewPage.getAllAccountLinks();
    console.log("Account Links:", accountLinks);

    await expect(accountLinks.length).toBeGreaterThan(0);
});

test('Verify Total Balance Display', async ({  }) => {
    const page = getPage(); 
    const loginPage = new LoginPage(page);
    const accountsOverviewPage = new AccountsOverviewPage(page);

    await loginPage.openApplication();
    await loginPage.validLogin("arlohar", "Test$100");

    await page.goto("https://parabank.parasoft.com/parabank/overview.htm");

    const totalBalance = await accountsOverviewPage.getTotalBalance();
    console.log("Total Balance:", totalBalance);

    await expect(totalBalance).not.toBeNull();
});

test('Navigate to Transaction History', async ({  }) => {
    const page = getPage(); 
    const loginPage = new LoginPage(page);
    const accountsOverviewPage = new AccountsOverviewPage(page);

    await loginPage.openApplication();
    await loginPage.validLogin("arlohar", "Test$100");

    await page.goto("https://parabank.parasoft.com/parabank/overview.htm");

    await accountsOverviewPage.navigateToTransactionHistory();
    await expect(page).toHaveURL(/activity.htm/);
});

