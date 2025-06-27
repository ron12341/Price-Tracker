## How to Run

### FastAPI Scraper:

```bash
cd backend/api-python
uvicorn main:app --reload --port 8000
```

### Express API:

```bash
cd backend/api-js
node index.js
```

## Collections

### User Collection

```json
{
  "_id": ObjectId(),
  "email": "admin@example.com",
  "passwordHash": "...",
  "role": "admin"
}
```

### Product Collection

```json
{
  "_id": ObjectId,
  "name": "AMD Ryzen 7 7800X3D 4.2 GHz 8-Core Processor",
  "stores": [
    {
      "storeName": "Amazon",
      "price": "99.99",
      "url": "https://www.amazon.ca/dp/B0BTZB7F88"
    },
    {
      "storeName": "Newegg",
      "price": "89.99",
      "url": "https://www.newegg.ca/...etc"
    }
  ]
}
```
