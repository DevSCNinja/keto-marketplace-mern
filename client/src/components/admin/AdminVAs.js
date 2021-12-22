import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAssistants, deleteAssistant } from '../../actions/admin'
import Spinner from '../layout/Spinner'

const AdminVAs = ({ getAssistants, assistants, isLoading, deleteAssistant }) => {

  React.useEffect(() => {
    getAssistants()
  }, [getAssistants])

  return (
    <div className='admin-assistants'>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='d-flex align-items-center pt-3'>
            <div className='font-36 mr-2'>Virtual Assistants</div>
            <Link to='create-assistant'><i className='fa fa-plus-circle font-24 cursor-pointer pt-2'></i></Link>
          </div>
        </div>
      </div>

      <div className='row my-3'>
        <div className='col-lg-12'>
          {isLoading ? <Spinner /> :
            <div className='table-responsive bg-white keto-rounded-lg keto-shadow'>
              <table className='table'>
                <thead className='thead-light'>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assistants.map((item, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        <Link to={`/edit-assistant/${item._id}`} className='btn bg-keto-secondary mr-1'>
                          <i className='fa fa-edit'></i>
                        </Link>
                        <button className='btn bg-keto-secondary' onClick={() => window.confirm('Are you sure?') ? deleteAssistant(item._id) : null}>
                          <i className='fa fa-trash-o'></i>
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  assistants: state.admin.assistants,
  isLoading: state.admin.pageIsLoading
})

export default connect(mapStateToProps, { getAssistants, deleteAssistant })(AdminVAs)