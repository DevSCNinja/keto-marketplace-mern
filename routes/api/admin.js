const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')

// MODEL
const User = require('../../models/User')

// Mailgun Info
const mailgunApiKey = config.get('mailgun.mailgunApiKey')
const mailgunDomain = config.get('mailgun.domain')
var mailgun = require('mailgun-js')({ apiKey: mailgunApiKey, domain: mailgunDomain })

router.get('/getAffiliates', async (req, res) => {
  const affiliates = await User.find({ type: 'affiliate', status: 'active' })

  res.json({
    success: true,
    affiliates
  })
})

router.get('/getPendingAffiliates', async (req, res) => {
  const affiliates = await User.find({ status: 'inActive' })

  res.json({
    success: true,
    affiliates
  })
})

router.get('/getAffiliate/:id', async (req, res) => {
  const affiliate = await User.findById(req.params.id)

  res.json({
    success: true,
    affiliate
  })
})

router.get('/approvePendingAffiliate', async (req, res) => {
  const affiliate = await User.findById(req.query.affiliateID)

  await User.findByIdAndUpdate(req.query.affiliateID, {
    status: 'active',
    inActiveReason: '',
    passwordForUpdate: affiliate.passwordForUpdate,
    password: bcrypt.hashSync(affiliate.passwordForUpdate, 10),
    byAssistant: req.query.assistantID
  }, { new: true })

  var emailContentToAffiliate = {
    from: 'KETO <info@myketomarketplace.com>',
    to: affiliate.email,
    subject: 'Your Affiliateship Request Is Approved!',
    text: `
    Congratulations ${affiliate.name}! Your Partnership Request to KETO has been approved. 
    You can now login to https://myketomarketplace.com
    Your EMAIL is ${affiliate.email} and PASSWORD is ${affiliate.passwordForUpdate}. 
    KETO Team.
    `
  }

  mailgun.messages().send(emailContentToAffiliate, function (error, body) {
    console.log(body)
  })

  res.json({
    success: true
  })
})

router.delete('/deletePendingAffiliate/:id', async (req, res) => {
  const affiliateID = req.params.id
  const update = { status: 'deleted', inActiveReason: '' }
  const affiliate = await User.findByIdAndUpdate(affiliateID, update, { new: true })
  const adminID = (await User.findOne({ type: 'admin' }))._id
  const customers = await User.find({ affiliate: affiliateID })

  customers.forEach(async customer => {
    await User.findByIdAndUpdate(customer._id, { affiliate: adminID }, { new: true })
  })

  var emailContentToAffiliate = {
    from: 'KETO <info@myketomarketplace.com>',
    to: affiliate.email,
    subject: 'Your Account Is Deleted.',
    text: `Hi ${affiliate.name}. Your account on KETO has been deleted. If you have any questions, contact HERE. KETO Team.`
  }

  mailgun.messages().send(emailContentToAffiliate, function (error, body) {
    console.log(body)
  })

  res.json({
    success: true
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

router.post('/createAssistant', async (req, res) => {
  let newAssistant = new User({ ...req.body })
  newAssistant.type = 'assistant'
  newAssistant.passwordForUpdate = req.body.password
  newAssistant.password = bcrypt.hashSync(req.body.password, 10)
  await newAssistant.save()

  res.json({
    success: true
  })
})

router.get('/getAssistants', async (req, res) => {
  const assistants = await User.find({ type: 'assistant' })

  res.json({
    success: true,
    assistants
  })
})

router.get('/getAssistant/:id', async (req, res) => {
  const assistant = await User.findById(req.params.id)

  res.json({
    success: true,
    assistant
  })
})

router.post('/updateAssistant/:id', async (req, res) => {
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

router.delete('/deleteAssistant/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id)

  res.json({
    success: true
  })
})

router.get('/dontShowAgain/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { videoSeen: true })

  res.json({
    success: true
  })
})

module.exports = router