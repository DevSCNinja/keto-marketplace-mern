import api from '../utils/api'
import { setAlert } from './alert'
import {
  COURSES_LOADED,
  COURSE_LOADED,
} from './types'

export const addNewCourse = (history, formData) => async dispatch => {
  const res = await api.post('/course/addNewCourse', formData)

  if (res.data.success) {
    dispatch(getCourses())
    dispatch(setAlert('New Course Saved Successfully!', 'success'))
    history.push('/academy')
  }
} 

export const getCourses = () => async dispatch => {
  const res = await api.get('/course/getCourses')

  if (res.data.success) {
    dispatch({
      type: COURSES_LOADED,
      payload: res.data.courses
    })
  }
}

export const getCourseByID = courseID => async dispatch => {
  const res = await api.get(`/course/getCourse/${courseID}`)

  if (res.data.success) {
    dispatch({
      type: COURSE_LOADED,
      payload: res.data.course
    })
  }
}

export const updateCourse = (history, courseID, formData) => async dispatch => {
  const res = await api.post(`/course/updateCourse/${courseID}`, formData)

  if (res.data.success) {
    dispatch(getCourses())
    dispatch(setAlert('Course Is Updated Successfully!', 'success'))
    history.push('/academy')
  }
}

export const deleteCourse = (history, courseID) => async dispatch => {
  const res = await api.delete(`/course/deleteCourse/${courseID}`)

  if (res.data.success) {
    dispatch(getCourses())
    dispatch(setAlert('Course Is Deleted!', 'success'))
    history.push('/academy')
  }
}