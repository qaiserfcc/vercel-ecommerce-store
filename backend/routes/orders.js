const express = require('express');
const { sql } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Create order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, shippingAddressId, discountCode } = req.body;

    // Calculate total
    let totalAmount = 0;
    items.forEach(item => {
      totalAmount += item.price * item.quantity;
    });

    // Apply discount if provided
    let discountAmount = 0;
    let discountId = null;

    if (discountCode) {
      const discounts = await sql`
        SELECT * FROM discounts
        WHERE code = ${discountCode}
        AND is_active = true
        AND (start_date IS NULL OR start_date <= CURRENT_TIMESTAMP)
        AND (end_date IS NULL OR end_date >= CURRENT_TIMESTAMP)
        AND (usage_limit IS NULL OR usage_count < usage_limit)
      `;

      if (discounts.length > 0) {
        const discount = discounts[0];
        
        if (totalAmount >= (discount.min_purchase_amount || 0)) {
          if (discount.discount_type === 'percentage') {
            discountAmount = (totalAmount * discount.discount_value) / 100;
            if (discount.max_discount_amount) {
              discountAmount = Math.min(discountAmount, discount.max_discount_amount);
            }
          } else if (discount.discount_type === 'fixed') {
            discountAmount = discount.discount_value;
          }
          
          discountId = discount.id;
          
          // Update usage count
          await sql`
            UPDATE discounts
            SET usage_count = usage_count + 1
            WHERE id = ${discount.id}
          `;
        }
      }
    }

    const finalAmount = totalAmount - discountAmount;

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${req.user.id}`;

    // Create order
    const orderResult = await sql`
      INSERT INTO orders (
        order_number, user_id, total_amount, discount_amount, 
        final_amount, shipping_address_id, discount_id
      )
      VALUES (
        ${orderNumber}, ${req.user.id}, ${totalAmount}, ${discountAmount},
        ${finalAmount}, ${shippingAddressId}, ${discountId}
      )
      RETURNING *
    `;

    const order = orderResult[0];

    // Create order items
    for (const item of items) {
      const subtotal = item.price * item.quantity;
      await sql`
        INSERT INTO order_items (
          order_id, product_id, variant_id, quantity, price, subtotal
        )
        VALUES (
          ${order.id}, ${item.productId}, ${item.variantId}, 
          ${item.quantity}, ${item.price}, ${subtotal}
        )
      `;
    }

    // Add initial tracking
    await sql`
      INSERT INTO order_tracking (order_id, status, notes)
      VALUES (${order.id}, 'pending', 'Order placed successfully')
    `;

    // Clear cart
    const carts = await sql`SELECT id FROM cart WHERE user_id = ${req.user.id}`;
    if (carts.length > 0) {
      await sql`DELETE FROM cart_items WHERE cart_id = ${carts[0].id}`;
    }

    res.json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get user orders
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await sql`
      SELECT o.*, a.address_line1, a.city, a.state, a.country
      FROM orders o
      LEFT JOIN addresses a ON o.shipping_address_id = a.id
      WHERE o.user_id = ${req.user.id}
      ORDER BY o.created_at DESC
    `;

    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get single order
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const orders = await sql`
      SELECT o.*, a.*,
             a.id as address_id, a.address_line1, a.address_line2, 
             a.city, a.state, a.postal_code, a.country
      FROM orders o
      LEFT JOIN addresses a ON o.shipping_address_id = a.id
      WHERE o.id = ${id} AND o.user_id = ${req.user.id}
    `;

    if (orders.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = orders[0];

    // Get order items
    const items = await sql`
      SELECT oi.*, p.name, p.slug,
             pv.variant_name,
             (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = true LIMIT 1) as image_url
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      LEFT JOIN product_variants pv ON oi.variant_id = pv.id
      WHERE oi.order_id = ${id}
    `;

    order.items = items;

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Get order tracking
router.get('/:id/tracking', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Verify order belongs to user
    const orders = await sql`
      SELECT id FROM orders WHERE id = ${id} AND user_id = ${req.user.id}
    `;

    if (orders.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const tracking = await sql`
      SELECT * FROM order_tracking
      WHERE order_id = ${id}
      ORDER BY created_at ASC
    `;

    res.json(tracking);
  } catch (error) {
    console.error('Get tracking error:', error);
    res.status(500).json({ error: 'Failed to fetch tracking' });
  }
});

module.exports = router;
