import updateProfileLocators from "../locators/updateProfileLocators.json";

class UpdateProfilePage {

    constructor(page) {
        this.page = page;
        this.updateProfileHeader = page.locator(updateProfileLocators.updateProfileHeader);
        this.firstNameField = page.locator(updateProfileLocators.firstNameField);
        this.lastNameField = page.locator(updateProfileLocators.lastNameField);
        this.addressField = page.locator(updateProfileLocators.addressField);
        this.cityField = page.locator(updateProfileLocators.cityField);
        this.stateField = page.locator(updateProfileLocators.stateField);
        this.zipCodeField = page.locator(updateProfileLocators.zipCodeField);
        this.phoneNumberField = page.locator(updateProfileLocators.phoneNumberField);
        this.updateProfileButton = page.locator(updateProfileLocators.updateProfileButton);
        this.successMessage = page.locator(updateProfileLocators.successMessage);
    }

    async openUpdateProfilePage() {
        await this.page.goto("https://example.com/update-profile"); 
    }

    async fillProfileUpdateForm(profileDetails) {
        await this.firstNameField.fill(profileDetails.firstName);
        await this.lastNameField.fill(profileDetails.lastName);
        await this.addressField.fill(profileDetails.address);
        await this.cityField.fill(profileDetails.city);
        await this.stateField.fill(profileDetails.state);
        await this.zipCodeField.fill(profileDetails.zipCode);
        await this.phoneNumberField.fill(profileDetails.phoneNumber);
    }

    async submitProfileUpdate() {
        await this.updateProfileButton.click();
    }

    async getSuccessMessage() {
        return await this.successMessage.textContent();
    }

    async verifyUpdateProfileHeader() {
        await this.updateProfileHeader.waitFor({ state: 'visible' });
    }

    async isProfileUpdatedSuccessfully() {
        const successMessageVisible = await this.successMessage.isVisible();
        return successMessageVisible;
    }
}

module.exports = { UpdateProfilePage };
