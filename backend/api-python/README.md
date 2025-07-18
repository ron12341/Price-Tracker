# Product Price Scraper API

A lightweight FastAPI-based backend for scraping product prices (and images) from popular e-commerce websites.

## Features

- Accepts a list of store URLs with store names.
- Scrapes current product prices from supported stores.
- Extracts product image URL (from the first valid source).
- Easy to extend with more store support (e.g., eBay).

## Supported Stores

| Store            | Price Support | Image Support |
| ---------------- | ------------- | ------------- |
| Amazon           | ✅ Yes        | ✅ Yes        |
| Walmart          | ✅ Yes        | ✅ Yes        |
| More to be added | ❌ Not Yet    | ❌ Not Yet    |

## API Endpoint

### Example Request

**Header:**

```http
POST /scrape HTTP/1.1
Content-Type: application/json
```

**Request:**

```json
{
  "query": "Apple Iphone 16",
  "stores": [
    {
      "storeName": "amazon",
      "url": "https://amazon.ca/..."
    },
    {
      "storeName": "walmart",
      "url": "https://walmart.ca/..."
    }
  ]
}
```

**Response:**

```json
{
  "stores": [
    {
      "storeName": "amazon",
      "url": "https://amazon.ca/...",
      "price": "$995"
    },
    {
      "storeName": "walmart",
      "url": "https://walmart.ca/...",
      "price": "$999"
    }
  ]
}
```

---

## Setup Instructions

### 1. Create and activate a virtual environment

```bash
pyton -m venv venv

# on Windows
source venv/Scripts/activate

# on MacOS
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the FastAPI Server

```bash
uvicorn main:app --reload --port 8000
```

Server will be runnign at http://localhost:8000/docs

---

## File Structure

```bash
.
├── main.py                 # FastAPI application
├── models.py               # Models (request/response)
├── scraper/
│   ├── scrape_amazon.py    # Amazon scraper logic
│   └── scrape_walmart.py   # Walmart scraper logic
├── tests/
│   └── ...                 # Unit tests
├── requirements.txt        # Python dependencies
└── README.md               # This file
```
