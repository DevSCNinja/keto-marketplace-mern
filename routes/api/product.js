const express = require('express')
const router = express.Router()
const config = require('config')

// MODEL
const Product = require('../../models/Product')

// FILE UPLOAD
const fileUpload = require('../../utils/fileUpload')

// Stripe Info
const secret_key = config.get('stripe.secret_key')
const publishable_key = config.get('stripe.publishable_key')
const stripe = require('stripe')(secret_key)

router.post('/createProduct', fileUpload.fields([{ name: 'pictures' }]), async (req, res) => {
  let picturesUploaded = req.files["pictures"]

  let pictures = []
  picturesUploaded.forEach(picture => {
    pictures.push(picture.filename)
  })

  const product = await stripe.products.create({
    name: req.body.name,
    description: req.body.description,
  })

  const price = await stripe.prices.create({
    unit_amount: req.body.price * 100,
    currency: 'usd',
    product: product.id,
  })

  let newProduct = new Product({
    name: req.body.name,
    price: req.body.price * 100,
    description: req.body.description,
    pictures: pictures,
    stripeProductID: product.id,
    stripePriceID: price.id,
  })

  await newProduct.save()

  res.json({
    success: true
  })
})

router.get('/getProducts', async (req, res) => {
  await Product.deleteMany()

  const products = await Product.find()

  res.json({
    success: true,
    products
  })
})

router.get('/getProduct/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)

  res.json({
    success: true,
    product
  })
})

module.exports = router