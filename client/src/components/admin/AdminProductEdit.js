import React from 'react'
import { connect } from 'react-redux'
import { getProduct, getCategories, updateProduct } from '../../actions/product'
import { useHistory } from 'react-router'
import Spinner from '../layout/Spinner'
import getVendors from '../../utils/getVendors'

const AdminProductEdit = ({ match, getProduct, getCategories, categories, updateProduct, isLoading, product, baseURL }) => {
  const productID = match.params.id
  const history = useHistory()
  const vendors = getVendors()

  const [name, setName] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [vendor, setVendor] = React.useState('')
  const [price, setPrice] = React.useState(1)
  const [description, setDescription] = React.useState('')
  const [shippingFee, setShippingFee] = React.useState(1)
  const [pictures, setPictures] = React.useState([])
  const [oldPictures, setOldPictures] = React.useState([])
  const inputRef = React.useRef()

  React.useEffect(() => {
    getCategories()
    getProduct(productID)
  }, [productID, getProduct, getCategories])

  React.useEffect(() => {
    setName(product.name)
    setCategory(product.category)
    setVendor(product.vendor)
    setPrice(product.price / 100)
    setDescription(product.description)
    setShippingFee(product.shippingFee / 100)
    setOldPictures(product.pictures)
  }, [product])

  const removeOldProduct = item => {
    setOldPictures(oldPictures.filter(element => element !== item))
  }

  const removeProduct = item => {
    setPictures(pictures.filter(element => element !== item))
  }

  const fileSelectedHandler = e => {
    let newPictures = [...e.target.files]
    let addedPictures = []
    newPictures.forEach(picture1 => {
      var count = 0
      pictures.forEach(picture2 => {
        if (picture1.name === picture2.name) {
          alert('There is only a file(files) in files you selected. That will be ignored!')
          count++
        }
      })
      if (count === 0) addedPictures.push(picture1)
    })
    let picturesAdded = [...pictures, ...addedPictures]
    setPictures(picturesAdded)
  }

  const onSubmit = e => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('name', name)
    formData.append('category', category)
    formData.append('vendor', vendor)
    formData.append('price', price)
    formData.append('shippingFee', shippingFee)
    formData.append('oldPictures', oldPictures)
    pictures.forEach(picture => {
      formData.append('pictures', picture)
    })
    formData.append('description', description)
    if (pictures.length || oldPictures.length) {
      updateProduct(productID, formData, history)
    } else {
      alert("You didn't pick the images.")
    }
  }

  return (
    <div className='admin-create-product'>
      <div className='font-36 pt-3'>Edit A Product</div>
      <div className='row my-3'>
        <div className='col-md-12'>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            {isLoading ?
              <Spinner />
              : <form className='form' onSubmit={onSubmit}>
                <div className='form-group'>
                  <label>Product Name</label>
                  <input
                    type='text'
                    name='name'
                    className='form-control product-field'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label>Product Category</label>
                  <select
                    name='category'
                    className='form-control product-field'
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    required
                  >
                    <option value=''>SELECT</option>
                    {categories.map((item, index) =>
                      <option key={index} value={item._id}>{item.name}</option>
                    )}
                  </select>
                </div>
                <div className='form-group'>
                  <label>Vendor</label>
                  <select
                    name='vendor'
                    className='form-control product-field'
                    value={vendor}
                    onChange={e => setVendor(e.target.value)}
                    required
                  >
                    <option value=''>SELECT</option>
                    {vendors.map((item, index) =>
                      <option key={index} value={item}>{item}</option>
                    )}
                  </select>
                </div>
                <div className='form-group'>
                  <label>Product Price</label>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text product-field">$</span>
                    </div>
                    <input
                      type='number'
                      name='price'
                      className='form-control product-field'
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label>Shipping Fee</label>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text product-field">$</span>
                    </div>
                    <input
                      type='number'
                      name='shippingFee'
                      className='form-control product-field'
                      value={shippingFee}
                      onChange={e => setShippingFee(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label>Product Picture</label>
                  <input
                    type='button'
                    className='form-control product-field'
                    onClick={() => inputRef.current.click()}
                    value={'Select Pictures'}
                  />
                  <input
                    type='file'
                    accept='image/*'
                    multiple
                    className='file'
                    name='pictures'
                    onChange={fileSelectedHandler}
                    ref={inputRef}
                  /><span>{pictures.length} files selected.</span>
                </div>
                <div className='pb-2'>
                  {oldPictures.map((item, index) =>
                    <span className='mr-1' key={index}>
                      <img alt='SETIMAGE' src={baseURL + item} width='50px' height='35px' />
                      <button className='btn btn-sm bg-keto-secondary' onClick={e => {
                        e.preventDefault()
                        removeOldProduct(item)
                      }}><i className='fa fa-remove'></i></button>
                    </span>
                  )}
                  {pictures.map((item, index) =>
                    <span className='mr-1' key={index}>
                      <img alt='SETIMAGE' src={URL.createObjectURL(item)} width='50px' height='35px' />
                      <button className='btn btn-sm bg-keto-secondary' onClick={e => {
                        e.preventDefault()
                        removeProduct(item)
                      }}><i className='fa fa-remove'></i></button>
                    </span>
                  )}
                </div>
                <div className='form-group'>
                  <label>Product Description</label>
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
  product: state.product.product,
  categories: state.product.categories,
  baseURL: state.admin.baseURL
})

export default connect(mapStateToProps, { getProduct, getCategories, updateProduct })(AdminProductEdit)