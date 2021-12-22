import {
  ORDERS_LOADED,
  ORDER_ITEMS_LOADED,
  ORDER_LOADED,
} from '../actions/types'

const initialState = {
  orders: [],
  order: {},
  orderItems: []
}

const orderReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case ORDERS_LOADED: {
      return {
        ...state,
        orders: payload
      }
    }
    case ORDER_LOADED: {
      return {
        ...state,
        order: payload
      }
    }
    case ORDER_ITEMS_LOADED: {
      return {
        ...state,
        orderItems: payload
      }
    }
    default:
      return state
  }
}

export default orderReducer