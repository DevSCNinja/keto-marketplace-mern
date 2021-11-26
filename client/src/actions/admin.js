// import api from '../utils/api'
import {
  CURRENT_PAGE_SET,
  SET_PAGE_LOADING
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