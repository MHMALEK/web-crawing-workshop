const puppeteer = require('puppeteer');

async function scrapeData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://quotes.toscrape.com/js/');
  
    await Promise.all([
        page.waitForNavigation(),
        page.click('.next a'),
    ]);

    const quoteData = await page.evaluate(() => {
        const quoteElement = document.querySelector('.quote');

        const text = quoteElement.querySelector('.text').innerText.trim();
        const author = quoteElement.querySelector('.author').innerText.trim();
        const tags = Array.from(quoteElement.querySelectorAll('.tag')).map(tag => tag.innerText.trim());

        return { text, author, tags };
    });

    console.log('Quote on page 2:', quoteData);
  
    await browser.close();
};

scrapeData();