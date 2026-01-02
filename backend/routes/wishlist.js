const express = require('express');
const { sql } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get user wishlist
router.get('/', authMiddleware, async (req, res) => {
  try {
    const items = await sql`
      SELECT w.*, p.name, p.slug, p.base_price,
             (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = true LIMIT 1) as image_url
      FROM wishlist w
      JOIN products p ON w.product_id = p.id
      WHERE w.user_id = ${req.user.id}
      ORDER BY w.created_at DESC
    `;

    res.json(items);
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

// Add to wishlist
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;

    await sql`
      INSERT INTO wishlist (user_id, product_id)
      VALUES (${req.user.id}, ${productId})
      ON CONFLICT (user_id, product_id) DO NOTHING
    `;

    res.json({ success: true });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
});

// Remove from wishlist
router.delete('/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;

    await sql`
      DELETE FROM wishlist
      WHERE user_id = ${req.user.id} AND product_id = ${productId}
    `;

    res.json({ success: true });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
});

module.exports = router;
