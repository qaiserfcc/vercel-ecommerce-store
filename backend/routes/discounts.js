const express = require('express');
const { sql } = require('../config/database');

const router = express.Router();

// Get active discounts
router.get('/', async (req, res) => {
  try {
    const discounts = await sql`
      SELECT * FROM discounts
      WHERE is_active = true
      AND (start_date IS NULL OR start_date <= CURRENT_TIMESTAMP)
      AND (end_date IS NULL OR end_date >= CURRENT_TIMESTAMP)
      ORDER BY created_at DESC
    `;

    res.json(discounts);
  } catch (error) {
    console.error('Get discounts error:', error);
    res.status(500).json({ error: 'Failed to fetch discounts' });
  }
});

// Validate discount code
router.post('/validate', async (req, res) => {
  try {
    const { code, cartTotal } = req.body;

    const discounts = await sql`
      SELECT * FROM discounts
      WHERE code = ${code}
      AND is_active = true
      AND (start_date IS NULL OR start_date <= CURRENT_TIMESTAMP)
      AND (end_date IS NULL OR end_date >= CURRENT_TIMESTAMP)
      AND (usage_limit IS NULL OR usage_count < usage_limit)
    `;

    if (discounts.length === 0) {
      return res.status(404).json({ error: 'Invalid or expired discount code' });
    }

    const discount = discounts[0];

    if (cartTotal < (discount.min_purchase_amount || 0)) {
      return res.status(400).json({ 
        error: `Minimum purchase amount of $${discount.min_purchase_amount} required` 
      });
    }

    let discountAmount = 0;
    if (discount.discount_type === 'percentage') {
      discountAmount = (cartTotal * discount.discount_value) / 100;
      if (discount.max_discount_amount) {
        discountAmount = Math.min(discountAmount, discount.max_discount_amount);
      }
    } else if (discount.discount_type === 'fixed') {
      discountAmount = discount.discount_value;
    }

    res.json({
      discount,
      discountAmount,
      finalAmount: cartTotal - discountAmount
    });
  } catch (error) {
    console.error('Validate discount error:', error);
    res.status(500).json({ error: 'Failed to validate discount' });
  }
});

module.exports = router;
