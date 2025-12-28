# E-Commerce Store - Microservices Platform

A full-stack e-commerce platform built with a microservices architecture using Node.js (Express), PostgreSQL, and React with TypeScript. Initially designed for deployment on Vercel.

## 🏗️ Architecture

This application follows a microservices-style architecture with the following services:

- **API Gateway**: Central routing and middleware handling
- **Auth/User Service**: User registration, login, JWT authentication
- **Product Service**: Product CRUD operations, bulk uploads, categories
- **Cart Service**: Shopping cart management
- **Order Service**: Order creation, tracking, and management
- **Payment Service**: Payment processing simulation
- **Discount Service**: Coupon codes and promotions
- **Admin Service**: Dashboard, reports, user management
- **Notification Service**: User notifications

## 🚀 Features

### Customer Features
- ✅ Quick registration and login
- ✅ Browse products with filtering and search
- ✅ Product categories and subcategories
- ✅ Shopping cart management
- ✅ Checkout with discount codes
- ✅ Order tracking and history
- ✅ User profile management
- ✅ Notifications system

### Admin Features
- ✅ Admin dashboard with statistics
- ✅ Product management (CRUD)
- ✅ Bulk product upload
- ✅ Order management
- ✅ Discount/coupon management
- ✅ User management
- ✅ Sales reports
- ✅ Low stock alerts

## 🛠️ Tech Stack

### Backend
- Node.js with Express
- PostgreSQL (single database)
- JWT for authentication
- bcryptjs for password hashing
- Helmet for security
- CORS support
- Morgan for logging

### Frontend
- React 18 with TypeScript
- React Router for navigation
- Axios for API calls
- Context API for state management
- CSS3 for styling

### Deployment
- Vercel (configured)
- Environment variables support

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/qaiserfcc/vercel-ecommerce-store.git
cd vercel-ecommerce-store
```

### 2. Database Setup

Create a PostgreSQL database and run the schema:

```bash
psql -U your_username -d postgres
CREATE DATABASE ecommerce_db;
\c ecommerce_db
\i database/schema.sql
```

### 3. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/ecommerce_db
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3000
NODE_ENV=development
REACT_APP_API_URL=http://localhost:3000/api
```

### 4. Backend Setup

Install backend dependencies:

```bash
npm install
```

### 5. Frontend Setup

Install frontend dependencies:

```bash
cd client
npm install
cd ..
```

### 6. Running the Application

#### Development Mode

Run both backend and frontend:

```bash
npm run dev:all
```

Or run them separately:

```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
npm run client
```

#### Production Mode

```bash
npm start
```

The application will be available at:
- Backend API: http://localhost:3000/api
- Frontend: http://localhost:3001 (in dev mode)

## 📁 Project Structure

```
vercel-ecommerce-store/
├── api/
│   ├── gateway/          # API Gateway
│   ├── auth/             # Authentication service
│   ├── product/          # Product service
│   ├── cart/             # Cart service
│   ├── order/            # Order service
│   ├── payment/          # Payment service
│   ├── discount/         # Discount service
│   ├── admin/            # Admin service
│   └── notification/     # Notification service
├── client/               # React frontend
│   ├── public/
│   └── src/
│       ├── components/   # React components
│       ├── pages/        # Page components
│       ├── services/     # API service layer
│       ├── types/        # TypeScript types
│       ├── utils/        # Utilities & context
│       └── styles/       # CSS files
├── database/
│   ├── schema.sql        # Database schema
│   └── db.js             # Database connection
├── .env.example          # Environment template
├── .gitignore
├── package.json
├── vercel.json           # Vercel configuration
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `POST /api/auth/change-password` - Change password (protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/categories` - Get product categories
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `POST /api/products/bulk` - Bulk create products (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart/items` - Add item to cart (protected)
- `PUT /api/cart/items/:itemId` - Update cart item (protected)
- `DELETE /api/cart/items/:itemId` - Remove from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Orders
- `GET /api/orders` - Get user orders (protected)
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/:id` - Get order details (protected)
- `POST /api/orders/:id/cancel` - Cancel order (protected)
- `PUT /api/orders/:id/status` - Update order status (admin)

### Payments
- `POST /api/payments` - Create payment (protected)
- `POST /api/payments/:id/process` - Process payment (protected)
- `GET /api/payments/order/:orderId` - Get payment by order (protected)
- `POST /api/payments/:id/refund` - Refund payment (admin)

### Discounts
- `POST /api/discounts/validate` - Validate discount code
- `GET /api/discounts` - Get all discounts (admin)
- `POST /api/discounts` - Create discount (admin)
- `PUT /api/discounts/:id` - Update discount (admin)
- `DELETE /api/discounts/:id` - Delete discount (admin)

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats (admin)
- `GET /api/admin/users` - Get all users (admin)
- `GET /api/admin/orders` - Get all orders (admin)
- `GET /api/admin/reports/sales` - Get sales report (admin)
- `GET /api/admin/reports/top-products` - Get top products (admin)
- `PUT /api/admin/users/:id/role` - Update user role (admin)
- `DELETE /api/admin/users/:id` - Deactivate user (admin)

### Notifications
- `GET /api/notifications` - Get user notifications (protected)
- `GET /api/notifications/unread-count` - Get unread count (protected)
- `PUT /api/notifications/:id/read` - Mark as read (protected)
- `PUT /api/notifications/read-all` - Mark all as read (protected)
- `DELETE /api/notifications/:id` - Delete notification (protected)

## 🎨 UI Design

The UI is inspired by chiltanpure.com with:
- Clean, modern interface
- Green color scheme (#2d6a4f primary)
- Responsive design
- Intuitive navigation
- Professional product displays

## 🚀 Deployment to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

Environment variables needed in Vercel:
- `DATABASE_URL`
- `JWT_SECRET`
- `NODE_ENV=production`

## 🧪 Testing

### Create Admin User

First, register a normal user, then update their role in the database:

```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

### Sample Product Upload

Use the bulk upload feature in the admin panel with this format:

```json
{
  "products": [
    {
      "name": "Product Name",
      "description": "Product description",
      "price": 29.99,
      "category": "Category",
      "subCategory": "Subcategory",
      "stockQuantity": 100,
      "imageUrl": "https://example.com/image.jpg"
    }
  ]
}
```

### Test Discount Codes

Create a discount code in the admin panel and test it during checkout.

## 📝 Development Notes

- All services share a single PostgreSQL database
- JWT tokens expire after 7 days
- Payment processing is simulated (90% success rate)
- Stock levels are automatically managed
- Orders can be cancelled if status is 'pending' or 'confirmed'

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Initial work - [qaiserfcc](https://github.com/qaiserfcc)

## 🙏 Acknowledgments

- UI inspired by chiltanpure.com
- Built with modern web technologies
- Designed for scalability and maintainability
