# Namecheap E-commerce Store

A modern e-commerce platform built with Next.js, Node.js, and Neon DB that shares profits with users through bulk buying, referral rewards, and automatic discounts.

![Namecheap Logo](https://img.shields.io/badge/Namecheap-Share%20The%20Profit-FDB813?style=for-the-badge)

## 🌟 Features

### Customer Features
- **Home Page** with Banner, Best Sellers, Product Bundles, New Arrivals, Brands, and About sections
- **Shopping Page** with advanced filters (category, brand, price range, search)
- **Wishlist** for saving favorite products
- **Shopping Cart** with real-time updates
- **Checkout** with discount code support
- **User Profile** with address management and personal details
- **Orders Page** with order history
- **Order Tracking** with real-time status updates

### Admin Features
- **Product Management** (CRUD) with variants and multiple images
- **Bulk Product Upload** for efficient inventory management
- **Discount/Promotion Management** with automatic application at checkout
- **User Management** with role assignment
- **Analytics Dashboard** featuring:
  - Product click tracking
  - Visitor count
  - Most clicked products
  - Page views analytics
  - Sales reports

### Profit Sharing Model
- **Bulk Buying Discounts** - Save more when buying in quantity
- **Referral System** - Earn discounts by referring friends
- **Product Bundles** - Automatic discounts on bundled items
- **Loyalty Rewards** - Benefits that grow with every purchase

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Custom components with modern design

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript
- **File Upload**: Multer
- **Authentication**: JWT + bcryptjs

### Database
- **Database**: Neon DB (PostgreSQL)
- **ORM**: Neon Serverless Driver

### Design System
- **Primary Color**: Dark Yellow (#FDB813)
- **Secondary Color**: Sky Blue (#87CEEB)
- **Accent Color**: Light Black (#2D2D2D)

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- Neon DB account and database created
- Git installed

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/qaiserfcc/vercel-ecommerce-store.git
cd vercel-ecommerce-store
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` file with your credentials:
```env
DATABASE_URL=postgresql://user:password@host/dbname
NEXT_PUBLIC_API_URL=http://localhost:5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
PORT=5000
```

4. **Set up the database**

Connect to your Neon DB and run the schema:
```bash
# Use the SQL editor in Neon console or psql
psql $DATABASE_URL < backend/schema.sql
```

5. **Create uploads directory**
```bash
mkdir uploads
```

6. **Run the development servers**

Option 1 - Run both frontend and backend together:
```bash
npm run dev:all
```

Option 2 - Run separately in different terminals:
```bash
# Terminal 1 - Backend
npm run backend

# Terminal 2 - Frontend
npm run dev
```

7. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
vercel-ecommerce-store/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   ├── wishlist.js
│   │   ├── orders.js
│   │   ├── discounts.js
│   │   ├── admin.js
│   │   └── analytics.js
│   ├── schema.sql
│   └── server.js
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── user/
│   │       ├── Banner.tsx
│   │       ├── BestSellers.tsx
│   │       ├── ProductBundles.tsx
│   │       ├── NewArrivals.tsx
│   │       ├── Brands.tsx
│   │       └── AboutSection.tsx
│   └── types/
│       └── index.ts
├── public/
│   └── images/
├── uploads/
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── README.md
```

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/bestsellers` - Get bestseller products
- `GET /api/products/new-arrivals` - Get new arrivals
- `GET /api/products/bundles` - Get product bundles
- `GET /api/products/:slug` - Get single product
- `POST /api/products/:id/click` - Track product click

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove cart item
- `DELETE /api/cart` - Clear cart

### Wishlist
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `GET /api/orders/:id/tracking` - Get order tracking

### Discounts
- `GET /api/discounts` - Get active discounts
- `POST /api/discounts/validate` - Validate discount code

### Admin
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `POST /api/admin/products/bulk` - Bulk upload products
- `POST /api/admin/products/:id/variants` - Add product variant
- `POST /api/admin/products/:id/images` - Upload product image
- `GET /api/admin/discounts` - Get all discounts
- `POST /api/admin/discounts` - Create discount
- `PUT /api/admin/discounts/:id` - Update discount
- `DELETE /api/admin/discounts/:id` - Delete discount
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard statistics
- `GET /api/analytics/product-clicks` - Get product click analytics
- `GET /api/analytics/most-clicked-product` - Get most clicked product
- `GET /api/analytics/page-views` - Get page view analytics
- `GET /api/analytics/visitors` - Get visitor count
- `GET /api/analytics/sales` - Get sales analytics

## 🎨 Design System

### Color Palette
- **Primary (Dark Yellow)**: `#FDB813`
- **Secondary (Sky Blue)**: `#87CEEB`
- **Dark (Light Black)**: `#2D2D2D`

### Typography
- Font Family: Inter (Google Fonts)
- Headings: Bold, larger sizes
- Body: Regular weight

### Components
- Cards with shadows and hover effects
- Gradient backgrounds for featured sections
- Rounded corners for modern look
- Smooth transitions and animations

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- HTTP-only cookies for token storage
- Protected admin routes
- SQL injection prevention with parameterized queries

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚧 Future Enhancements

- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Advanced search with filters
- [ ] Social media integration
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Real-time notifications
- [ ] Chat support
- [ ] AI-powered product recommendations

## 📄 License

This project is licensed under the ISC License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please contact the development team.

---

**Built with ❤️ for sharing profits with our customers**
