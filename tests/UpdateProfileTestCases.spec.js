const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { UpdateProfilePage } = require('../pageObjects/UpdateProfilePage');
const { TestHelper } = require('../Base/TestHelper');
const { getPage } = require('../Base/TestSetup'); // ✅ Use getPage()

test('Verify Update Profile Page Elements', async ({  }) => {
    const page = getPage(); 
    const loginPage = new LoginPage(page);
    const updateProfilePage = new UpdateProfilePage(page);

    await loginPage.openApplication();
    await loginPage.validLogin("arlohar", "Test$100");

    await page.goto("https://parabank.parasoft.com/parabank/updateprofile.htm");

    await expect(updateProfilePage.updateProfileHeader).toBeVisible();
    await expect(updateProfilePage.firstNameField).toBeVisible();
    await expect(updateProfilePage.lastNameField).toBeVisible();
    await expect(updateProfilePage.addressField).toBeVisible();
    await expect(updateProfilePage.cityField).toBeVisible();
    await expect(updateProfilePage.stateField).toBeVisible();
    await expect(updateProfilePage.zipCodeField).toBeVisible();
    await expect(updateProfilePage.phoneNumberField).toBeVisible();
    await expect(updateProfilePage.updateProfileButton).toBeVisible();
});

test('Update Profile with Valid Data', async ({  }) => {
    const page = getPage(); 
    const loginPage = new LoginPage(page);
    const updateProfilePage = new UpdateProfilePage(page);

    await loginPage.openApplication();
    await loginPage.validLogin("arlohar", "Test$100");

    await page.goto("https://parabank.parasoft.com/parabank/updateprofile.htm");

    await updateProfilePage.updateProfile(
        "Arti", "Lohar", "123 Test St", "London", "UK", "W1D 1AN", "07123456789"
    );

    await expect(updateProfilePage.successMessage).toBeVisible();
});
