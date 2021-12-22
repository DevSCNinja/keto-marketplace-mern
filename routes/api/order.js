const express = require('express')
const router = express.Router()
// const config = require('config')

// MODEL
const Order = require('../../models/Order')
const OrderItem = require('../../models/OrderItem')

router.post('/createOrder/:clientID', async (req, res) => {

  const client = req.params.clientID

  const {
    shippingFirstName,
    shippingLastName,
    shippingPhoneNumber,
    shippingEmail,
    shippingAddress,
    shippingCity,
    shippingState,
    shippingZipCode,
    billingNameOnCard,
    billingAddress,
    billingCity,
    billingState,
    billingZipCode,
    paymentIntent
  } = req.body.orderDetail

  const cartLines = req.body.cartLines

  let subTotal = 0, shippingFee = 0

  cartLines.forEach(line => {
    subTotal += line.product.price * line.quantity
    shippingFee += line.product.shippingFee * line.quantity
  })

  const newOrder = new Order({
    client,
    shippingFirstName,
    shippingLastName,
    shippingPhoneNumber,
    shippingEmail,
    shippingAddress,
    shippingCity,
    shippingState,
    shippingZipCode,
    billingNameOnCard,
    billingAddress,
    billingCity,
    billingState,
    billingZipCode,
    paymentIntent,
    subTotal,
    shippingFee
  })

  await newOrder.save()

  cartLines.forEach(async line => {
    let newOrderItem = new OrderItem({
      order: newOrder._id,
      productName: line.product.name,
      price: line.product.price,
      shippingFee: line.product.shippingFee,
      quantity: line.quantity,
      trackingNumber: ''
    })

    await newOrderItem.save()
  })

  res.json({
    success: true
  })
})

router.get('/getAllOrders', async (req, res) => {
  const orders = await Order.find()

  res.json({
    success: true,
    orders
  })
})

router.get('/getOrders/:clientID', async (req, res) => {
  const orders = await Order.find({ client: req.params.clientID })

  res.json({
    success: true,
    orders
  })
})

router.get('/getOrder/:orderID', async (req, res) => {
  const order = await Order.findById(req.params.orderID)

  res.json({
    success: true,
    order
  })
})

router.get('/updateOrder', async (req, res) => {

  res.json({
    success: true
  })
})

module.exports = router
