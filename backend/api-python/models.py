from typing import List, Optional
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
    imageUrl: Optional[str] = None

class ScrapeResponse(BaseModel):
    stores: List[StoreResponse]
    imageUrl: Optional[str] = None
