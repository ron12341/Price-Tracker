import requests
from bs4 import BeautifulSoup

def scrape_amazon(url: str) -> str:
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
        
        price = None
        price_ids = [
            "corePriceDisplay_desktop_feature_div",  
            "priceblock_ourprice",                      # Regular price
            "priceblock_saleprice",                     # Sale price
            "priceblock_dealprice",                     # Deal price          
        ]

        for price_id in price_ids:
            price_element = soup.find(id=price_id)
            if price_element and price_element.text.strip():
                price = price_element.text.strip()
                break

        if not price:
            price_element = soup.find(class_="a-offscreen")
            if price_element and price_element.text.strip():
                price = price_element.text.strip()

        if not price:
            price_element = soup.find(class_="a-price-whole")
            if price_element and price_element.text.strip():
                price = price_element.text.strip()

        if not price:
            return "N/A"

        return price.replace("$", "").replace(",", "")
    
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return "N/A"

    except Exception as e:
        print(f"Amazon scrape error: {e}")
        return "N/A"
    