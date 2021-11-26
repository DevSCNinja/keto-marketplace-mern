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
    shippingFee: req.body.shippingFee * 100,
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

router.post('/updateProduct/:id', fileUpload.fields([{ name: 'pictures' }]), async (req, res) => {
  let picturesUploaded = req.files["pictures"]
  let oldPictures = req.body.oldPictures.split(',')
  const productID = req.params.id
  const product = await Product.findById(productID)

  await stripe.products.update(
    product.stripeProductID,
    {
      name: req.body.name,
      description: req.body.description,
    }
  )

  const price = await stripe.prices.create({
    unit_amount: req.body.price * 100,
    currency: 'usd',
    product: product.stripeProductID,
  })

  let pictures = []

  if (oldPictures !== undefined) {
    oldPictures.forEach(picture => {
      pictures.push(picture)
    })
  }

  if (picturesUploaded !== undefined) {
    picturesUploaded.forEach(picture => {
      pictures.push(picture.filename)
    })
  }

  await Product.findByIdAndUpdate(productID, {
    name: req.body.name,
    price: req.body.price * 100,
    pictures: pictures,
    description: req.body.description,
    shippingFee: req.body.shippingFee * 100,
    stripePriceID: price.id
  }, { new: true })

  res.json({
    success: true
  })
})

router.delete('/deleteProduct/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)

  res.json({
    success: true
  })
})

module.exports = router