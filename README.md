# Chashmey.pk

A full-stack e-commerce platform for eyewear — eyeglasses, sunglasses, and contact lenses — built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Browsing & discovery** — homepage with hero carousel, category shortcuts, and curated product sections; a filterable category listing page; live search
- **Product details** — dedicated views for frames/sunglasses (color & size selection) and contact lenses (power, base curve, diameter)
- **Prescription lens selection** — sphere/cylinder/axis/PD entry, or upload a prescription image / write it manually
- **Cart & checkout** — persistent cart, delivery details form, Cash on Delivery or bank transfer (with discount), and real order creation
- **Customer reviews** — browsable review list
- **Content pages** — About Us, Contact Us (working contact form), FAQ, Exchange & Return Policy, Privacy Policy, Terms & Conditions

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB

## Project Structure

```
chashmey-clone/
├── client/                    # React frontend
│   └── src/
│       ├── api/                # Axios instance + API calls (products, reviews, orders, contact)
│       ├── components/         # Header, Footer, ProductCard, MegaMenu, etc.
│       ├── context/             # Cart state (CartContext)
│       ├── pages/               # Route-level pages (Home, Shop, ProductDetail, Cart, Checkout, etc.)
│       └── utils/                # Shared helpers
└── server/                     # Express backend
    ├── models/                  # Product, Review, Order, ContactMessage
    ├── controllers/
    ├── routes/
    ├── config/db.js
    ├── seed.js                  # Seeds sample product/review data
    └── server.js
```

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB running locally, or a MongoDB Atlas connection string

### Backend
```bash
cd server
npm install
cp .env.example .env       # set MONGO_URI if not using the local default
npm run seed                # loads sample product and review data
npm run dev                  # starts the API on http://localhost:5000
```

### Frontend
```bash
cd client
npm install
npm run dev                  # starts the app on http://localhost:5173
```

The frontend is pre-configured to proxy API requests to `http://localhost:5000/api` (see `client/vite.config.js`).

## Environment Variables

`server/.env`:
| Variable | Description |
|---|---|
| `PORT` | Port the API server runs on (default `5000`) |
| `MONGO_URI` | MongoDB connection string |
| `CLIENT_ORIGIN` | Frontend origin(s) allowed by CORS, comma-separated (default `http://localhost:5173`) |

`client/.env`:
| Variable | Description |
|---|---|
| `VITE_API_URL` | Full backend API URL in production, e.g. `https://your-backend.onrender.com/api`. Leave unset locally — requests go through the Vite dev proxy. |

## Deploying (Vercel + Render)

**Backend on Render**
1. New Web Service → point at this repo, set **Root Directory** to `server`.
2. Build command: `npm install` — Start command: `npm start`.
3. Environment variables: `MONGO_URI` (e.g. a MongoDB Atlas URI — Render can't reach a local MongoDB), `CLIENT_ORIGIN` (your Vercel URL, added after step below), `PORT` is set automatically by Render.
4. Deploy, then note the service URL, e.g. `https://chashmey-api.onrender.com`.

**Frontend on Vercel**
1. New Project → point at this repo, set **Root Directory** to `client`.
2. Framework preset: Vite. Build command: `npm run build` — Output directory: `dist`.
3. Environment variable: `VITE_API_URL=https://chashmey-api.onrender.com/api` (your Render URL + `/api`).
4. Deploy, then note the resulting URL, e.g. `https://chashmey.vercel.app`.

**Wire them together**
- Go back to Render and set `CLIENT_ORIGIN=https://chashmey.vercel.app` (comma-separate if you also want to allow a preview URL or custom domain), then redeploy the backend so CORS allows requests from the live frontend.
- Run `npm run seed` once against your Atlas database (locally, with `MONGO_URI` pointed at Atlas) so the deployed site has product/review data.
