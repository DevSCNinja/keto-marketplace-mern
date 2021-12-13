import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories, deleteCategory } from '../../actions/product'
import Spinner from '../layout/Spinner'

const AdminCategories = ({ getCategories, categories, isLoading, deleteCategory }) => {

  React.useEffect(() => {
    getCategories()
  }, [getCategories])

  return (
    <div className='admin-categories'>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='d-flex align-items-center pt-3'>
            <div className='font-36 mr-2'>Categories</div>
            <Link to='create-category'><i className='fa fa-plus-circle font-24 cursor-pointer pt-2'></i></Link>
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
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((item, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>
                        <Link to={`/edit-category/${item._id}`} className='btn bg-keto-secondary mr-1'>
                          <i className='fa fa-edit'></i>
                        </Link>
                        <button className='btn bg-keto-secondary' onClick={() => window.confirm('Are you sure?') ? deleteCategory(item._id) : null}>
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
  categories: state.product.categories,
  isLoading: state.admin.pageIsLoading
})

export default connect(mapStateToProps, { getCategories, deleteCategory })(AdminCategories)