const express = require('express')
const router = express.Router()
const multer = require('multer')

// MODEL
const Product = require('../../models/Product')

// FILE UPLOAD
const fileUpload = require('../../utils/fileUpload')

router.post('/createProduct', fileUpload.fields([{ name: 'pictures' }]), async (req, res) => {
  let pictures = req.files["pictures"]

  console.log(pictures)

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

module.exports = router