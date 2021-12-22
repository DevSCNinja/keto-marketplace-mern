import {
  SET_CART_DATA,
  PRODUCT_ADDED_TO_CART,
  CART_LINE_REMOVED,
  CART_ALL_LINE_REMOVED
} from './types'

export const loadCartData = () => async dispatch => {
  let data = localStorage.getItem('cart')
  if (data != null) {
    dispatch({
      type: SET_CART_DATA,
      payload: JSON.parse(data)
    })
  }
}

export const addProductToCart = (product, quantity) => async dispatch => {
  dispatch({
    type: PRODUCT_ADDED_TO_CART,
    payload: { product, quantity }
  })
}

export const removeProductFromCart = productID => async dispatch => {
  dispatch({
    type: CART_LINE_REMOVED,
    payload: productID
  })
}

export const removeAllCartData = () => async dispatch => {
  dispatch({
    type: CART_ALL_LINE_REMOVED,
  })
}