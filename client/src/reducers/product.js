import {
  PRODUCTS_LOADED,
  PRODUCT_LOADED
} from '../actions/types'

const initialState = {
  products: [],
  product: {
    name: '',
    price: 0,
    description: '',
    rate: 0,
    clicks: 0,
    conversion: 0,
    pictures: []
  }
}

const productReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case PRODUCTS_LOADED: {
      return {
        ...state,
        products: payload
      }
    }
    case PRODUCT_LOADED: {
      return {
        ...state,
        product: payload
      }
    }
    default:
      return state
  }
}

export default productReducer