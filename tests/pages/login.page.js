const {By,until} = require("selenium-webdriver");
const LOGIN_LOCATORS = require("../../tests/locators/login.locate.js");
const assert = require("assert");

class LoginPage{
     constructor(driver){
        this.driver = driver;
     }

     async openBrowser(){
        await this.driver.get(LOGIN_LOCATORS.url);
        await this.driver.wait(async () => {
            const url = await this.driver.getCurrentUrl();
            return url == LOGIN_LOCATORS.url;
        }, 5000).catch(() => {});
     }

     async inputUsername(username) {
        const input = await this.driver.findElement(LOGIN_LOCATORS.selectors.usernameInput);
        await input.sendKeys(username);
     }

     async inputPassword(password) {
        const input = await this.driver.findElement(LOGIN_LOCATORS.selectors.passwordInput);
        await input.sendKeys(password);
     }

     async clickLoginButton() {
        const button = await this.driver.findElement(LOGIN_LOCATORS.selectors.loginButton);
        await button.click();
     }

     async assertLoginSuccess() {
        await this.driver.wait(until.elementLocated(LOGIN_LOCATORS.selectors.title), 5000);

        const title = await this.driver
        .findElement(LOGIN_LOCATORS.selectors.title)
        .getText();

        assert.strictEqual(title, "Products");
     }

     async assertLoginLockedOut() {
        const errorMessage = await this.driver.findElement(LOGIN_LOCATORS.selectors.errorMessage);
        const actualText = await errorMessage.getText();

        assert.strictEqual(actualText,
         'Epic sadface: Sorry, this user has been locked out.');
     }

}

module.exports = LoginPage;