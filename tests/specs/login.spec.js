const { Builder, By} = require("selenium-webdriver");
const LoginPage = require("../pages/login.page")
const CommonPage = require("../pages/common.page");

describe("Saucedemo Login", function () {
    let driver;
    let login;
    let common;

    beforeEach(async () => { 
        driver = new Builder()
        .forBrowser("chrome")
        .build();
        login = new LoginPage(driver);
        common = new CommonPage(driver);
        await login.openBrowser();
    });

    afterEach(async () => {
        await driver.quit();
    });

    it("[Smoke] [Login] Should Login Saucedemo with Standart User", async function () {
        await login.inputUsername("standard_user");
        await login.inputPassword("secret_sauce");
        await login.clickLoginButton();
        await login.assertLoginSuccess();

        //take full screenshot
        await common.fullScreenshot("login_standard_user");
    });

    it("[Smoke] [Login] Should Not Login Saucedemo with Locked Out User", async function () {
        await login.inputUsername("locked_out_user");
        await login.inputPassword("secret_sauce");
        await login.clickLoginButton();
        await login.assertLoginLockedOut();

        //take element screenshot
        await common.elementScreenshot(
            By.className('login_wrapper-inner'),
            "login_locked_out_user");
    });

});