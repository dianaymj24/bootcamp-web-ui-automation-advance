const { Builder, By} = require("selenium-webdriver");
const LoginPage = require("../pages/login.page");
const CommonPage = require("../pages/common.page");
const visualRegression = require("../utilities/visualRegression.helper");
const assert = require("assert");

describe("Saucedemo Login", function () {
    let driver;
    let login;
    let common;
    let visualHelper;

    beforeEach(async () => { 
        driver = new Builder()
        .forBrowser("chrome")
        .build();
        login = new LoginPage(driver);
        common = new CommonPage(driver);
        visualHelper = new visualRegression();
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

        // Take full screenshot
        await common.fullScreenshot("login_standard_user")

        // Copy screenshot to visual-current
        visualHelper.saveCurrentScreenshot(
            "screenshot/login_standard_user.png",
            "login_standard_user.png"
        );

        // Compare with baseline
        const result = await visualHelper.compareImages(
            "login_standard_user.png"
        );

        console.log(result);

        // If baseline doesn't exist
        if (!result.hasBaseline) {

            visualHelper.saveAsBaseline(
                "login_standard_user.png"
            );

            console.log(
                "Baseline created: login_standard_user.png"
            );

        } else {

            assert.strictEqual(
                result.match,
                true,
                result.message
            );

        }

    });

    it("[Smoke] [Login] Should Not Login Saucedemo with Locked Out User", async function () {
        await login.inputUsername("locked_out_user");
        await login.inputPassword("secret_sauce");
        await login.clickLoginButton();
        await login.assertLoginLockedOut();

        // Take element screenshot
        await common.elementScreenshot(
            By.className('login_wrapper-inner'),
            "login_locked_out_user")
        
        // Copy screenshot to visual-current
        visualHelper.saveCurrentScreenshot(
            "screenshot/login_locked_out_user.png",
            "login_locked_out_user.png"
        );

        // Compare with baseline
        const result = await visualHelper.compareImages(
            "login_locked_out_user.png"
        );

        console.log(result);

        // If baseline doesn't exist
        if (!result.hasBaseline) {

            visualHelper.saveAsBaseline(
                "login_locked_out_user.png"
            );

            console.log(
                "Baseline created: login_locked_out_user.png"
            );

        } else {

            assert.strictEqual(
                result.match,
                true,
                result.message
            );

        }
        
    });

});