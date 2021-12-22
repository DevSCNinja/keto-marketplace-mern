import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCourses, deleteCourse } from '../../actions/course'
import { useHistory } from 'react-router'

const AdminAcademy = ({ getCourses, deleteCourse, courses }) => {
  const history = useHistory()

  React.useEffect(() => {
    getCourses()
  }, [getCourses])

  return (
    <div className='client-dashboard'>

      <div className='row'>
        <div className='col-lg-6'>
          <div className='d-flex align-items-center pt-3'>
            <div className='font-36 mr-3'>Academy</div>
            <Link to='/academy-create' className='font-12 btn bg-keto-primary'>Create Course</Link>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='text-right pt-4'>
            <select
              type='text'
              className='search-filter'
            >
              <option>All</option>
              <option>Active</option>
              <option>Pending</option>
            </select>
            <input
              type='text'
              className='search-filter'
              placeholder='Search'
            />
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <div className='col-lg-12'>
          <div className='px-2 bg-white keto-rounded-lg keto-shadow'>
            {courses.map((item, index) =>
              <div
                className='row cursor-pointer'
                key={index}
                onClick={() => history.push(`/academy/${item._id}`)}
                style={{ backgroundColor: (index % 2 === 0 ? 'rgba(61, 189, 143, 0.06)' : '') }}
              >
                <div className='col-md-10'>
                  <div className='d-flex align-items-center py-2'>
                    <div className='px-2'>
                      <div className='font-21'>
                        {item.title}
                      </div>
                      <br />
                      <div className='font-12'>
                        {item.description}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-2 pt-2 text-right font-12'>
                  <button onClick={e => {
                    e.stopPropagation()
                    history.push(`/academy-edit/${item._id}`)
                  }} className='btn btn-sm btn-light'><i className='fa fa-gear cursor-pointer font-21'></i></button>
                  <button onClick={e => {
                    e.stopPropagation()
                    let confirmAnswer = window.confirm('Are you sure?')
                    if (confirmAnswer) deleteCourse(history, item._id)
                  }} className='btn btn-sm btn-light ml-2'><i className='fa fa-trash-o cursor-pointer font-21'></i></button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  courses: state.course.courses
})

export default connect(mapStateToProps, { getCourses, deleteCourse })(AdminAcademy)