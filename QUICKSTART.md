# Quick Start Guide

Get up and running with the E-Commerce Store in minutes!

## Prerequisites

- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn

## 1. Clone & Install (5 minutes)

```bash
# Clone the repository
git clone https://github.com/qaiserfcc/vercel-ecommerce-store.git
cd vercel-ecommerce-store

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

## 2. Setup Database (5 minutes)

### Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE ecommerce_db;
\q
```

### Run Schema

```bash
# Set your database URL
export DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce_db"

# Run initialization script
./database/init.sh
```

When prompted, type `y` to seed sample data.

## 3. Configure Environment (2 minutes)

```bash
# Copy environment template
cp .env.example .env

# Edit .env file
nano .env
```

Update these values:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/ecommerce_db
JWT_SECRET=your-secret-key-here
PORT=3000
NODE_ENV=development
REACT_APP_API_URL=http://localhost:3000/api
```

**Generate a secure JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 4. Start Development Servers (1 minute)

```bash
# Start both backend and frontend
npm run dev:all
```

This will start:
- Backend API at: http://localhost:3000
- Frontend at: http://localhost:3001

## 5. Login & Test (2 minutes)

### Sample Credentials

If you seeded the database:

**Admin Account:**
- Email: `admin@example.com`
- Password: `password123`

**Customer Account:**
- Email: `customer@example.com`
- Password: `password123`

### Quick Test Flow

1. **Browse Products**
   - Visit http://localhost:3001
   - Click "Products"
   - View sample products

2. **Register New Account**
   - Click "Register"
   - Fill in the form
   - You'll be logged in automatically

3. **Add to Cart**
   - Click on a product
   - Set quantity
   - Click "Add to Cart"

4. **Checkout**
   - Go to Cart
   - Click "Proceed to Checkout"
   - Fill in addresses
   - Optionally add discount code: `WELCOME10`
   - Place order

5. **Track Order**
   - Go to "Orders"
   - View order details
   - Check order status

## 6. Admin Panel (Admin Only)

Login with admin account and visit: http://localhost:3001/admin

Features:
- View dashboard statistics
- Manage products
- View all orders
- Manage users
- Create discount codes
- View reports

## Common Issues & Solutions

### Port Already in Use

```bash
# Change port in .env
PORT=3001
```

### Database Connection Error

1. Check PostgreSQL is running:
   ```bash
   sudo service postgresql status
   ```

2. Verify DATABASE_URL in .env

3. Test connection:
   ```bash
   psql "$DATABASE_URL" -c "SELECT 1"
   ```

### Frontend Not Loading

1. Clear browser cache
2. Check console for errors
3. Verify backend is running at http://localhost:3000/api/health

### Can't Login

1. Verify user exists in database:
   ```sql
   SELECT email FROM users;
   ```

2. Check password was seeded correctly

3. Try registering a new account

## Development Tips

### Backend Only

```bash
npm run dev
```

### Frontend Only

```bash
npm run client
```

### Database Reset

```bash
# Recreate database
psql -U postgres -c "DROP DATABASE ecommerce_db"
psql -U postgres -c "CREATE DATABASE ecommerce_db"

# Reinitialize
./database/init.sh
```

### View API Logs

Backend logs appear in the terminal where you ran `npm run dev`

### Test API Endpoints

```bash
# Health check
curl http://localhost:3000/api/health

# Get products
curl http://localhost:3000/api/products

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@example.com","password":"password123"}'
```

## Next Steps

1. **Customize Products**
   - Login as admin
   - Go to Admin Panel
   - Add your own products

2. **Create Discount Codes**
   - Admin Panel → Create Discount
   - Set percentage or fixed amount

3. **Explore API**
   - Read API_DOCUMENTATION.md
   - Test endpoints with Postman/Insomnia

4. **Deploy to Production**
   - Read DEPLOYMENT.md
   - Deploy to Vercel

## Need Help?

- 📖 Full documentation: [README.md](README.md)
- 🔌 API reference: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- 🚀 Deployment: [DEPLOYMENT.md](DEPLOYMENT.md)
- 🤝 Contributing: [CONTRIBUTING.md](CONTRIBUTING.md)
- 🐛 Issues: [GitHub Issues](https://github.com/qaiserfcc/vercel-ecommerce-store/issues)

## Success!

If everything is working:
- ✅ You can browse products
- ✅ You can add items to cart
- ✅ You can create orders
- ✅ Admin panel is accessible

You're ready to build your e-commerce store! 🎉
