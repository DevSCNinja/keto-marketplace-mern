const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  // ADDED
  type: {
    type: String
  },
  passwordForUpdate: {
    type: String
  },
  // CLIENT
  affiliate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  // AFFILIATE
  brand: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  bringTo: {
    type: String
  },
  instagram: {
    type: String
  },
  facebook: {
    type: String
  },
  twitter: {
    type: String
  },
  status: {
    type: String
  },
  byAssistant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  inActiveReason: {
    type: String
  },
  connectedAccountStatus: {
    type: String
  },
  mailSent: {
    type: Boolean
  },
  stripeConnectedAccount: {
    type: String
  },
  videoSeen: {
    type: Boolean,
    default: false
  },
});

module.exports = mongoose.model('user', UserSchema);
