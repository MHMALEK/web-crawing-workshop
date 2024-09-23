const puppeteer = require("puppeteer");

(async () => {
  // Launch Puppeteer
  const browser = await puppeteer.launch({ headless: false }); // Headless set to false so you can see the browser
  const page = await browser.newPage();

  // Navigate to login page
  await page.goto("https://quotes.toscrape.com/login");

  // Fill in the login form
  await page.type('input[name="username"]', "your-username-here"); // Use the correct username
  await page.type('input[name="password"]', "your-password-here"); // Use the correct password
  await page.click('input[type="submit"]'); // Click login button



  // Navigate to the second page
  await Promise.all([page.waitForNavigation(), page.click(".next a")]);

  const quoteData = await page.evaluate(() => {
    const quoteElement = document.querySelector(".quote");

    const text = quoteElement.querySelector(".text").innerText.trim();
    const author = quoteElement.querySelector(".author").innerText.trim();
    const tags = Array.from(quoteElement.querySelectorAll(".tag")).map((tag) =>
      tag.innerText.trim()
    );

    return { text, author, tags };
  });

  console.log("Quote on page 2:", quoteData);

  // Close the browser
  //   await browser.close();
})();
