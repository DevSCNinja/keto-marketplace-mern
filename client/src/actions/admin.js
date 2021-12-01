import api from '../utils/api'
import {
  CURRENT_PAGE_SET,
  SET_PAGE_LOADING,
  AFFILIATES_LOADED,
  ADMIN_LOADED
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

export const getAdmin = () => async dispatch => {
  const res = await api.get('/admin/getAdmin')

  if (res.data.success) {
    dispatch({
      type: ADMIN_LOADED,
      payload: res.data.admin
    })
  }
}