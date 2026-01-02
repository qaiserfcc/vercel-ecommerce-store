const express = require('express');
const { sql } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get user cart
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Get or create cart
    let carts = await sql`SELECT id FROM cart WHERE user_id = ${req.user.id}`;
    let cartId;

    if (carts.length === 0) {
      const newCart = await sql`
        INSERT INTO cart (user_id) VALUES (${req.user.id}) RETURNING id
      `;
      cartId = newCart[0].id;
    } else {
      cartId = carts[0].id;
    }

    // Get cart items
    const items = await sql`
      SELECT ci.*, p.name, p.slug, p.base_price,
             pv.variant_name, pv.attributes,
             (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = true LIMIT 1) as image_url
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      LEFT JOIN product_variants pv ON ci.variant_id = pv.id
      WHERE ci.cart_id = ${cartId}
    `;

    res.json({ cartId, items });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Add item to cart
router.post('/items', authMiddleware, async (req, res) => {
  try {
    const { productId, variantId, quantity, price } = req.body;

    // Get or create cart
    let carts = await sql`SELECT id FROM cart WHERE user_id = ${req.user.id}`;
    let cartId;

    if (carts.length === 0) {
      const newCart = await sql`
        INSERT INTO cart (user_id) VALUES (${req.user.id}) RETURNING id
      `;
      cartId = newCart[0].id;
    } else {
      cartId = carts[0].id;
    }

    // Check if item already exists
    const existingItems = await sql`
      SELECT id, quantity FROM cart_items
      WHERE cart_id = ${cartId} AND product_id = ${productId}
      ${variantId ? sql`AND variant_id = ${variantId}` : sql`AND variant_id IS NULL`}
    `;

    if (existingItems.length > 0) {
      // Update quantity
      const newQuantity = existingItems[0].quantity + quantity;
      await sql`
        UPDATE cart_items
        SET quantity = ${newQuantity}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${existingItems[0].id}
      `;
    } else {
      // Add new item
      await sql`
        INSERT INTO cart_items (cart_id, product_id, variant_id, quantity, price)
        VALUES (${cartId}, ${productId}, ${variantId}, ${quantity}, ${price})
      `;
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// Update cart item quantity
router.put('/items/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    await sql`
      UPDATE cart_items
      SET quantity = ${quantity}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `;

    res.json({ success: true });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// Remove item from cart
router.delete('/items/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    await sql`DELETE FROM cart_items WHERE id = ${id}`;

    res.json({ success: true });
  } catch (error) {
    console.error('Remove cart item error:', error);
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
});

// Clear cart
router.delete('/', authMiddleware, async (req, res) => {
  try {
    const carts = await sql`SELECT id FROM cart WHERE user_id = ${req.user.id}`;
    
    if (carts.length > 0) {
      await sql`DELETE FROM cart_items WHERE cart_id = ${carts[0].id}`;
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

module.exports = router;
