import datetime
from fastapi import FastAPI
from models import ScrapeRequest, ScrapeResponse

from scrapers.scrape_amazon import scrape_amazon
from scrapers.scrape_walmart import scrape_walmart
from scrapers.scrape_newegg import scrape_newegg
from scrapers.scrape_canada_computers import scrape_canada_computers

app = FastAPI()

@app.post("/scrape", response_model=ScrapeResponse)
async def scrape(request: ScrapeRequest):
    results = []
    imageUrl = request.imageUrl  # may be None

    for store in request.stores:
        storeName = store.storeName.lower()
        price, img = "N/A", None

        if storeName == "amazon":
            price, img = scrape_amazon(store.url, imageUrl)
        elif storeName == "walmart":
            price, img = scrape_walmart(store.url, imageUrl)
        elif storeName == "newegg":
            price, img = scrape_newegg(store.url, imageUrl)
        elif storeName == "canada computers" or storeName == "canadacomputers":
            price, img = scrape_canada_computers(store.url, imageUrl)
        elif storeName == "ebay":
            price, img = "N/A", None

        # set image url if not already set
        if not imageUrl and img:
            imageUrl = img
        
        results.append({
            "storeName": storeName,
            "price": price,
            "url": store.url
        })

    return {"stores": results, "imageUrl": imageUrl or ""}
