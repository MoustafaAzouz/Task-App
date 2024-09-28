"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapService = void 0;
const common_1 = require("@nestjs/common");
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
let ScrapService = class ScrapService {
    constructor() {
        const chromeOptions = new chrome.Options();
        chromeOptions.addArguments('--headless');
        chromeOptions.addArguments('--disable-gpu');
        chromeOptions.addArguments('--no-sandbox');
        chromeOptions.addArguments('--disable-software-rasterizer');
        chromeOptions.addArguments('--window-size=1920,1080');
        chromeOptions.addArguments('--disable-webrtc');
        this.driver = new selenium_webdriver_1.Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();
    }
    async scrapeLinkedInProfile(url) {
        try {
            await this.driver.get(url);
            await this.driver.wait(selenium_webdriver_1.until.elementLocated({ css: 'h1' }), 10000);
            const nameElement = await this.driver.wait(selenium_webdriver_1.until.elementLocated({ css: 'h1.text-heading-xlarge' }), 20000);
            const name = await nameElement.getText();
            const locationElement = await this.driver.wait(selenium_webdriver_1.until.elementLocated({ css: 'span.text-body-small.inline' }), 20000);
            const location = await locationElement.getText();
            const imageElement = await this.driver.wait(selenium_webdriver_1.until.elementLocated({ css: 'img.pv-top-card-profile-picture__image--show' }), 20000);
            const image = await imageElement.getAttribute('src');
            return { name, location, image, url };
        }
        catch (error) {
            console.error(`Error scraping LinkedIn profile: ${error}`);
        }
    }
    async loginToLinkedIn(email, password) {
        try {
            await this.driver.get('https://www.linkedin.com/login');
            await this.driver.wait(selenium_webdriver_1.until.elementLocated({ id: 'username' }), 10000);
            await this.driver.findElement({ id: 'username' }).sendKeys(email);
            await this.driver.findElement({ id: 'password' }).sendKeys(password);
            await this.driver.findElement({ css: 'button[type=submit]' }).click();
        }
        catch (error) {
            console.error(`Error logging in to LinkedIn: ${error}`);
        }
    }
};
exports.ScrapService = ScrapService;
exports.ScrapService = ScrapService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ScrapService);
//# sourceMappingURL=scrap.service.js.map