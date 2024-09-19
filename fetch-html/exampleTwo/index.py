import requests
from bs4 import BeautifulSoup

url = 'https://www.example.com/product'
headers = {'User-Agent': 'Mozilla/5.0'}

response = requests.get(url, headers=headers)

soup = BeautifulSoup(response.text, 'html.parser')

inventory = soup.find('div', {'class': 'inventory'}).text

if "In Stock" in inventory:
    print('Product is in stock.')
else:
    print('Product is out of stock.')