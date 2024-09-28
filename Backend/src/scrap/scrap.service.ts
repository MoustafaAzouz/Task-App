import { Injectable } from '@nestjs/common';

import { Builder, until, WebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

@Injectable()
export class ScrapService {
  private driver: WebDriver;

  constructor(
 
  ) {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments('--headless');
    chromeOptions.addArguments('--disable-gpu');
    chromeOptions.addArguments('--no-sandbox');
    chromeOptions.addArguments('--disable-software-rasterizer');
    chromeOptions.addArguments('--window-size=1920,1080');
    chromeOptions.addArguments('--disable-webrtc'); 

    this.driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
  }

  async scrapeLinkedInProfile(url: string): Promise<{
    name: string;
    location: string;
    url: string;
    image: string;
  }> {
    try {
      await this.driver.get(url);

      await this.driver.wait(until.elementLocated({ css: 'h1' }), 10000);

      const nameElement = await this.driver.wait(until.elementLocated({ css: 'h1.text-heading-xlarge' }), 20000)
      const name = await nameElement.getText();
    
      const locationElement = await this.driver.wait(until.elementLocated({ css: 'span.text-body-small.inline' }), 20000);
      const location = await locationElement.getText();
    
      const imageElement = await this.driver.wait(until.elementLocated({ css: 'img.pv-top-card-profile-picture__image--show' }), 20000);
      const image = await imageElement.getAttribute('src');

      return { name, location, image, url };
    } catch (error) {
      console.error(`Error scraping LinkedIn profile: ${error}`);
    }
  }

  async loginToLinkedIn(email: string, password: string): Promise<void> {
    try {
      await this.driver.get('https://www.linkedin.com/login');

      await this.driver.wait(until.elementLocated({ id: 'username' }), 10000);

      await this.driver.findElement({ id: 'username' }).sendKeys(email);

      await this.driver.findElement({ id: 'password' }).sendKeys(password);

      await this.driver.findElement({ css: 'button[type=submit]' }).click();
    } catch (error) {
      console.error(`Error logging in to LinkedIn: ${error}`);
    }
  }
}