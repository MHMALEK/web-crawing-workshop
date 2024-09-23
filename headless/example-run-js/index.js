const puppeteer = require("puppeteer");

(async () => {
  // Launch Puppeteer
  const browser = await puppeteer.launch({ headless: false }); // Set to false for visible browser
  const page = await browser.newPage();

  // Navigate to the quotes page
  await page.goto("https://quotes.toscrape.com/page/1/");

  // Wait for quotes to load
  await page.waitForSelector(".quote");

  // Execute a JavaScript command on the page (within the browser context)
  const result = await page.evaluate(() => {
    // Get the text of all quotes on the page using JavaScript
    const quotes = document.querySelectorAll(".quote .text");

    alert("Hello from Puppeteer!");

    return Array.from(quotes).map((quote) => quote.innerText);
  });

  console.log(result);

  // Close the browser
  // await browser.close();
})();
