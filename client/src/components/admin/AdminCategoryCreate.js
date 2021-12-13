import React from 'react'
import { connect } from 'react-redux'
import { createCategory } from '../../actions/product'
import { useHistory } from 'react-router'
import Spinner from '../layout/Spinner'

const AdminCategoryCreate = ({ createCategory, isLoading }) => {
  const history = useHistory()

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const onSubmit = e => {
    e.preventDefault()
    createCategory({ name, description }, history)
  }

  return (
    <div className='admin-create-category'>
      <div className='font-36 pt-3'>Create A Category</div>
      <div className='row my-3'>
        <div className='col-md-12'>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            {isLoading ?
              <Spinner />
              : <form className='form' onSubmit={onSubmit}>
                <div className='form-group'>
                  <label>Category Name</label>
                  <input
                    type='text'
                    name='name'
                    className='form-control category-field'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label>Category Description</label>
                  <textarea
                    type='text'
                    name='description'
                    className='form-control'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className='d-flex justify-content-end'>
                  <button className='btn bg-keto-primary'>
                    Submit
                  </button>
                </div>
              </form>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isLoading: state.admin.pageIsLoading
})

export default connect(mapStateToProps, { createCategory })(AdminCategoryCreate)