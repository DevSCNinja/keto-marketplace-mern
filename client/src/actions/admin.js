import api from '../utils/api'
import { loadUser } from './auth'
import {
  CURRENT_PAGE_SET,
  SET_PAGE_LOADING,
  AFFILIATES_LOADED,
  ADMIN_LOADED,
  CUSTOMERS_LOADED,
  VENDORS_LOADED,
  VENDOR_LOADED,
  AFFILIATE_LOADED
} from './types'

export const setCurrentPage = currentPage => async dispatch => {
  dispatch({
    type: CURRENT_PAGE_SET,
    payload: currentPage
  })
}

export const setPageIsLoading = value => async dispatch => {
  dispatch({
    type: SET_PAGE_LOADING,
    payload: value
  })
}

export const getAffiliates = () => async dispatch => {
  const res = await api.get('/admin/getAffiliates')

  if (res.data.success) {
    dispatch({
      type: AFFILIATES_LOADED,
      payload: res.data.affiliates
    })
  }
}

export const getPendingAffililates = () => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.get('/admin/getPendingAffiliates')

  if (res.data.success) {
    dispatch({
      type: AFFILIATES_LOADED,
      payload: res.data.affiliates
    })
    dispatch(setPageIsLoading(false))
  }
}

export const getAffiliate = affiliateID => async dispatch => {
  const res = await api.get(`/admin/getAffiliate/${affiliateID}`)

  if (res.data.success) {
    dispatch({
      type: AFFILIATE_LOADED,
      payload: res.data.affiliate
    })
  }
}

export const approvePendingAffiliate = (history, affiliateID, assistantID) => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.get(`/admin/approvePendingAffiliate/?affiliateID=${affiliateID}&assistantID=${assistantID}`)

  if (res.data.success) {
    dispatch(getPendingAffililates())
    history.push('/affiliates-pending')
  }
}

export const updateConnectedAccount = (history, affiliateID) => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.get(`/users/updateAffiliateConnectedAccount/${affiliateID}`)

  if (res.data.success) {
    dispatch(getPendingAffililates())
    history.push('/affiliates-pending')
  }
}

export const deletePendingAffiliate = (history, affiliateID) => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.delete(`/admin/deletePendingAffiliate/${affiliateID}`)

  if (res.data.success) {
    dispatch(getPendingAffililates())
    history.push('/affiliates-pending')
  }
}

export const getAdmin = () => async dispatch => {
  const res = await api.get('/admin/getAdmin')

  if (res.data.success) {
    dispatch({
      type: ADMIN_LOADED,
      payload: res.data.admin
    })
  }
}

export const getCustomers = (affiliateID = 'admin') => async dispatch => {
  const res = await api.get(`/admin/getCustomers/${affiliateID}`)

  if (res.data.success) {
    dispatch({
      type: CUSTOMERS_LOADED,
      payload: res.data.customers
    })
  }
}

export const createAssistant = (formData, history) => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.post('/admin/createAssistant', formData)

  if (res.data.success) {
    dispatch(getAssistants())
    history.push('/assistants')
  }
}

export const getAssistants = () => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.get('/admin/getAssistants')

  if (res.data.success) {
    dispatch({
      type: VENDORS_LOADED,
      payload: res.data.assistants
    })
    dispatch(setPageIsLoading(false))
  }
}

export const getAssistant = assistantID => async dispatch => {
  const res = await api.get(`/admin/getAssistant/${assistantID}`)

  if (res.data.success) {
    dispatch({
      type: VENDOR_LOADED,
      payload: res.data.assistant
    })
  }
}

export const updateAssistant = (assistantID, formData, history) => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.post(`/admin/updateAssistant/${assistantID}`, formData)

  if (res.data.success) {
    dispatch(getAssistants())
    history.push('/assistants')
  }
}

export const deleteAssistant = assistantID => async dispatch => {
  dispatch(setPageIsLoading(true))
  const res = await api.delete(`/admin/deleteAssistant/${assistantID}`)

  if (res.data.success) {
    dispatch(getAssistants())
  }
}

export const dontShowAgain = (affiliateID) => async dispatch => {
  const res = await api.get(`/admin/dontShowAgain/${affiliateID}`)

  if (res.data.success) {
    dispatch(loadUser())
  }
}