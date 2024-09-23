const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

exports.handler = async (event) => {
  let browser = null;
  try {
    // Launch the browser with chrome-aws-lambda
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
    });

    // Create a new page
    const page = await browser.newPage();

    // Navigate to the quotes page
    await page.goto("https://quotes.toscrape.com/page/1/");

    // Wait for quotes to load
    await page.waitForSelector(".quote");

    // Execute a JavaScript command to trigger an alert (or scrape data)
    const result = await page.evaluate(() => {
      // Scrape the quotes
      const quotes = document.querySelectorAll(".quote .text");
      return Array.from(quotes).map((quote) => quote.innerText);
    });

    // Close the browser
    await browser.close();

    // Return the result
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    if (browser !== null) {
      await browser.close();
    }
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error occurred" }),
    };
  }
};
