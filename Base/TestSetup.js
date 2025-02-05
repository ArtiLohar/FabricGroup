const { test } = require('@playwright/test');
const { TestHelper } = require('./TestHelper');

let testHelper;
let page;
let userCredentials;

// Function to retrieve the page instance
function getPage() {
    if (!page) {
        throw new Error("Page is not initialized! Ensure TestSetup is executed first.");
    }
    return page;
}

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    testHelper = new TestHelper(page);

    console.log("Registering a new user...");
    userCredentials = await testHelper.registerUser();
    console.log("Successfully registered");
});

test.afterEach(async () => {
    // console.log("Logging out...");
    // await testHelper.logoutUser();
});

test.afterAll(async () => {
    // console.log("Closing browser...");
    // await page.close();
});

// ✅ Export the function instead of the `page` variable
module.exports = { getPage, testHelper, userCredentials };
