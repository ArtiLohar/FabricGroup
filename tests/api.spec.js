const { test, expect, request } = require('@playwright/test');
const { getPage } = require('../Base/TestSetup'); 

test('API Automation: Fetch, Send, Execute, and Validate', async () => {
  const page = getPage(); 
  let apiUrl = 'https://parabank.parasoft.com';
  let apiPayload = '';

  page.on('request', (request) => {
    if (request.url().includes('/services/bank/findtrans')) {
      apiUrl = request.url();
      apiPayload = request.postData();
      console.log('Captured API URL:', apiUrl);
      console.log('Captured Payload:', apiPayload);
    }
  });
  await page.waitForTimeout(3000);
  await page.waitForTimeout(3000);
  await page.goto('https://parabank.parasoft.com/parabank/findtrans.htm');
  await page.fill('//input[@id="amount"]', '1.5');
  await page.waitForTimeout(3000);
  await page.click('//button[@id="findByAmount"]');

  await page.waitForTimeout(3000);  

  const apiContext = await request.newContext();
  const response = await apiContext.post(apiUrl, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: apiPayload, 
  });

  expect(response.status()).toBe(200); 
  const responseBody = await response.text();
  console.log('API Response:', responseBody);

  expect(responseBody).toContain('transactionId');
  await apiContext.dispose();
});
