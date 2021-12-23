import api from '../utils/api'

import {
  ORDERS_LOADED,
  ORDER_ITEMS_LOADED,
  ORDER_LOADED,
} from './types'

import { setPageIsLoading } from './admin'

export const createOrder = (order, clientID, history) => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.post(`/order/createOrder/${clientID}`, order)

  if (res.data.success) {
    dispatch(setPageIsLoading(false))
    history.push('/thanks')
  }
}

export const getAllOrders = () => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.get('/order/getAllOrders')

  if (res.data.success) {
    dispatch({
      type: ORDERS_LOADED,
      payload: res.data.orders
    })
    dispatch(setPageIsLoading(false))
  }
}

export const getAllOpenedOrders = () => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.get('/order/getAllOpenedOrders')

  if (res.data.success) {
    dispatch({
      type: ORDERS_LOADED,
      payload: res.data.orders
    })
    dispatch(setPageIsLoading(false))
  }
}

export const getAllInfulfillmentOrders = () => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.get('/order/getAllInfulfillmentOrders')

  if (res.data.success) {
    dispatch({
      type: ORDERS_LOADED,
      payload: res.data.orders
    })
    dispatch(setPageIsLoading(false))
  }
}

export const getAllClosedOrders = () => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.get('/order/getAllClosedOrders')

  if (res.data.success) {
    dispatch({
      type: ORDERS_LOADED,
      payload: res.data.orders
    })
    dispatch(setPageIsLoading(false))
  }
}

export const getOrders = clientID => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.get(`/order/getOrders/${clientID}`)

  if (res.data.success) {
    dispatch({
      type: ORDERS_LOADED,
      payload: res.data.orders
    })
    dispatch(setPageIsLoading(false))
  }
}

export const getOrder = orderID => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.get(`/order/getOrder/${orderID}`)

  if (res.data.success) {
    dispatch({
      type: ORDER_LOADED,
      payload: res.data.order
    })
    dispatch(setPageIsLoading(false))
  }
}

export const getOrderItems = orderID => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.get(`/order/getOrderItems/${orderID}`)

  if (res.data.success) {
    dispatch({
      type: ORDER_ITEMS_LOADED,
      payload: res.data.orderItems
    })
    dispatch(setPageIsLoading(false))
  }
}

export const updateOrder = (order, history) => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.post('/order/updateOrder', order)

  if (res.data.success) {
    dispatch(setPageIsLoading(false))
    history.push('/orders')
  }
}

export const addTrackingNumber = (formData, orderID) => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.post('/order/addTrackingNumber', formData)
  if (res.data.success) {
    dispatch(getOrderItems(orderID))
    dispatch(setPageIsLoading(false))
  }
}

export const setOrderStatus = (status, orderID) => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.post('/order/setOrderStatus', { orderID, status })
  if (res.data.success) {
    dispatch(getOrder(orderID))
    dispatch(setPageIsLoading(false))
  }
}