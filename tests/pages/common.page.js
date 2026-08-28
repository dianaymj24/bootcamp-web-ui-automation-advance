const fs = require("fs");

class CommonPage {
    constructor(driver) {
        this.driver = driver;
    }

    async fullScreenshot(filename){
        const fullScreen = await this.driver.takeScreenshot();

        fs.writeFileSync(`screenshot/${filename}.png`,
            fullScreen,
            "base64"
        );
    }

    async elementScreenshot(element, filename){
        const elementScreen = await this.driver
            .findElement(element)
            .takeScreenshot();
        
        fs.writeFileSync(`screenshot/${filename}.png`,
            elementScreen,
            "base64"
        );
    }
}

module.exports = CommonPage;