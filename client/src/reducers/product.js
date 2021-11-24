import {
  PRODUCTS_LOADED,
} from '../actions/types'

const initialState = {
  products: [],
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
    default:
      return state
  }
}

export default productReducer