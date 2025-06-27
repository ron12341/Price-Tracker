import datetime
from fastapi import FastAPI
from models import ScrapeRequest, ScrapeResponse

from scrapers.scrape_amazon import scrape_amazon

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
            price = "N/A"
        else:
            price = "N/A"
        
        results.append({
            "storeName": storeName,
            "price": price,
            "url": store.url
        })

    return {"stores": results, "scrapedAt": str(datetime.datetime.now())}
