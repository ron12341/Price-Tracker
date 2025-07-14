# Price Tracker API (Node.js + Express)

This Express API handles data flow between the frontend and the price scraper.

## Endpoints

### Public Routes

| Method | Routes         | Descriptions              | Auth Required |
| ------ | -------------- | ------------------------- | ------------- |
| GET    | /products      | List all tracked products | x             |
| GET    | /producuts/:id | Get data for one product  | x             |

### Admin Routes

| Method | Routes                      | Descriptions               | Auth Required |
| ------ | --------------------------- | -------------------------- | ------------- |
| POST   | /admin/products             | Add a new product to track | (admin)       |
| POST   | /admin/products/bulk-delete | Delete multiple products   | (admin)       |

### Auth Routes

| Method | Routes         | Descriptions              | Auth Required |
| ------ | -------------- | ------------------------- | ------------- |
| POST   | /auth/login    | Log in user and get token | x             |
| POST   | /auth/register | Register a new user       | x             |

## Authentication

The API uses JWT-based authentication. Protected routes require a valid `Authorization` header:

    Authorization: Bearer <yout_token>

Only users with the `admin` role are allowed to access `/admin/*` routes.

## Environment Variables

Create a .env file in this folder with the following:

```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
```

## Example Requests

### Add Product (Admin Only)

**Request:**

```http
POST /admin/products HTTP/1.1
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "iPhone 15",
  "query": "iphone 15",
  "imageUrl": "https://example.com/image.jpg",
  "stores": [
    { "storeName": "amazon", "url": "https://amazon.ca/..." },
    { "storeName": "walmart", "url": "https://walmart.ca/..." }
  ]
}
```

**Response:**

```json
{
  "_id": "1234",
  "name": "iPhone 15",
  "price": "$999",
  "scrapedAt": "2025-07-14T14:30:00.000Z",
  "stores": [
    {
      "storeName": "amazon",
      "url": "https://amazon.ca/iphone15",
      "price": "$999"
    },
    {
      "storeName": "walmart",
      "url": "https://walmart.ca/iphone15",
      "price": "$995"
    }
  ]
}
```

### Bulk Delete Products (Admin Only)

**Request:**

```http
POST /admin/products/bulk-delete HTTP/1.1
Authorization: Bearer <admin_token>
Content-Type: application/json
{
  "ids": ["123", "456", "789"]
}
```

**Response:**

```json
{
  "acknowledged": true,
  "deletedCount": 3
}
```

### Fetch All Products

**Request:**

```http
GET /products HTTP/1.1
Host: your-api-domain.com
```

**Response:**

```json
[
  {
    "_id": "1234",
    "name": "iPhone 15",
    "query": "iphone 15",
    "imageUrl": "https://example.com/iphone15.jpg",
    "scrapedAt": "2025-07-14T14:30:00.000Z",
    "stores": [
      /* array of store objects */
    ]
  },
  {
    "_id": "5678",
    "name": "Samsung Galaxy S24",
    "query": "samsung galaxy s24",
    "imageUrl": "https://example.com/galaxys24.jpg",
    "scrapedAt": "2025-07-14T14:30:00.000Z",
    "stores": [
      /* array of store objects */
    ]
  }
]
```

### Fetch A Product

**Request:**

```http
GET /products/1234 HTTP/1.1
Host: your-api-domain.com
```

**Response:**

```json
{
  "_id": "1234",
  "name": "iPhone 15",
  "query": "iphone 15",
  "imageUrl": "https://example.com/iphone15.jpg",
  "scrapedAt": "2025-07-14T14:30:00.000Z",
  "stores": [
    /* array of store objects */
  ]
}
```

### Register User

**Request:**

```http
POST /auth/register HTTP/1.1
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "newPassword123*"
}
```

**Response:**

```json
{
  "message": "User registered successfully"
}
```

### Login User

**Request:**

```http
POST /auth/login HTTP/1.1
Content-Type: application/json

{
  "email": "existingUser@example.com",
  "password": "existingPassword123*"
}
```

**Response:**

```json
{
  "token": "user_token",
  "isAdmin": false
}
```

## Run Dev Server

```bash
node index.js
```

## Middleware

- `authMiddleware.js`:
  - `authMiddleware`: Validates JWT Token
  - `isAdmin`: Ensures user has admin role
