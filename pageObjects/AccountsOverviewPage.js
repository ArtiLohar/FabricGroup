import accountsOverviewLocators from "../locators/accountOverviewLocators.json";

class AccountsOverviewPage {

    constructor(page) {
        if (!page) {
            throw new Error("Page instance is required! Make sure to pass it from TestSetup.");
        }
        this.page = page;      
    }

    async clickOnAccountNumber()
    {
        await this.page.click(accountsOverviewLocators.accountNumberLink)
    }

    async fetchTransactionMessage() {
        

            const isVisible= await this.page.locator(accountsOverviewLocators.transactionMsg).isVisible();
            if (isVisible) {
                await this.page.locator(accountsOverviewLocators.transactionMsg).textContent();
                return true;
            } 
            else {
                return false;
            }
            
    }

    async fetchBalanceAmount()
    {
        console.log("*****************************************************");
        const totalAmount = await this.page.textContent(accountsOverviewLocators.totalAmountText);
        const balance =await this.page.textContent(accountsOverviewLocators.totalBalance);
    
        console.log("The total amount is:"+totalAmount);
        console.log("The balance amount is:"+balance);
        
        if (totalAmount === balance) {
            return totalAmount; 
        } else {
            throw new Error('Total amount and balance do not match.');
        } 
    }

    

    async openAccountsOverviewPage() {
        await this.page.goto("https://parabank.parasoft.com/parabank/overview.htm");
    }

    async getAccountsCount() {
        return await this.accountRows.count();
    }

    async getAccountColumnHeaders() {
        const headers = await this.accountColumnHeaders.allTextContents();
        return headers.map(header => header.trim());
    }

    async getAllAccountLinks() {
        const links = await this.accountLinks.all();
        return Promise.all(links.map(async (link) => await link.getAttribute('href')));
    }

    async getTotalBalance() {
        return await this.page.textContent(accountsOverviewLocators.totalBalance);
    }
    async getBalanceFromTable() {
        console.log(await this.page.textContent(accountsOverviewLocators.getTableBalanceText));
        return await this.page.textContent(accountsOverviewLocators.getTableBalanceText);
    }

    async navigateToTransactionHistory() {
        await this.goToTransactionHistory.click();
    }
}

module.exports = { AccountsOverviewPage };
