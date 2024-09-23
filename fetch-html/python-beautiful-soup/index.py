import requests
from bs4 import BeautifulSoup

url = "http://books.toscrape.com/"

response = requests.get(url)
html = response.text

soup = BeautifulSoup(html, 'html.parser')
books = soup.select('.product_pod')

for book in books:
    title = book.h3.a['title']
    price = book.select_one('.price_color').text
    print(title, price)
