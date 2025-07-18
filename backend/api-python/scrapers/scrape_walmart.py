from typing import Optional
import requests
from bs4 import BeautifulSoup

def scrape_walmart(url: str, imgUrl: Optional[str] = None) -> tuple[str, Optional[str]]:
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
        price = None

        # Find all spans with itemprop="price"
        price_spans = soup.find_all("span", {"itemprop": "price"})

        for span in price_spans:
            text = span.get_text(strip=True)
            if text.startswith("$") or "Now $" in text:
                price = text.replace("Now $", "").replace("$", "").strip()
        
        if not price:
            price = "N/A"

        # Scrape the image URL

        image_url = imgUrl

        # Option 1
        if not image_url:
            # Find all <img> tags with class "db"
            img_tags = soup.find_all("img", class_="db")

            # Find first src that starts with "https://"
            image_url = None
            for img in img_tags:
                src = img.get("src", "")
                if src.startswith("https://"):
                    image_url = src
                    break

        # Option 2
        if not image_url:
            img_tag = soup.find("img", {"elementtiming": "ip-hero-image"})
            if img_tag:
                image_url = img_tag.get("src")

        return price, image_url
    
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return "N/A", None

    except Exception as e:
        print(f"Walmart scrape error: {e}")
        return "N/A", None
