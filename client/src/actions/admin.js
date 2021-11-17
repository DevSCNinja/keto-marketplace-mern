// import api from '../utils/api'
import {
  CURRENT_PAGE_SET
} from './types'

export const setCurrentPage = currentPage => async dispatch => {
  dispatch({
    type: CURRENT_PAGE_SET,
    payload: currentPage
  })
}