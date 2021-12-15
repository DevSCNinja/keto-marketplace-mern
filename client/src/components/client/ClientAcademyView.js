import React from 'react'
import { connect } from 'react-redux'
import { getCourseByID } from '../../actions/course'
import Vimeo from '@u-wave/react-vimeo'

const ClientAcademyView = ({ match, getCourseByID, course }) => {
  const courseID = match.params.id

  React.useEffect(() => {
    getCourseByID(courseID)
  }, [getCourseByID, courseID])

  return (
    <div>
      <div>
        <div className='font-36 pt-3'>Academy / {course.title}</div>
      </div>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            <p className='course-description'>{course.description}</p>
            <div className="text-center">
              {course.video === null ? null
                :
                <Vimeo
                  video={course.video}
                  responsive={true}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  course: state.course.course
})

export default connect(mapStateToProps, { getCourseByID })(ClientAcademyView)