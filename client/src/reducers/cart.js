import {
  SET_CART_DATA,
  PRODUCT_ADDED_TO_CART,
  CART_LINE_REMOVED,
  CART_ALL_LINE_REMOVED
} from '../actions/types'

const initialState = {
  lines: [],
}

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_CART_DATA: {
      return {
        ...state,
        lines: payload
      }
    }
    case PRODUCT_ADDED_TO_CART: {
      let { product, quantity } = payload
      let line = state.lines.find(line => line.product._id === product._id)
      if (line !== undefined) {
        line.quantity += quantity
      } else {
        state.lines.push({ product: product, quantity: quantity })
      }
      localStorage.setItem("cart", JSON.stringify(state.lines))
      return {
        ...state
      }
    }
    case CART_LINE_REMOVED: {
      state.lines = state.lines.filter(line => line.product._id !== payload)
      localStorage.setItem("cart", JSON.stringify(state.lines))
      return {
        ...state,
      }
    }
    case CART_ALL_LINE_REMOVED: {
      state.lines = []
      localStorage.setItem('cart', JSON.stringify(state.lines))
      return {
        ...state,
      }
    }
    default:
      return state
  }
}

export default cartReducer