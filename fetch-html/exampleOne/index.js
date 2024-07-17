const axios = require('axios');
const cheerio = require('cheerio');

const url = "http://books.toscrape.com/";

axios(url).then(response => {
  const html = response.data;
  const $ = cheerio.load(html);
  const books = $('.product_pod');

  books.each(function () {
    const title = $(this).find('h3 a').attr('title');
    const price = $(this).find('.price_color').text();

    console.log(title, price);
  });
});