# Price Tracker Frontend Web (React)

This is the web interface for the Price Tracker application. It allows users to view, search, and manage tracked products, and for admins to add and delete them.

## Tech Stack

- React
- Axios
- React Router

## Getting Started

### Installation

```bash
npm install
```

### Run the Development Server

```bash
npm start
```

The app will start at:

```
http://localhost:3000
```

## Environment Variables

Create a `.env` file in this folder with the following:

```
REACT_APP_API_URL=http://localhost:5000
```

This URL should point to your running backend server.

## Authentication and Admin Access

- JWT tokens tokens and admin status are stored in `localStorage` under a `user` object:

  ```json
  {
    "token": "<JWT_TOKEN>",
    "isAdmin": false /* or true */
  }
  ```

- Requests to protected endpoints (e.g., `/admin/products`) use `Authorization: Bearer <token>`.
- Admin access is required for manipulating products (add, delete, update).

### Auth Context

The app uses a custom `AuthContext` to manage authentication state globally. User information is saved to and retrieved from `localStorage`, and exposed through the `useAuth()` hook.

### Admin Access Middleware

Admin-only pages are protected using the `AdminAccess` wrapper component. It checks:

- If the user is logged in
- If the user has `isAdmin: true`

## Features

### Public Pages

- Authentication page
- View a list of products
- See price comparisons from multiple stores

### Admin Pages

- Add and delete products
- View list of users

## API Integration

This frontend connects to the backend API provided in `../../backend/api-js` using Axios. Ensure both servers are running during development. If adding a product, ensure the scraping service in `../../backend/api-python` is running.
