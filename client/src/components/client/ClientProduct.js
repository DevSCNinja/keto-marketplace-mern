import React from 'react'
import { connect } from 'react-redux'
import { getProduct } from '../../actions/product'
import Star from '../layout/Stars'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import { addProductToCart } from '../../actions/cart'
import { useHistory } from 'react-router-dom'

const ClientProduct = ({ match, baseURL, getProduct, product, addProductToCart }) => {
  const history = useHistory()

  const productID = match.params.id

  React.useEffect(() => {
    getProduct(productID)
  }, [getProduct, productID])

  const [quantity, setQuantity] = React.useState(1)

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const addToCart = () => {
    addProductToCart(product, quantity)
    history.push('/cart')
  }

  return (
    <div className='client-product'>
      <div className='d-flex align-items-center pt-3'>
        <div className='font-36 mr-3'>{product.name}</div>
        <Star rate={product.rate} />
      </div>
      <div className='row mx-1 px-2 my-3 py-3 bg-white keto-rounded-lg keto-shadow'>
        <div className='col-md-6'>
          <div className='product-description font-18'>
            {product.description}
          </div>
          <div className='color-keto-primary font-bold font-24 pt-3'>
            ${product.price / 100}
          </div>
          <div className='pt-4 font-14'>
            Quantity
          </div>
          <div className="input-group mb-3 input-group-keto-small">
            <div className="input-group-prepend">
              <button className="btn btn-keto-light" type="button" onClick={() => decreaseQuantity()}>-</button>
            </div>
            <input type="tel" value={quantity} onChange={e => {
              if (Number(e.target.value)) setQuantity(Number(e.target.value))
            }} className="form-control input-keto-small" />
            <div className="input-group-append">
              <button className="btn btn-keto-light" type="button" onClick={() => increaseQuantity()}>+</button>
            </div>
          </div>
          <button className='btn bg-keto-primary' onClick={() => addToCart()}>
            <i className='fa fa-cart-plus'></i> Add to Cart
          </button>
        </div>
        <div className='col-md-6'>
          <Carousel emulateTouch>
            {product.pictures.map((item, index) =>
              <div key={index}>
                <img src={baseURL + item} alt='SETIMAGE' />
              </div>
            )}
          </Carousel>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  product: state.product.product,
  baseURL: state.admin.baseURL,
  cartLines: state.cart.lines
})

export default connect(mapStateToProps, { getProduct, addProductToCart })(ClientProduct)