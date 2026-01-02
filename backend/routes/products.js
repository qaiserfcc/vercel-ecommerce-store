const express = require('express');
const { sql } = require('../config/database');

const router = express.Router();

// Get all products with filters
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      brand, 
      minPrice, 
      maxPrice, 
      search, 
      isBestseller, 
      isNewArrival,
      page = 1,
      limit = 12
    } = req.query;

    let query = `
      SELECT p.*, c.name as category_name, b.name as brand_name,
             (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = true LIMIT 1) as primary_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN brands b ON p.brand_id = b.id
      WHERE 1=1
    `;
    
    const params = [];
    let paramIndex = 1;

    if (category) {
      query += ` AND c.slug = $${paramIndex++}`;
      params.push(category);
    }

    if (brand) {
      query += ` AND b.slug = $${paramIndex++}`;
      params.push(brand);
    }

    if (minPrice) {
      query += ` AND p.base_price >= $${paramIndex++}`;
      params.push(minPrice);
    }

    if (maxPrice) {
      query += ` AND p.base_price <= $${paramIndex++}`;
      params.push(maxPrice);
    }

    if (search) {
      query += ` AND (p.name ILIKE $${paramIndex++} OR p.description ILIKE $${paramIndex})`;
      params.push(`%${search}%`, `%${search}%`);
      paramIndex++;
    }

    if (isBestseller === 'true') {
      query += ' AND p.is_bestseller = true';
    }

    if (isNewArrival === 'true') {
      query += ' AND p.is_new_arrival = true';
    }

    query += ` ORDER BY p.created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
    params.push(limit, (page - 1) * limit);

    const products = await sql(query, params);
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM products p LEFT JOIN categories c ON p.category_id = c.id LEFT JOIN brands b ON p.brand_id = b.id WHERE 1=1';
    const countParams = params.slice(0, -2); // Remove limit and offset
    
    const countResult = await sql(countQuery, countParams);
    const total = parseInt(countResult[0].count);

    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get bestsellers
router.get('/bestsellers', async (req, res) => {
  try {
    const products = await sql`
      SELECT p.*, 
             (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = true LIMIT 1) as primary_image
      FROM products p
      WHERE p.is_bestseller = true
      ORDER BY p.created_at DESC
      LIMIT 8
    `;
    res.json(products);
  } catch (error) {
    console.error('Get bestsellers error:', error);
    res.status(500).json({ error: 'Failed to fetch bestsellers' });
  }
});

// Get new arrivals
router.get('/new-arrivals', async (req, res) => {
  try {
    const products = await sql`
      SELECT p.*, 
             (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = true LIMIT 1) as primary_image
      FROM products p
      WHERE p.is_new_arrival = true
      ORDER BY p.created_at DESC
      LIMIT 8
    `;
    res.json(products);
  } catch (error) {
    console.error('Get new arrivals error:', error);
    res.status(500).json({ error: 'Failed to fetch new arrivals' });
  }
});

// Get product bundles
router.get('/bundles', async (req, res) => {
  try {
    const bundles = await sql`
      SELECT * FROM product_bundles
      WHERE is_active = true
      ORDER BY created_at DESC
    `;

    // Get items for each bundle
    for (let bundle of bundles) {
      const items = await sql`
        SELECT bi.*, p.name, p.base_price,
               (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = true LIMIT 1) as image_url
        FROM bundle_items bi
        JOIN products p ON bi.product_id = p.id
        WHERE bi.bundle_id = ${bundle.id}
      `;
      bundle.items = items;
    }

    res.json(bundles);
  } catch (error) {
    console.error('Get bundles error:', error);
    res.status(500).json({ error: 'Failed to fetch bundles' });
  }
});

// Get single product by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const products = await sql`
      SELECT p.*, c.name as category_name, b.name as brand_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN brands b ON p.brand_id = b.id
      WHERE p.slug = ${slug}
    `;

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = products[0];

    // Get images
    const images = await sql`
      SELECT * FROM product_images
      WHERE product_id = ${product.id}
      ORDER BY is_primary DESC, display_order ASC
    `;

    // Get variants
    const variants = await sql`
      SELECT * FROM product_variants
      WHERE product_id = ${product.id}
    `;

    product.images = images;
    product.variants = variants;

    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Track product click
router.post('/:id/click', async (req, res) => {
  try {
    const { id } = req.params;
    const { sessionId } = req.body;
    const userId = req.user?.id || null;

    await sql`
      INSERT INTO product_clicks (product_id, user_id, session_id)
      VALUES (${id}, ${userId}, ${sessionId})
    `;

    res.json({ success: true });
  } catch (error) {
    console.error('Track click error:', error);
    res.status(500).json({ error: 'Failed to track click' });
  }
});

module.exports = router;
