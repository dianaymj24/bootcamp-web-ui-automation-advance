const {By} = require("selenium-webdriver");

const LOGIN_LOCATORS = {
    url: "https://saucedemo.com",

    selectors:{
        usernameInput: By.id("user-name"),
        passwordInput: By.id("password"),
        loginButton: By.id("login-button"),
        shoppingCart: By.xpath("//*[@data-test='shopping-cart-link']"),
        title: By.className('title'),
        errorMessage: By.css('[data-test="error"]')
    },
};

module.exports = LOGIN_LOCATORS;