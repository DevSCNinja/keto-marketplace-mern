const express = require('express')
const router = express.Router()
const config = require('config')

// Stripe Info
const secret_key = config.get('stripe.secret_key')
const publishable_key = config.get('stripe.publishable_key')
const stripe = require('stripe')(secret_key)

router.get('/getStripePubKey', async (req, res) => {
  res.json({
    success: true,
    stripePubKey: publishable_key
  })
})

router.post('/createPaymentIntent', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.price,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  })

  res.json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  })
})

module.exports = router
