import {
  CURRENT_PAGE_SET,
  SET_PAGE_LOADING,
} from '../actions/types'

const initialState = {
  currentPage: 'dashboard',
  baseURL: window.location.port ? 'http://' + window.location.hostname + ':5000/files/' : 'https://' + window.location.hostname + '/files/',
  pageIsLoading: false
}

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case CURRENT_PAGE_SET: {
      return {
        ...state,
        currentPage: payload
      }
    }
    case SET_PAGE_LOADING: {
      return {
        ...state,
        pageIsLoading: payload
      }
    }
    default:
      return state
  }
}

export default adminReducer