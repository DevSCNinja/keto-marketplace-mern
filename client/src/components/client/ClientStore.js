import React from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../../actions/product'
import { useHistory } from 'react-router'
import Star from '../layout/Stars'

const ClientStore = ({ getProducts, products, baseURL }) => {
  const history = useHistory()

  React.useEffect(() => {
    getProducts()
  }, [getProducts])

  return (
    <div className='client-dashboard'>
      <div>
        <div className='font-36 pt-3'>Store</div>
      </div>
      <div className='row'>
        {products.map((item, index) =>
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
  baseURL: state.admin.baseURL
})

export default connect(mapStateToProps, { getProducts })(ClientStore)