const { test, expect } = require('@playwright/test');
const { BillPayPage } = require('../pageObjects/BillPayPage');
const { getPage } = require('../Base/TestSetup'); // ✅ Use getPage()

test('Verify Bill Pay Page Elements', async () => {
    const page = getPage(); 
    const billPayPage = new BillPayPage(page);
    await billPayPage.openBillPayPage();
    await page.waitForTimeout(10000);
    console.log("Paused for 10 seconds before proceeding...");
});

test.only('Fill Bill Pay Form', async () => {
    const page = getPage(); 
    const billPayPage = new BillPayPage(page);
    await billPayPage.openBillPayPage();
    await billPayPage.fillBillPayFormAndVerify();
    console.log("Bill Pay form submitted successfully!");
});

// test.only('Verify amount & Account number', async () => {
//     const page = getPage(); 
//     const billPayPage = new BillPayPage(page);
//     await billPayPage.openBillPayPage();
//     const actualAccountFrom = await billPayPage.fetchAccountNumberPaidFrom();
//     const expectedAccountFrom =await billPayPage.fillBillPayFormAndVerify();
//     expect(actualAccountFrom).toBe(expectedAccountFrom);
//     console.log("Bill Pay form submitted successfully from account number"+expectedAccountFrom);
// });




