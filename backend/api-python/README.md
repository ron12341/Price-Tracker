## Price Scraper Service (Python)

This module scrapes prices from various online stores

### Supported Stores

- Amazon
- Walmart
- More to be added

### Requirements

```bash
pip install -r requirements.txt
```

### Usage

```bash
uvicorn main:app --reload --port 8000
```

### How It Works

- Accepts a list of URLs from API
- Fetches HTML
- Parses product prices
- Returns structured data to API
