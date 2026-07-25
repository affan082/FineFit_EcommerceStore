# FineFit — Men's Casual Wear Store

A full-stack e-commerce web application for men's casual clothing, featuring Pants, T-Shirts, and Casual Shirts. Built with the MERN stack.

## Features

- User registration and login with JWT authentication
- Product browsing by category with product detail pages
- Shopping cart (persisted to database per user)
- Checkout flow with shipping details
- Order history and order status tracking
- Admin dashboard for managing products and order statuses
- Responsive design across desktop and mobile

## Tech Stack

**Frontend:** React (Vite + TypeScript), React-Bootstrap, Bootstrap, React Router, Axios, React Toastify

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, Multer

## Setup Instructions

### Backend

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_google_email
EMAIL_PASS=your_google_apppassword
CLIENT_URL=your_client_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```bash
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Seeding sample products (optional)

```bash
cd server
node seed.js
```

## Design

Monochrome, minimal aesthetic with a custom Bootstrap theme (no default Bootstrap blue). Typography pairs Space Grotesk for headings, Inter for body text, and IBM Plex Mono for tags, prices, and labels.

## Screenshots

You can see in the screenshots folder.

## Author

Built by Affan Amin.
