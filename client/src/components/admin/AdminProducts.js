import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactStars from "react-rating-stars-component"
import { getProducts, getCategories, getCategoryProducts, deleteProduct } from '../../actions/product'
import Spinner from '../layout/Spinner'

const AdminProducts = ({ getProducts, products, getCategories, categories, getCategoryProducts, baseURL, isLoading, deleteProduct }) => {

  const [category, setCategory] = React.useState('all')
  const [showProducts, setShowProducts] = React.useState([])
  const [searchKey, setSearchKey] = React.useState('')

  React.useEffect(() => {
    setSearchKey('')
    if (category === 'all')
      getProducts()
    else
      getCategoryProducts(category)
  }, [getCategoryProducts, getProducts, category])

  React.useEffect(() => {
    getProducts()
    getCategories()
  }, [getProducts, getCategories])

  React.useEffect(() => {
    setShowProducts(products)
  }, [products])

  React.useEffect(() => {
    let tempProducts = products.filter(product => product.name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1)
    setShowProducts(tempProducts)
  }, [searchKey, products])

  return (
    <div className='admin-products'>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='d-flex align-items-center pt-3'>
            <div className='font-36 mr-2'>Products</div>
            <Link to='create-product'><i className='fa fa-plus-circle font-24 cursor-pointer pt-2'></i></Link>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='text-right pt-4'>
            <select
              type='text'
              className='search-filter'
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value='all'>All</option>
              {categories.map((item, index) =>
                <option key={index} value={item._id}>{item.name}</option>
              )}
            </select>
            <input
              type='text'
              className='search-filter'
              placeholder='Search'
              name='searchKey'
              value={searchKey}
              onChange={e => setSearchKey(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className='row my-3'>
        <div className='col-lg-12'>
          {isLoading ?
            <Spinner />
            : showProducts.map((item, index) =>
              <div key={index} className='row mx-1 bg-white my-2 keto-rounded-lg keto-shadow d-flex align-items-center'>
                <div className='col-lg-6 py-2'>
                  <div className='d-flex align-items-center'>
                    <div>
                      <img src={baseURL + item.pictures[0]} alt='SETIMG' width='100px' height='70px' className='product-image-border' />
                    </div>
                    <div className='px-2'>
                      <div className='font-18'>
                        {item.name}
                      </div>
                      <ReactStars
                        value={item.rate}
                        size={24}
                        isHalf={true}
                        edit={false}
                        activeColor="#3DBD8F"
                      />
                    </div>
                  </div>
                </div>
                <div className='col-lg-6 py-2'>
                  <table className='table table-borderless'>
                    <thead className='color-keto-primary'>
                      <tr>
                        <th>Clicks</th>
                        <th>Conversion</th>
                        <th>Total Sales</th>
                        <th>Price</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{item.clicks}</td>
                        <td>{item.conversion}%</td>
                        <td>$0</td>
                        <td>${item.price / 100}</td>
                        <td>
                          <Link to={`/edit-product/${item._id}`} className='btn bg-keto-secondary mr-1'>
                            <i className='fa fa-edit'></i>
                          </Link>
                          <button className='btn bg-keto-secondary' onClick={() => window.confirm('Are you sure?') ? deleteProduct(item._id) : null}>
                            <i className='fa fa-trash-o'></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  products: state.product.products,
  categories: state.product.categories,
  baseURL: state.admin.baseURL,
  isLoading: state.admin.pageIsLoading
})

export default connect(mapStateToProps, { getProducts, getCategories, getCategoryProducts, deleteProduct })(AdminProducts)