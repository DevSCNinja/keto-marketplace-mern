import {
  CURRENT_PAGE_SET,
} from '../actions/types'

const initialState = {
  currentPage: 'dashboard',
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
    default:
      return state
  }
}

export default adminReducer