from fastapi import FastAPI
from db.mongodb import products_collection

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "FastAPI backend is running."}

@app.get("/products")
async def get_products():
    products = list(products_collection.find({}, {"_id": 0}))
    return {"products": products}
