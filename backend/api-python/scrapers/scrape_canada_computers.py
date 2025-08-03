from typing import Optional
import requests
from bs4 import BeautifulSoup

def scrape_canada_computers(url: str, imgUrl: Optional[str] = None) -> tuple[str, Optional[str]]:
  headers = {
      "User-Agent": (
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
          "AppleWebKit/537.36 (KHTML, like Gecko) "
          "Chrome/58.0.3029.110 Safari/537.3"
      ),
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate",
      "DNT": "1",
      "Connection": "close",
      "Upgrade-Insecure-Requests": "1"
  }

  try:
      response = requests.get(url, headers=headers, timeout=10)
      response.raise_for_status()

      soup = BeautifulSoup(response.text, "html.parser")


      # Scrape the price
      price = "N/A"
      price_selectors = [
         ".product-price .current-price span[itemprop='price']",
      ]

      for selector in price_selectors:
          price_element = soup.select_one(selector)
          if price_element:
              price = price_element.text.strip().replace('$', '')
              break


      # Scrape the image
      image_url = imgUrl
      image_selectors = [
          "img[itemprop='image']",
      ]

      for selector in image_selectors:
          image_element = soup.select_one(selector)
          if image_element:
              image_url = image_element.get("src")
              break

      return price, image_url


  except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return "N/A", None

  except Exception as e:
      print(f"Canada Computers scrape error: {e}")
      return "N/A", None