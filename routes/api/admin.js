const express = require('express')
const router = express.Router()

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
    customers = await User.find({type: 'client'})
  } else {
    customers = await User.find({type: 'client'})
  }

  res.json({
    success: true,
    customers
  })
})

module.exports = router