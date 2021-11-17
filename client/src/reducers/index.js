import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import admin from './admin'

export default combineReducers({
  alert,
  auth,
  admin,
})
