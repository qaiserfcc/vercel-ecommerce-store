const express = require('express');
const { sql } = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// All analytics routes require admin access
router.use(authMiddleware, adminMiddleware);

// Get dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    // Total orders
    const totalOrders = await sql`SELECT COUNT(*) as count FROM orders`;
    
    // Total revenue
    const totalRevenue = await sql`SELECT SUM(final_amount) as total FROM orders WHERE payment_status = 'completed'`;
    
    // Total users
    const totalUsers = await sql`SELECT COUNT(*) as count FROM users WHERE role = 'user'`;
    
    // Total products
    const totalProducts = await sql`SELECT COUNT(*) as count FROM products`;

    // Recent orders
    const recentOrders = await sql`
      SELECT o.*, u.email, u.first_name, u.last_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
      LIMIT 10
    `;

    res.json({
      totalOrders: parseInt(totalOrders[0].count),
      totalRevenue: parseFloat(totalRevenue[0].total || 0),
      totalUsers: parseInt(totalUsers[0].count),
      totalProducts: parseInt(totalProducts[0].count),
      recentOrders
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Get product clicks analytics
router.get('/product-clicks', async (req, res) => {
  try {
    const { startDate, endDate, limit = 10 } = req.query;

    let query = `
      SELECT p.id, p.name, p.slug, COUNT(pc.id) as click_count
      FROM products p
      LEFT JOIN product_clicks pc ON p.id = pc.product_id
    `;
    
    const params = [];
    let paramIndex = 1;

    if (startDate || endDate) {
      query += ' WHERE';
      if (startDate) {
        query += ` pc.clicked_at >= $${paramIndex++}`;
        params.push(startDate);
      }
      if (endDate) {
        if (startDate) query += ' AND';
        query += ` pc.clicked_at <= $${paramIndex++}`;
        params.push(endDate);
      }
    }

    query += ` GROUP BY p.id, p.name, p.slug ORDER BY click_count DESC LIMIT $${paramIndex}`;
    params.push(limit);

    const results = await sql(query, params);

    res.json(results);
  } catch (error) {
    console.error('Get product clicks error:', error);
    res.status(500).json({ error: 'Failed to fetch product clicks' });
  }
});

// Get most clicked product
router.get('/most-clicked-product', async (req, res) => {
  try {
    const result = await sql`
      SELECT p.id, p.name, p.slug, COUNT(pc.id) as click_count,
             (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = true LIMIT 1) as image_url
      FROM products p
      LEFT JOIN product_clicks pc ON p.id = pc.product_id
      GROUP BY p.id, p.name, p.slug
      ORDER BY click_count DESC
      LIMIT 1
    `;

    res.json(result[0] || null);
  } catch (error) {
    console.error('Get most clicked product error:', error);
    res.status(500).json({ error: 'Failed to fetch most clicked product' });
  }
});

// Get page views analytics
router.get('/page-views', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let query = 'SELECT page_url, COUNT(*) as view_count FROM page_views';
    const params = [];
    let paramIndex = 1;

    if (startDate || endDate) {
      query += ' WHERE';
      if (startDate) {
        query += ` viewed_at >= $${paramIndex++}`;
        params.push(startDate);
      }
      if (endDate) {
        if (startDate) query += ' AND';
        query += ` viewed_at <= $${paramIndex++}`;
        params.push(endDate);
      }
    }

    query += ' GROUP BY page_url ORDER BY view_count DESC LIMIT 20';

    const results = await sql(query, params);

    res.json(results);
  } catch (error) {
    console.error('Get page views error:', error);
    res.status(500).json({ error: 'Failed to fetch page views' });
  }
});

// Get visitor count
router.get('/visitors', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let query = 'SELECT COUNT(DISTINCT session_id) as visitor_count FROM page_views';
    const params = [];
    let paramIndex = 1;

    if (startDate || endDate) {
      query += ' WHERE';
      if (startDate) {
        query += ` viewed_at >= $${paramIndex++}`;
        params.push(startDate);
      }
      if (endDate) {
        if (startDate) query += ' AND';
        query += ` viewed_at <= $${paramIndex++}`;
        params.push(endDate);
      }
    }

    const result = await sql(query, params);

    res.json({ visitorCount: parseInt(result[0].visitor_count) });
  } catch (error) {
    console.error('Get visitor count error:', error);
    res.status(500).json({ error: 'Failed to fetch visitor count' });
  }
});

// Track page view
router.post('/track-view', async (req, res) => {
  try {
    const { pageUrl, sessionId, referrer, userAgent } = req.body;
    const userId = req.user?.id || null;

    await sql`
      INSERT INTO page_views (page_url, user_id, session_id, referrer, user_agent)
      VALUES (${pageUrl}, ${userId}, ${sessionId}, ${referrer}, ${userAgent})
    `;

    res.json({ success: true });
  } catch (error) {
    console.error('Track view error:', error);
    res.status(500).json({ error: 'Failed to track view' });
  }
});

// Get sales analytics
router.get('/sales', async (req, res) => {
  try {
    const { period = 'month' } = req.query;

    let dateFormat;
    switch (period) {
      case 'day':
        dateFormat = 'YYYY-MM-DD';
        break;
      case 'week':
        dateFormat = 'IYYY-IW';
        break;
      case 'month':
        dateFormat = 'YYYY-MM';
        break;
      case 'year':
        dateFormat = 'YYYY';
        break;
      default:
        dateFormat = 'YYYY-MM';
    }

    const results = await sql`
      SELECT 
        TO_CHAR(created_at, ${dateFormat}) as period,
        COUNT(*) as order_count,
        SUM(final_amount) as total_sales
      FROM orders
      WHERE payment_status = 'completed'
      GROUP BY period
      ORDER BY period DESC
      LIMIT 12
    `;

    res.json(results);
  } catch (error) {
    console.error('Get sales analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch sales analytics' });
  }
});

module.exports = router;
