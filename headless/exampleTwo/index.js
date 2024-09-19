const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.google.com");

  // emulate an iPhone X
  const iPhone = puppeteer.devices["iPhone X"];
  await page.emulate(iPhone);

  // take a screenshot
  await page.screenshot({ path: "screenshot.png" });

  // generate a PDF of the page
  await page.pdf({ path: "page.pdf", format: "A4" });

  // write some text into an input field
  await page.type("#search", "Puppeteer");

  // submit the form
  const searchForm = await page.$("#searchform");
  await searchForm.evaluate((searchForm) => searchForm.submit());

  // wait for search results to load
  await page.waitForSelector("#resultStats");

  // grab the search results
  const searchResults = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll(".g .r a"));
    return anchors.map((anchor) => anchor.textContent);
  });


  await browser.close();
}

run();
