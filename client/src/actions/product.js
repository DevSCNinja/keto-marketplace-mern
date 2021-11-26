import api from '../utils/api'

import {
  PRODUCTS_LOADED,
  PRODUCT_LOADED
} from './types'

import { setPageIsLoading } from './admin'

export const createProduct = (formData, history) => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.post('/product/createProduct', formData)

  if (res.data.success) {
    dispatch(getProducts())
    dispatch(setPageIsLoading(false))
    history.push('/products')
  }
}

export const getProducts = () => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.get('/product/getProducts')

  if (res.data.success) {
    dispatch(setPageIsLoading(false))
    dispatch({
      type: PRODUCTS_LOADED,
      payload: res.data.products
    })
  }
}

export const getProduct = productID => async dispatch => {
  const res = await api.get(`/product/getProduct/${productID}`)

  if (res.data.success) {
    dispatch({
      type: PRODUCT_LOADED,
      payload: res.data.product
    })
  }
}

export const updateProduct = (productID, formData, history) => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.post(`/product/updateProduct/${productID}`, formData)

  if (res.data.success) {
    dispatch(getProducts())
    dispatch(setPageIsLoading(false))
    history.push('/products')
  }
}

export const deleteProduct = productID => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.delete(`/product/deleteProduct/${productID}`)

  if (res.data.success) {
    dispatch(getProducts())
    dispatch(setPageIsLoading(false))
  }
}