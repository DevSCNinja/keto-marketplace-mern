import React from 'react'
import { connect } from 'react-redux'
import ReactStars from "react-rating-stars-component"
import { getProducts } from '../../actions/product'
import { useHistory } from 'react-router'

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
                <ReactStars
                  value={3.5}
                  size={24}
                  isHalf={true}
                  edit={false}
                  activeColor="#3DBD8F"
                />
                <div className='font-15 height-50'>
                  {item.description.slice(0, 50)} {item.description.length > 50 ? '...' : null}
                </div>
                <div className='font-18 font-bold color-keto-primary pt-1'>
                  ${item.price}
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