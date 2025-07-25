import datetime
from fastapi import FastAPI
from models import ScrapeRequest, ScrapeResponse

from scrapers.scrape_amazon import scrape_amazon
from scrapers.scrape_walmart import scrape_walmart

app = FastAPI()

@app.post("/scrape", response_model=ScrapeResponse)
async def scrape(request: ScrapeRequest):
    results = []
    imageUrl = request.imageUrl  # may be None

    for store in request.stores:
        storeName = store.storeName.lower()
        price, img = "N/A", None

        if storeName == "amazon":
            price, img = price, img = scrape_amazon(store.url, imageUrl)
        elif storeName == "walmart":
            price, img = price, img = scrape_walmart(store.url, imageUrl)
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
