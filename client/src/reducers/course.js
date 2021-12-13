import {
  COURSES_LOADED,
  COURSE_LOADED,
} from '../actions/types'

const initialState = {
  courses: [],
  course: {
    title: '',
    description: '',
    video: null
  }
}

const courseReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case COURSES_LOADED:
      return {
        ...state,
        courses: payload
      }
    case COURSE_LOADED:
      return {
        ...state,
        course: payload
      }
    default:
      return state
  }
}

export default courseReducer