const {test,expect} = require('@playwright/test');
const { assert, log } = require('console');
const { TestHelper } = require('../Base/TestHelper');
const {LoginPage} = require('../pageObjects/LoginPage');
const {HomePage} = require('../pageObjects/HomePage');
const {BillPayPage} = require('../pageObjects/BillPayPage');
const { getPage } = require('../Base/TestSetup'); 
const { OpenNewAccountPage } = require('../pageObjects/OpenNewAccountPage');
const {AccountsOverviewPage}= require('../pageObjects/AccountsOverviewPage');
const {TransferFundsPage}= require('../pageObjects/TransferFundsPage');
const { constants } = require('buffer');
TransferFundsPage

test('Launch', async ({  }) =>
{
    const page = getPage(); 
    await page.goto("https://parabank.parasoft.com/");
    const title =await page.title();
    await expect(page).toHaveTitle("ParaBank | Welcome | Online Banking");
});

test('Check browser title and URL', async ({ }) =>
{
    const page = getPage(); 
    await page.goto("https://parabank.parasoft.com/");
    const title =await page.title();
    await expect(page).toHaveTitle("ParaBank | Welcome | Online Banking");     
});

test('Login & visibility of error message & extract error message', async ({ }) => {
    const page = getPage(); 
    const loginPage = new LoginPage(page);     
    const homepage = new HomePage(page);
    homepage.logout();
    await loginPage.validLogin("arlohar", "Test$100"); 
    const errorMsg =await loginPage.fetchErrorMsgAfterUnsuccessfulLogin();
    expect(errorMsg).toBe("The username and password could not be verified.");
});   

test("Check number of homeTabs", async ({  }) => {
    const page = getPage(); 
    const welcomeTabs = page.locator("//div[@id='headerPanel']/ul[2]/li");
    const countOfWelcomeTabs = await welcomeTabs.count();
    console.log("Number of Welcome Tabs:", countOfWelcomeTabs);
    console.log(await welcomeTabs.allTextContents());
    const tab1 = (await welcomeTabs.nth(0).textContent())?.trim();
    const tab2 = (await welcomeTabs.nth(1).textContent())?.trim();
    const tab3 = (await welcomeTabs.nth(2).textContent())?.trim();
    expect(tab1).toBe("home");
    expect(tab2).toBe("about");
    expect(tab3).toBe("contact");
});

test("Check global navigations", async ({}) => {
    const page = getPage();
    const homepage = new HomePage(page);
    await homepage.navigateToAccountOverview();
    await page.waitForLoadState('load');
    await expect(page).toHaveTitle("ParaBank | Accounts Overview");
    await homepage.navigateToOpenNewAccountPage();
    await page.waitForLoadState('load');
    await expect(page).toHaveTitle("ParaBank | Open Account");
    await homepage.navigateToTransferFundsPage();
    await page.waitForLoadState('load');
    await expect(page).toHaveTitle("ParaBank | Transfer Funds");
    await homepage.navigateToBillPayPage();
    await page.waitForLoadState('load');
    await expect(page).toHaveTitle("ParaBank | Bill Pay");
    await homepage.navigateToFindTransactionsPage();
    await page.waitForLoadState('load');
    await expect(page).toHaveTitle("ParaBank | Find Transactions");
    await homepage.navigateToUpdateProfilePage();
    await page.waitForLoadState('load');
    await expect(page).toHaveTitle("ParaBank | Update Profile");
    await homepage.navigateToRequestLoanPage();
    await page.waitForLoadState('load');
    await expect(page).toHaveTitle("ParaBank | Loan Request");
});

test('Open New Account and select Savings account type', async ({  }) =>
{
    const page = getPage(); 
    const openNewAccountPage = new OpenNewAccountPage(page);
    await  openNewAccountPage.clickOnOpenNewAccountLeftPanel();
    await openNewAccountPage.selectAccountType("1");
    console.log("Savings account selected");
    await openNewAccountPage.clickOnOpenNewAccountBttn();
    const newAccountNumber = await openNewAccountPage.getNewAccountNumber();
    console.log("The new account number created is :"+newAccountNumber);
});

test('Verify balance on Accounts overview page', async ({})=>
{
    const page = getPage(); 
    const accountsOverviewPage = new AccountsOverviewPage(page);
    const homepage = new HomePage(page);
    await homepage.navigateToAccountOverview();
    await expect(page).toHaveTitle("ParaBank | Accounts Overview");  
    await accountsOverviewPage.clickOnAccountNumber();
    await homepage.navigateToAccountOverview();
    if( await accountsOverviewPage.fetchTransactionMessage()==true)
    {
        const balanceInside = await accountsOverviewPage.getBalanceFromTable();       
        const totalBalanceOfTable = await accountsOverviewPage.getTotalBalance();    
        expect(balanceInside).toBe(totalBalanceOfTable);  
    } 
});

test('Transfer funds from account created in step 5',async({}) =>
{
    const page = getPage(); 
    const homepage = new HomePage(page);
    const openNewAccountPage = new OpenNewAccountPage(page);
    await  openNewAccountPage.clickOnOpenNewAccountLeftPanel();
    await openNewAccountPage.selectAccountType("1");
    console.log("Savings account selected");
    await openNewAccountPage.clickOnOpenNewAccountBttn();
    const newAccountNumber = await openNewAccountPage.getNewAccountNumber();
    console.log("The new account number created is:"+newAccountNumber);
    homepage.navigateToTransferFundsPage();
    const transFundsPage = new TransferFundsPage(page);
    await transFundsPage.fillTransferDetails("100",newAccountNumber);
    await transFundsPage.submitTransfer();
    const status = await transFundsPage.verifyTransferConfirmationHeader();
    expect(status).toBeTruthy();
});

test('Pay the bill with account created in step 5', async({})=>
{
    const page = getPage(); 
    const homepage = new HomePage(page);
    const openNewAccountPage = new OpenNewAccountPage(page);
    await  openNewAccountPage.clickOnOpenNewAccountLeftPanel();
    await openNewAccountPage.selectAccountType("1");
    console.log("Savings account selected");
    await openNewAccountPage.clickOnOpenNewAccountBttn();
    const newAccountNumber = await openNewAccountPage.getNewAccountNumber();
    console.log("The new account number created is:"+newAccountNumber);
    homepage.navigateToBillPayPage();
    const billPayPage = new BillPayPage(page);
    await billPayPage.fillBillPayFormAndVerify(newAccountNumber);
});
