# ShopVibe - E-Commerce Application

A full-stack e-commerce application with a React frontend and Express.js backend, featuring JWT authentication, payment processing mockup, image uploads, and API testing.

## 🌟 Features

### Frontend (React)
- **Product Listing** — Responsive grid with FakeStore API
- **Product Details** — Full product view with Add to Cart
- **Shopping Cart** — Add/remove items, quantity tracking
- **Checkout** — Payment processing via backend API
- **Authentication** — Login & Register pages
- **Premium UI** — Warm brown/cream palette, Poppins font, animations

### Backend (Express.js)
- **JWT Authentication** — Register, Login, Protected routes
- **Payment Mockup** — Simulated payment with success/failure responses
- **Image Upload** — Multer-based file upload (images only, 5MB limit)
- **Data Validation** — express-validator on all input
- **MongoDB** — Mongoose ORM with User & Product models

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, React Router v6, Context API, Axios |
| Backend | Express.js, Node.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT, bcryptjs |
| Upload | Multer |
| Validation | express-validator |
| Styling | Vanilla CSS (Custom Design System) |

## 📂 Project Structure

```
fsd_practical-7/
├── server/                      # Express.js Backend
│   ├── config/db.js             # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js              # JWT verification middleware
│   │   └── upload.js            # Multer config (images, 5MB)
│   ├── models/
│   │   ├── User.js              # User schema (bcrypt hashing)
│   │   └── Product.js           # Product schema
│   ├── routes/
│   │   ├── auth.js              # /api/auth — register, login, me
│   │   ├── payment.js           # /api/payment — mock payment
│   │   └── upload.js            # /api/upload — image upload
│   ├── validators/index.js      # Validation rules
│   └── index.js                 # Server entry point
├── src/                         # React Frontend
│   ├── components/
│   │   ├── ProductList.js
│   │   ├── ProductDetail.js
│   │   ├── Cart.js
│   │   ├── Checkout.js
│   │   ├── Login.js
│   │   └── Register.js
│   ├── context/
│   │   ├── CartContext.js
│   │   └── AuthContext.js
│   ├── services/api.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── postman/
│   └── ShopVibe_API.postman_collection.json
├── uploads/                     # Uploaded images (gitignored)
├── .env                         # Secrets (gitignored)
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (free tier) or local MongoDB

### 1. Clone & Install

```bash
git clone https://github.com/Priyansh609/fsd_assignment-7.git
cd fsd_assignment-7
npm install
```

### 2. Configure Environment

Create a `.env` file in the root:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/shopvibe?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
```

### 3. Run the Application

```bash
# Run both frontend + backend concurrently
npm run dev

# Or run separately:
npm run server   # Backend on :5000
npm start        # Frontend on :3000
```

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health` | No | Health check |
| POST | `/api/auth/register` | No | Register user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/auth/me` | Yes | Get profile |
| POST | `/api/payment/pay` | Yes | Mock payment |
| POST | `/api/upload` | Yes | Upload image |

### Example: Register
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Example: Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Example: Payment
```json
POST /api/payment/pay
Authorization: Bearer <token>
{
  "amount": 99.99,
  "cardNumber": "4111111111111111",
  "cardHolder": "John Doe"
}
```

## 🧪 Postman Testing

Import the collection from `postman/ShopVibe_API.postman_collection.json` into Postman.

The collection includes:
- ✅ Auto-token extraction (register/login → saves token automatically)
- ✅ Validation error tests (empty body, missing fields)
- ✅ Unauthorized access tests (no token → 401)
- ✅ All CRUD operations with example data

## 📋 Validation Rules

| Field | Rule |
|-------|------|
| `name` | Required, min 2 chars |
| `email` | Required, valid email format |
| `password` | Required, min 6 chars |
| `amount` | Required, > 0 |
| `cardNumber` | Required, 13–19 digits |
| `image` | Images only (jpeg, jpg, png, gif, webp), max 5MB |

---
*Built with  using React & Express.js*
