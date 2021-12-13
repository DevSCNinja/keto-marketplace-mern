import React from 'react'
import { connect } from 'react-redux'
import { getCategory, updateCategory } from '../../actions/product'
import { useHistory } from 'react-router'
import Spinner from '../layout/Spinner'

const AdminCategoryEdit = ({ match, getCategory, updateCategory, isLoading, category }) => {
  const categoryID = match.params.id
  const history = useHistory()

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  React.useEffect(() => {
    getCategory(categoryID)
  }, [categoryID, getCategory])

  React.useEffect(() => {
    setName(category.name)
    setDescription(category.description)
  }, [category])

  const onSubmit = e => {
    e.preventDefault()
    updateCategory(categoryID, { name, description }, history)
  }

  return (
    <div className='admin-create-category'>
      <div className='font-36 pt-3'>Edit A Category</div>
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
                  <button className='btn bg-keto-primary' type='submit'>
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
  isLoading: state.admin.pageIsLoading,
  category: state.product.category,
})

export default connect(mapStateToProps, { getCategory, updateCategory })(AdminCategoryEdit)