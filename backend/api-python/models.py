from typing import List
from pydantic import BaseModel

class StoreRequest(BaseModel):
    storeName: str
    url: str

class StoreResponse(BaseModel):
    storeName: str
    price: str
    url: str

class ScrapeRequest(BaseModel):
    query: str
    stores: List[StoreRequest]

class ScrapeResponse(BaseModel):
    stores: List[StoreResponse]
    scrapedAt: str