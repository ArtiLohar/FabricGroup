const {test,expect} = require('@playwright/test');
const { assert, log } = require('console');
const { TestHelper } = require('../Base/TestHelper');
const { isContext } = require('vm');
const {LoginPage} = require('../pageObjects/LoginPage');
const { getPage } = require('../Base/TestSetup'); // ✅ Use getPage()

test('Launch', async ({  }) =>
{
    const page = getPage(); 
     await page.goto("https://parabank.parasoft.com/");
     const title =await page.title();
     //assertion
     await expect(page).toHaveTitle("ParaBank | Welcome | Online Banking");
     //await expect(page).toHaveURL("https://parabank.parasoft.com/")
});

test('Check browser title and URL', async ({ }) =>
    {
        const page = getPage(); 
         await page.goto("https://parabank.parasoft.com/");
         const title =await page.title();
         //assertion
         await expect(page).toHaveTitle("ParaBank | Welcome | Online Banking");
         //await expect(page).toHaveURL("https://parabank.parasoft.com/")

         //Page locator 

    });

test('Login & visibility of error message & extract error message', async ({ }) => {
    const page = getPage(); 
        const loginPage = new LoginPage(page);
        
        await loginPage.openApplication();  // ✅ Await this to ensure page loads before proceeding
        await loginPage.validLogin("arlohar", "Test$100");  // ✅ Await this to ensure login execution
    
        const errorLocator = page.locator("//div[@id='rightPanel']/h1[text()='Error!']/following-sibling::p");
    
        if (await errorLocator.isVisible()) {  // ✅ Await for visibility check
            console.log("Login failure");
            const errorMessage = await errorLocator.textContent();  // ✅ Await before extracting text
            console.log("The error message is: " + errorMessage?.trim());
    
            await expect(errorMessage?.trim()).toBe("The username and password could not be verified.");
        } else {
            console.log("Login successful");
        }
    });   

test("Check number of homeTabs", async ({  }) => {
    const page = getPage(); 
            await page.goto("https://parabank.parasoft.com/");
          
            const welcomeTabs = page.locator("//div[@id='headerPanel']/ul[2]/li");
            const countOfWelcomeTabs = await welcomeTabs.count();
            console.log("Number of Welcome Tabs:", countOfWelcomeTabs);

            // Print all texts at once 
            console.log(await welcomeTabs.allTextContents());
          
            const tab1 = (await welcomeTabs.nth(0).textContent())?.trim();
            const tab2 = (await welcomeTabs.nth(1).textContent())?.trim();
            const tab3 = (await welcomeTabs.nth(2).textContent())?.trim();
          
            await expect(tab1).toBe("home");
            await expect(tab2).toBe("about");
            await expect(tab3).toBe("contact");
          });

test("Wait till everything loaded",async ({}) =>
{
    const page = getPage(); 
    await page.goto("https://parabank.parasoft.com/");
    await page.waitForLoadState('networkidle');
});

test("Select savings account type", async({})=>
{
    const page = getPage(); 
    await page.goto("https://parabank.parasoft.com/");
    await page.locator("//input[@name='username']").fill("arlohar");
    await page.locator("//input[@name='password']").fill("Test$100");
    await page.locator("//input[@value='Log In']").click();
    // Action -Handle DD
    await page.locator("//li/a[text()='Open New Account']").click();
    const acountTypeDD = await page.locator("//select[@id='type']");
    await  acountTypeDD.selectOption("1");
    //Pause for sometime 
    //await page.pause()// This will open the playwright inspector   
});

test("Handle windows", async({})=>
{
    const page = getPage(); 
    await page.goto("https://parabank.parasoft.com/");
    await page.locator("//input[@name='username']").fill("arlohar");
    await page.locator("//input[@name='password']").fill("Test$100");
    await page.locator("//input[@value='Log In']").click();
    //window handling 
    //promise all is nothing but it take promise of finishing each and every step written inside that array
    //It wil come out of this promise bloack after each and every step is done. 
    //Created and aray of all teh promises , each step means each promise 
    //Its 
});

          

      



