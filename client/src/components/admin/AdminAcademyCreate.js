import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { addNewCourse } from '../../actions/course'

const AdminAcademyCreate = ({ addNewCourse }) => {
  const history = useHistory()

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
    addNewCourse(history, formData)
  }

  return (
    <div className='admin-academy-create'>
      <div>
        <div className='font-36 pt-3'>New Course</div>
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

})

export default connect(mapStateToProps, { addNewCourse })(AdminAcademyCreate)