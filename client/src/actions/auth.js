import api from '../utils/api'
import { setAlert } from './alert'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AFFILIATE_REGISTER_SUCCESS,
  PENDING_AFFILIATE_LOADED,
  UPDATE_AFFILIATE_CONNECTED_ACCOUNT,
} from './types'

// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/auth')

    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// Register User
export const register = formData => async dispatch => {
  try {
    const res = await api.post('/users', formData)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// Customer Register
export const clientRegister = formData => async dispatch => {
  try {
    const res = await api.post('/users/clientRegister', formData)
    console.log(res.data)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: REGISTER_FAIL
    })
  }
}

export const affiliateRegister = (formData, history) => async dispatch => {
  try {
    const res = await api.post('/users/affiliateRegister', formData)
    const affiliateID = res.data.pendingAffiliate._id
    localStorage.setItem('affiliateID', affiliateID)

    dispatch({
      type: AFFILIATE_REGISTER_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: REGISTER_FAIL
    })
    history.push('/dashboard')
  }
}

export const checkAffiliateEmail = (formData) => async dispatch => {
  const res = await api.post('/users/checkAffiliateEmail', formData)
  if (res.data.success) {
    if (res.data.isExist) {
      dispatch(setAlert(res.data.notification, 'danger'))
    }
    return res.data.isExist
  }
}

export const getPendingAffiliateByUserId = userID => async dispatch => {
  const res = await api.get(`/users/getPendingAffiliateByUserId/${userID}`)

  if (res.data.success) {
    dispatch({
      type: PENDING_AFFILIATE_LOADED,
      payload: res.data
    })
  }
}

export const updateAffiliateConnectedAccount = userID => async dispatch => {
  const res = await api.get(`/users/updateAffiliateConnectedAccount/${userID}`)
  if (res.data.success) {
    dispatch({
      type: UPDATE_AFFILIATE_CONNECTED_ACCOUNT,
      payload: res.data
    })
  }
}

// Login User
export const login = (email, password) => async dispatch => {
  const body = { email, password }

  try {
    const res = await api.post('/auth', body)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Forgot Password
export const forgotPassword = (email) => async dispatch => {
  try {
    const res = await api.get(`/auth/forgotPassword/${email}`)
    dispatch(setAlert(res.data.sent[0].msg, 'success'))
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

// Reset Password
export const resetPassword = (formData, history) => async dispatch => {
  try {
    const res = await api.post('/auth/resetPassword', formData)
    dispatch(setAlert(res.data.sent[0].msg, 'success'))
    history.push('/login')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

// Logout
export const logout = () => ({ type: LOGOUT })
