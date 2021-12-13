const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

// MODEL
const User = require('../../models/User')

router.get('/getAffiliates', async (req, res) => {
  const affiliates = await User.find({ type: 'affiliate' })

  res.json({
    success: true,
    affiliates
  })
})

router.get('/getAdmin', async (req, res) => {
  const admin = await User.findOne({ type: 'admin' })

  res.json({
    success: true,
    admin
  })
})

router.get('/getCustomers/:affiliateID', async (req, res) => {
  const affiliateID = req.params.affiliateID
  let customers = []
  if (affiliateID === 'admin') {
    customers = await User.find({ type: 'client' })
  } else {
    customers = await User.find({ type: 'client' })
  }

  res.json({
    success: true,
    customers
  })
})

router.post('/createVendor', async (req, res) => {
  let newVendor = new User({ ...req.body })
  newVendor.type = 'vendor'
  newVendor.passwordForUpdate = req.body.password,
    newVendor.password = bcrypt.hashSync(req.body.password, 10),
    await newVendor.save()

  res.json({
    success: true
  })
})

router.get('/getVendors', async (req, res) => {
  const vendors = await User.find({ type: 'vendor' })

  res.json({
    success: true,
    vendors
  })
})

router.get('/getVendor/:id', async (req, res) => {
  const vendor = await User.findById(req.params.id)

  res.json({
    success: true,
    vendor
  })
})

router.post('/updateVendor/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    passwordForUpdate: req.body.password,
    password: bcrypt.hashSync(req.body.password, 10),
  })

  res.json({
    success: true
  })
})

router.delete('/deleteVendor/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id)

  res.json({
    success: true
  })
})

module.exports = router