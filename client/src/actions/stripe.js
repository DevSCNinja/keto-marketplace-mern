import api from '../utils/api'

import {
  STRIPE_PUBKEY_LOADED,
  PAYMENT_INTENT_LOADED,
} from './types'

import { setPageIsLoading } from './admin'

export const getStripePubKey = () => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.get('/stripe/getStripePubKey')

  if (res.data.success) {
    dispatch({
      type: STRIPE_PUBKEY_LOADED,
      payload: res.data.stripePubKey
    })
    dispatch(setPageIsLoading(false))
  }
}

export const createPaymentIntent = formData => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.post('/stripe/createPaymentIntent', formData)

  if (res.data.success) {
    dispatch({
      type: PAYMENT_INTENT_LOADED,
      payload: res.data.clientSecret
    })
    dispatch(setPageIsLoading(false))
  }
}