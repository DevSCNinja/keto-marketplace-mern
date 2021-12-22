import {
  CURRENT_PAGE_SET,
  SET_PAGE_LOADING,
  AFFILIATES_LOADED,
  ADMIN_LOADED,
  CUSTOMERS_LOADED,
  VENDORS_LOADED,
  VENDOR_LOADED,
  AFFILIATE_LOADED
} from '../actions/types'

const initialState = {
  currentPage: 'dashboard',
  baseURL: window.location.port ? 'http://' + window.location.hostname + ':5000/files/' : 'https://' + window.location.hostname + '/files/',
  pageIsLoading: false,
  affiliates: [],
  affiliate: {},
  admin: {},
  customers: [],
  assistants: [],
  assistant: {}
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
    case AFFILIATES_LOADED: {
      return {
        ...state,
        affiliates: payload
      }
    }
    case AFFILIATE_LOADED: {
      return {
        ...state,
        affiliate: payload
      }
    }
    case ADMIN_LOADED: {
      return {
        ...state,
        admin: payload
      }
    }
    case CUSTOMERS_LOADED: {
      return {
        ...state,
        customers: payload
      }
    }
    case VENDORS_LOADED: {
      return {
        ...state,
        assistants: payload
      }
    }
    case VENDOR_LOADED: {
      return {
        ...state,
        assistant: payload
      }
    }
    default:
      return state
  }
}

export default adminReducer