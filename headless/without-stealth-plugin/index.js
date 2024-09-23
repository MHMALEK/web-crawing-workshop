const puppeteer = require('puppeteer');

async function scrapeData() {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto('https://www.browserscan.net/bot-detection');
  
   
};

scrapeData();