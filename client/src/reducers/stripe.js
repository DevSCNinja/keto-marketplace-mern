import {
  STRIPE_PUBKEY_LOADED,
  PAYMENT_INTENT_LOADED,
} from '../actions/types'

const initialState = {
  stripePubKey: null,
  clientSecret: null,
  returnUrl: window.location.port ? 'http://' + window.location.hostname + ':3000/dashboard/checkout' : 'https://' + window.location.hostname + '/dashboard/checkout'
}

const stripeReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case STRIPE_PUBKEY_LOADED: {
      return {
        ...state,
        stripePubKey: payload
      }
    }
    case PAYMENT_INTENT_LOADED: {
      return {
        ...state,
        clientSecret: payload
      }
    }
    default:
      return state
  }
}

export default stripeReducer