const express = require('express');
const { protect } = require('../middleware/auth');
const { paymentValidator } = require('../validators');

const router = express.Router();

// @route   POST /api/payment/pay
// @desc    Process a mock payment
// @access  Private
router.post('/pay', protect, paymentValidator, async (req, res) => {
  try {
    const { amount, cardNumber, cardHolder } = req.body;

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulate success/failure (90% success rate)
    const isSuccess = Math.random() < 0.9;

    if (isSuccess) {
      const transactionId = `TXN-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`;

      res.json({
        success: true,
        message: 'Payment processed successfully',
        data: {
          transactionId,
          amount: parseFloat(amount),
          cardLast4: cardNumber.slice(-4),
          cardHolder: cardHolder || 'Customer',
          status: 'completed',
          paidAt: new Date().toISOString(),
        },
      });
    } else {
      res.status(402).json({
        success: false,
        message: 'Payment declined — insufficient funds (mock)',
        data: {
          status: 'declined',
          reason: 'insufficient_funds',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Payment processing error',
      error: error.message,
    });
  }
});

module.exports = router;
