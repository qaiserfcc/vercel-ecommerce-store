const express = require('express');
const multer = require('multer');
const path = require('path');
const { sql } = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// All admin routes require authentication and admin role
router.use(authMiddleware, adminMiddleware);

// Products Management

// Get all products (admin view)
router.get('/products', async (req, res) => {
  try {
    const products = await sql`
      SELECT p.*, c.name as category_name, b.name as brand_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN brands b ON p.brand_id = b.id
      ORDER BY p.created_at DESC
    `;

    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Create product
router.post('/products', async (req, res) => {
  try {
    const {
      name, slug, description, basePrice, categoryId, brandId,
      stockQuantity, isBestseller, isNewArrival, isFeatured
    } = req.body;

    const result = await sql`
      INSERT INTO products (
        name, slug, description, base_price, category_id, brand_id,
        stock_quantity, is_bestseller, is_new_arrival, is_featured
      )
      VALUES (
        ${name}, ${slug}, ${description}, ${basePrice}, ${categoryId}, ${brandId},
        ${stockQuantity || 0}, ${isBestseller || false}, ${isNewArrival || false}, ${isFeatured || false}
      )
      RETURNING *
    `;

    res.json(result[0]);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product
router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, slug, description, basePrice, categoryId, brandId,
      stockQuantity, isBestseller, isNewArrival, isFeatured
    } = req.body;

    const result = await sql`
      UPDATE products SET
        name = ${name},
        slug = ${slug},
        description = ${description},
        base_price = ${basePrice},
        category_id = ${categoryId},
        brand_id = ${brandId},
        stock_quantity = ${stockQuantity},
        is_bestseller = ${isBestseller},
        is_new_arrival = ${isNewArrival},
        is_featured = ${isFeatured},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    res.json(result[0]);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await sql`DELETE FROM products WHERE id = ${id}`;

    res.json({ success: true });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Bulk upload products
router.post('/products/bulk', async (req, res) => {
  try {
    const { products } = req.body;

    const results = [];
    for (const product of products) {
      const result = await sql`
        INSERT INTO products (
          name, slug, description, base_price, category_id, brand_id, stock_quantity
        )
        VALUES (
          ${product.name}, ${product.slug}, ${product.description},
          ${product.basePrice}, ${product.categoryId}, ${product.brandId},
          ${product.stockQuantity || 0}
        )
        RETURNING *
      `;
      results.push(result[0]);
    }

    res.json(results);
  } catch (error) {
    console.error('Bulk upload error:', error);
    res.status(500).json({ error: 'Failed to bulk upload products' });
  }
});

// Product variants management
router.post('/products/:productId/variants', async (req, res) => {
  try {
    const { productId } = req.params;
    const { sku, variantName, price, stockQuantity, attributes } = req.body;

    const result = await sql`
      INSERT INTO product_variants (
        product_id, sku, variant_name, price, stock_quantity, attributes
      )
      VALUES (
        ${productId}, ${sku}, ${variantName}, ${price}, ${stockQuantity || 0},
        ${JSON.stringify(attributes)}
      )
      RETURNING *
    `;

    res.json(result[0]);
  } catch (error) {
    console.error('Create variant error:', error);
    res.status(500).json({ error: 'Failed to create variant' });
  }
});

// Product images management
router.post('/products/:productId/images', upload.single('image'), async (req, res) => {
  try {
    const { productId } = req.params;
    const { isPrimary, displayOrder } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const result = await sql`
      INSERT INTO product_images (product_id, image_url, is_primary, display_order)
      VALUES (${productId}, ${imageUrl}, ${isPrimary || false}, ${displayOrder || 0})
      RETURNING *
    `;

    res.json(result[0]);
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Discounts Management

// Get all discounts
router.get('/discounts', async (req, res) => {
  try {
    const discounts = await sql`
      SELECT * FROM discounts ORDER BY created_at DESC
    `;

    res.json(discounts);
  } catch (error) {
    console.error('Get discounts error:', error);
    res.status(500).json({ error: 'Failed to fetch discounts' });
  }
});

// Create discount
router.post('/discounts', async (req, res) => {
  try {
    const {
      code, name, description, discountType, discountValue,
      minPurchaseAmount, maxDiscountAmount, startDate, endDate,
      isActive, usageLimit, appliesTo
    } = req.body;

    const result = await sql`
      INSERT INTO discounts (
        code, name, description, discount_type, discount_value,
        min_purchase_amount, max_discount_amount, start_date, end_date,
        is_active, usage_limit, applies_to
      )
      VALUES (
        ${code}, ${name}, ${description}, ${discountType}, ${discountValue},
        ${minPurchaseAmount || 0}, ${maxDiscountAmount}, ${startDate}, ${endDate},
        ${isActive !== false}, ${usageLimit}, ${appliesTo || 'all'}
      )
      RETURNING *
    `;

    res.json(result[0]);
  } catch (error) {
    console.error('Create discount error:', error);
    res.status(500).json({ error: 'Failed to create discount' });
  }
});

// Update discount
router.put('/discounts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      code, name, description, discountType, discountValue,
      minPurchaseAmount, maxDiscountAmount, startDate, endDate,
      isActive, usageLimit, appliesTo
    } = req.body;

    const result = await sql`
      UPDATE discounts SET
        code = ${code},
        name = ${name},
        description = ${description},
        discount_type = ${discountType},
        discount_value = ${discountValue},
        min_purchase_amount = ${minPurchaseAmount},
        max_discount_amount = ${maxDiscountAmount},
        start_date = ${startDate},
        end_date = ${endDate},
        is_active = ${isActive},
        usage_limit = ${usageLimit},
        applies_to = ${appliesTo}
      WHERE id = ${id}
      RETURNING *
    `;

    res.json(result[0]);
  } catch (error) {
    console.error('Update discount error:', error);
    res.status(500).json({ error: 'Failed to update discount' });
  }
});

// Delete discount
router.delete('/discounts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await sql`DELETE FROM discounts WHERE id = ${id}`;

    res.json({ success: true });
  } catch (error) {
    console.error('Delete discount error:', error);
    res.status(500).json({ error: 'Failed to delete discount' });
  }
});

// User Management

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await sql`
      SELECT id, email, first_name, last_name, phone, role, created_at
      FROM users
      ORDER BY created_at DESC
    `;

    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update user role
router.put('/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const result = await sql`
      UPDATE users SET role = ${role}
      WHERE id = ${id}
      RETURNING id, email, first_name, last_name, role
    `;

    res.json(result[0]);
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

// Orders Management

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await sql`
      SELECT o.*, u.email, u.first_name, u.last_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `;

    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Update order status
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, location, notes } = req.body;

    // Update order
    await sql`
      UPDATE orders SET status = ${status}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `;

    // Add tracking entry
    await sql`
      INSERT INTO order_tracking (order_id, status, location, notes)
      VALUES (${id}, ${status}, ${location}, ${notes})
    `;

    res.json({ success: true });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Categories Management

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await sql`SELECT * FROM categories ORDER BY name ASC`;
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Create category
router.post('/categories', async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    const result = await sql`
      INSERT INTO categories (name, slug, description)
      VALUES (${name}, ${slug}, ${description})
      RETURNING *
    `;

    res.json(result[0]);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Brands Management

// Get all brands
router.get('/brands', async (req, res) => {
  try {
    const brands = await sql`SELECT * FROM brands ORDER BY name ASC`;
    res.json(brands);
  } catch (error) {
    console.error('Get brands error:', error);
    res.status(500).json({ error: 'Failed to fetch brands' });
  }
});

// Create brand
router.post('/brands', async (req, res) => {
  try {
    const { name, slug, logoUrl, description } = req.body;

    const result = await sql`
      INSERT INTO brands (name, slug, logo_url, description)
      VALUES (${name}, ${slug}, ${logoUrl}, ${description})
      RETURNING *
    `;

    res.json(result[0]);
  } catch (error) {
    console.error('Create brand error:', error);
    res.status(500).json({ error: 'Failed to create brand' });
  }
});

module.exports = router;
