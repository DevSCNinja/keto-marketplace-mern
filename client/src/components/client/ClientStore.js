import React from 'react'
import { connect } from 'react-redux'
import { getProducts, getCategories, getCategoryProducts } from '../../actions/product'
import Spinner from '../layout/Spinner'
import { useHistory } from 'react-router'
import Star from '../layout/Stars'

const ClientStore = ({ getProducts, products, getCategories, categories, getCategoryProducts, baseURL, isLoading }) => {
  const history = useHistory()

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
    <div className='client-dashboard'>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='d-flex align-items-center pt-3'>
            <div className='font-36 mr-2'>Store</div>
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

      <div className='row'>
        {isLoading ?
          <Spinner />
          : showProducts.map((item, index) =>
            <div key={index} onClick={() => history.push(`product/${item._id}`)} className='col-lg-3 col-md-6 my-3 cursor-pointer'>
              <div className='bg-white keto-shadow'>
                <img src={baseURL + item.pictures[0]} alt='SETIMG' className='store-image' />
                <div className='p-2'>
                  <div className='font-24 font-bold'>
                    {item.name.slice(0, 20)} {item.name.length > 20 ? '...' : null}
                  </div>
                  <Star rate={item.rate} />
                  <div className='font-15 height-50'>
                    {item.description.slice(0, 50)} {item.description.length > 50 ? '...' : null}
                  </div>
                  <div className='font-18 font-bold color-keto-primary pt-1'>
                    ${item.price / 100}
                  </div>
                </div>
              </div>
            </div>
          )}
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

export default connect(mapStateToProps, { getProducts, getCategories, getCategoryProducts })(ClientStore)