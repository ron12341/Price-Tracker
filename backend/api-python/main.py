import datetime
from fastapi import FastAPI
from models import ScrapeRequest, ScrapeResponse

from scrapers.scrape_amazon import scrape_amazon
from scrapers.scrape_walmart import scrape_walmart

app = FastAPI()

@app.post("/scrape", response_model=ScrapeResponse)
async def scrape(request: ScrapeRequest):
    results = []

    for store in request.stores:
        storeName = store.storeName.lower()
        if storeName == "amazon":
            price = scrape_amazon(store.url)
        elif storeName == "ebay":
            price = "N/A"
        elif storeName == "walmart":
            price = scrape_walmart(store.url)
        else:
            price = "N/A"
        
        results.append({
            "storeName": storeName,
            "price": price,
            "url": store.url
        })

    return {"stores": results}
