const { test } = require('@playwright/test');
const { TestHelper } = require('./TestHelper');
let testHelper;
let page;
let userCredentials;
function getPage() {
    if (!page) {
        throw new Error("Page is not initialized! Ensure TestSetup is executed first.");
    }
    return page;
}
test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    testHelper = new TestHelper(page);
    userCredentials = await testHelper.registerUser();
});
test.afterEach(async () => {
    await page.close();
});
module.exports = { getPage, testHelper, userCredentials };
