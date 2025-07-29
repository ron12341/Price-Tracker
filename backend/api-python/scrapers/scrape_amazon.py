from typing import Optional
import requests
from bs4 import BeautifulSoup

def scrape_amazon(url: str, imgUrl: Optional[str] = None) -> tuple[str, Optional[str]]:
    """Scrape the price of a product from Amazon
    
    Args:
        url (str): The URL of the product on Amazon
        image_url (Optional[str]): The URL of the product image. If not provided, it will be scraped from the page.
    
    Returns:
        tuple[str, Optional[str]]: A tuple of price and image URL. If the price is not found, it will be "N/A". If the image URL is not found, it will be None.
    """
    
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

        price_selectors = [
            "#tp_price_block_total_price_ww span.a-offscreen",
        ]

        for selector in price_selectors:
            price_element = soup.select_one(selector)
            if price_element and price_element.text.strip():
                price = price_element.text.strip().replace("$", "").replace(",", "")
                break

        if price:
            price = price.replace("$", "").replace(",", "")
        else:
            price = "N/A"
    
        # Get the image URL

        image_url = imgUrl

        image_ids = [
            "landingImage",
        ]

        # If the image URL is not provided, try to find it
        if not image_url:
            
            for image_id in image_ids:
                image_element = soup.find(id=image_id) or soup.find(class_=image_id)
                if image_element and image_element.get("src"):
                    image_url = image_element.get("src")
                    break

        return price, image_url
    
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return "N/A", None

    except Exception as e:
        print(f"Amazon scrape error: {e}")
        return "N/A", None
    