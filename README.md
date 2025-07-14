# Price-Tracker

A full-stack monorepo application for tracking product prices accross various e-commerce websites. Scrapes prices using Python, serves data through Node.js + Express API, and displays it using a React-based frontend webpage.

## Monorepo Structure

```
.
├── backend/
│ ├── api-js/     # Node.js API for handling data and requests
│ └── api-python/ # Python scrapers for fetching prices
├── frontend/
│ └── web/        # React frontend web application
└── README.md     # Project overview
```

## Tech Stack

| Layer    | Tech                                     |
| -------- | ---------------------------------------- |
| Frontend | React (JS, CSS)                          |
| API      | Node.js, Express                         |
| Scraping | Python, FastAPI, Requests, BeautifulSoup |
| Database | MongoDB                                  |

## Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/ron12341/Price-Tracker.git
cd Price-Tracker
```

### 2. Backend Setup

#### a. API (Node.js + Express)

```bash
cd backend/api-js
npm install
node index.js   # run
```

#### b. Scrapers (Python)

```bash
cd backend/api-python
python -m venv venv
source venv/Scripts/activate  # activate venv
pip install -r requirements.txt
uvicorn main:app --reload --port 8000   # run
```

### 3. Frontend Setup

#### a. Web (React)

```bash
cd frontend/web
npm install
npm start
```
