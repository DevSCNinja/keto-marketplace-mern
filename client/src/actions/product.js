import api from '../utils/api'

import {
  CATEGORIES_LOADED,
  CATEGORY_LOADED,
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

export const createCategory = (formData, history) => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.post('/product/createCategory', formData)

  if (res.data.success) {
    dispatch(getCategories())
    dispatch(setPageIsLoading(false))
    history.push('/categories')
  }
}

export const getCategories = () => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.get('/product/getCategories')

  if (res.data.success) {
    dispatch(setPageIsLoading(false))
    dispatch({
      type: CATEGORIES_LOADED,
      payload: res.data.categories
    })
  }
}

export const getCategory = categoryID => async dispatch => {
  const res = await api.get(`/product/getCategory/${categoryID}`)

  if (res.data.success) {
    dispatch({
      type: CATEGORY_LOADED,
      payload: res.data.category
    })
  }
}

export const updateCategory = (categoryID, formData, history) => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.post(`/product/updateCategory/${categoryID}`, formData)

  if (res.data.success) {
    dispatch(getCategories())
    dispatch(setPageIsLoading(false))
    history.push('/categories')
  }
}

export const deleteCategory = categoryID => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.delete(`/product/deleteCategory/${categoryID}`)

  if (res.data.success) {
    dispatch(getCategories())
    dispatch(setPageIsLoading(false))
  }
}

export const getCategoryProducts = categoryID => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.get(`/product/getCategoryProducts/${categoryID}`)

  if (res.data.success) {
    dispatch(setPageIsLoading(false))
    dispatch({
      type: PRODUCTS_LOADED,
      payload: res.data.products
    })
  }
}