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

module.exports = router