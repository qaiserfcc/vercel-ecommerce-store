# Namecheap E-commerce Store - Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18 or higher
- npm or yarn
- A Neon DB account (PostgreSQL database)

## Step-by-Step Setup

### 1. Database Setup

1. **Create a Neon DB Account**
   - Go to [https://neon.tech](https://neon.tech)
   - Sign up for a free account
   - Create a new project

2. **Get Your Database Connection String**
   - From your Neon dashboard, copy the connection string
   - It will look like: `postgresql://user:password@host/dbname`

3. **Run Database Schema**
   - Navigate to the Neon SQL Editor in your dashboard
   - Copy the contents of `backend/schema.sql`
   - Paste and execute it in the SQL Editor
   - This will create all necessary tables

### 2. Environment Configuration

1. **Copy the example environment file**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` and add your credentials**
   ```env
   DATABASE_URL=your_neon_database_url_here
   NEXT_PUBLIC_API_URL=http://localhost:5000
   JWT_SECRET=your-super-secret-key-change-this
   NODE_ENV=development
   PORT=5000
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create Uploads Directory

```bash
mkdir uploads
```

### 5. Run the Application

**Option 1: Run Both Frontend and Backend Together**
```bash
npm run dev:all
```

**Option 2: Run Separately**

Terminal 1 (Backend):
```bash
npm run backend
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Default Admin User

To create an admin user, you need to manually insert one into the database:

```sql
-- First, you'll need to hash a password using bcrypt
-- For demo purposes, you can use this hashed password (password: admin123)
INSERT INTO users (email, password, first_name, last_name, role)
VALUES (
  'admin@namecheap.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'Admin',
  'User',
  'admin'
);
```

Then login at `/admin` with:
- Email: admin@namecheap.com
- Password: admin123

**⚠️ IMPORTANT: Change this password after first login!**

## Sample Data

To populate your store with sample data:

```sql
-- Insert Categories
INSERT INTO categories (name, slug, description) VALUES
('Electronics', 'electronics', 'Electronic devices and gadgets'),
('Accessories', 'accessories', 'Tech accessories and peripherals'),
('Home & Office', 'home-office', 'Products for home and office use');

-- Insert Brands
INSERT INTO brands (name, slug, description) VALUES
('TechPro', 'techpro', 'Professional tech products'),
('SmartGadgets', 'smartgadgets', 'Smart and innovative gadgets'),
('EcoLife', 'ecolife', 'Eco-friendly products');

-- Insert Sample Products
INSERT INTO products (name, slug, description, base_price, category_id, brand_id, stock_quantity, is_bestseller) VALUES
('Wireless Headphones', 'wireless-headphones', 'Premium wireless headphones with noise cancellation', 99.99, 1, 1, 45, true),
('Smart Watch Pro', 'smart-watch-pro', 'Advanced smartwatch with health tracking', 199.99, 1, 2, 23, true),
('Laptop Stand Ergonomic', 'laptop-stand-ergonomic', 'Adjustable ergonomic laptop stand', 49.99, 3, 3, 67, false),
('USB-C Hub Multi-Port', 'usb-c-hub-multi-port', 'Multi-port USB-C hub with HDMI', 39.99, 2, 1, 89, false);

-- Insert a Banner
INSERT INTO banners (title, description, image_url, link_url, is_active, display_order) VALUES
('Welcome to Namecheap', 'Share the profit with every purchase!', '/images/banner1.jpg', '/shop', true, 1);
```

## Troubleshooting

### Build Errors

If you encounter build errors:
1. Delete `.next` folder and `node_modules`
2. Run `npm install` again
3. Run `npm run build`

### Database Connection Issues

- Verify your DATABASE_URL in `.env`
- Check if your IP is whitelisted in Neon (Neon allows all IPs by default)
- Ensure the database exists and schema is created

### Port Already in Use

If ports 3000 or 5000 are already in use:
- Change PORT in `.env` for backend
- For frontend, use: `PORT=3001 npm run dev`

## Next Steps

1. Customize the branding and colors in `tailwind.config.ts`
2. Add your own product images to the `public/images` folder
3. Configure email notifications (add email service)
4. Set up payment gateway (Stripe, PayPal, etc.)
5. Deploy to production (Vercel, etc.)

## Support

For issues or questions, please create an issue in the GitHub repository.
