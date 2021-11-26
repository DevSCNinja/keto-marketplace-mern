const express = require('express')
const router = express.Router()

// MODEL
const Product = require('../../models/Product')

// FILE UPLOAD
const fileUpload = require('../../utils/fileUpload')

router.post('/createProduct', fileUpload.fields([{ name: 'pictures' }]), async (req, res) => {
  let picturesUploaded = req.files["pictures"]

  let pictures = []
  picturesUploaded.forEach(picture => {
    pictures.push(picture.filename)
  })

  let newPicture = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    pictures: pictures,
  })

  await newPicture.save()

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

module.exports = router