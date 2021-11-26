import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import admin from './admin'
import product from './product'
import cart from './cart'

export default combineReducers({
  alert,
  auth,
  admin,
  product,
  cart
})
