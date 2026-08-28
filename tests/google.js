const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome")

describe("Saucedemo Test", function () {
    before(async ()  => {
        console.log("Starting the test suite for Saucedemo Login");
    });

    after(async () => {
        console.log("Test suite completed");
    });

    beforeEach(async () => { 
        let Options = new chrome.Options();
        Options.addArguments("--headless");

        driver = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(Options)
        .build();

        await driver.get("https://www.saucedemo.com");

        console.log("Navigated to Saucedemo login page");
      });

    afterEach(async () => {
        await driver.quit();

        console.log("Closed the browser after test execution");
    });

    it("[Smoke] [Login] Should Login Saucedemo with Standart User", async function () {

        let usernameInput = await driver.findElement({ id: "user-name" });
        let passwordInput = await driver.findElement({ id: "password" });
        let loginButton = await driver.findElement({ id: "login-button" });


        await usernameInput.sendKeys("standard_user");
        await passwordInput.sendKeys("secret_sauce");
        await loginButton.click();

        let shoppingCart = await driver.findElement(
            By.xpath("//*[@data-test='shopping-cart-link']")
        );

        let title = await driver.getTitle();

        assert.strictEqual(title, "Swag Labs");
        await shoppingCart.isDisplayed();

    });

    it("[Smoke] [Login] Should Login Saucedemo with Performance Glitch User", async function () {

        let usernameInput = await driver.findElement({ id: "user-name" });
        let passwordInput = await driver.findElement({ id: "password" });
        let loginButton = await driver.findElement({ id: "login-button" });

        await usernameInput.sendKeys("performance_glitch_user");
        await passwordInput.sendKeys("secret_sauce");
        await loginButton.click();

        let shoppingCart = await driver.findElement(
            By.xpath("//*[@data-test='shopping-cart-link']")
        );

        let title = await driver.getTitle();

        assert.strictEqual(title, "Swag Labs");
        await shoppingCart.isDisplayed();

    });

    it("[Regression] [Login] Should Login Saucedemo with Visual User", async function () {

        let usernameInput = await driver.findElement({ id: "user-name" });
        let passwordInput = await driver.findElement({ id: "password" });
        let loginButton = await driver.findElement({ id: "login-button" });


        await usernameInput.sendKeys("visual_user");
        await passwordInput.sendKeys("secret_sauce");
        await loginButton.click();

        let shoppingCart = await driver.findElement(
            By.xpath("//*[@data-test='shopping-cart-link']")
        );

        let title = await driver.getTitle();

        assert.strictEqual(title, "Swag Labs");
        await shoppingCart.isDisplayed();

    });

});