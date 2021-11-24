import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import admin from './admin'
import product from './product'

export default combineReducers({
  alert,
  auth,
  admin,
  product,
})
