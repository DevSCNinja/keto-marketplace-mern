import api from '../utils/api'

import {
  PRODUCTS_LOADED
} from './types'

export const createProduct = (formData, history) => async dispatch => {
  console.log(formData)
  const res = await api.post('/product/createProduct', formData)

  if (res.data.success) {
    dispatch(getProducts())
    history.push('/products')
  }
}

export const getProducts = () => async dispatch => {
  const res = await api.get('/product/getProducts')

  if (res.data.success) {
    dispatch({
      type: PRODUCTS_LOADED,
      payload: res.data.products
    })
  }
}
