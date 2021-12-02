import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { getCourseByID, updateCourse } from '../../actions/course'

const AdminAcademyEdit = ({ match, getCourseByID, course, updateCourse }) => {
  const history = useHistory()
  const courseID = match.params.id

  React.useEffect(() => {
    getCourseByID(courseID)
  }, [getCourseByID, courseID])

  React.useEffect(() => {
    setFormData(course)
  }, [course])

  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    video: ''
  })

  const { title, description, video } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    updateCourse(history, courseID, formData)
  }

  return (
    <div className='new-course-page'>
      <div>
        <div className='font-36 pt-3'>Edit Course</div>
      </div>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            <form className='form' onSubmit={onSubmit}>
              <div className='form-group'>
                <label className='manual-shadow'>Course Title</label>
                <input
                  type='text'
                  className='form-control manual-input'
                  name='title'
                  value={title}
                  onChange={onChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label className='manual-shadow'>Description</label>
                <textarea
                  type='text'
                  className='form-control manual-input'
                  name='description'
                  rows={7}
                  value={description}
                  onChange={onChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label className='manual-shadow'>Video Link (Vimeo)</label>
                <input
                  type='text'
                  className='form-control manual-input'
                  name='video'
                  value={video}
                  onChange={onChange}
                  required
                />
              </div>
              <div className='text-center mt-5'>
                <button type='submit' className='btn px-5 bg-keto-primary'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  course: state.course.course
})

export default connect(mapStateToProps, { getCourseByID, updateCourse })(AdminAcademyEdit)