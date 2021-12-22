import React from 'react'
import { connect } from 'react-redux'
import Star from '../layout/Stars'
import { useHistory } from 'react-router'
import { removeProductFromCart, loadCartData } from '../../actions/cart'

const ClientCart = ({ loadCartData, cartLines, baseURL, removeProductFromCart }) => {
  const history = useHistory()

  const [subTotal, setSubTotal] = React.useState(0)
  const [shipping, setShipping] = React.useState(0)

  React.useEffect(() => {
    loadCartData()
  }, [loadCartData])

  React.useEffect(() => {
    let subTotal = 0, shipping = 0
    cartLines.forEach(line => {
      subTotal += line.product.price / 100 * line.quantity
      shipping += line.product.shippingFee / 100 * line.quantity
    })
    setSubTotal(subTotal)
    setShipping(shipping)
  }, [cartLines])

  return (
    <div className='client-cart'>
      <div>
        <div className='font-36 pt-3'>Cart</div>
      </div>
      <div className='row mx-1 px-2 my-3 py-3 bg-white keto-rounded-lg keto-shadow'>
        <div className='col-lg-12'>
          {cartLines.length === 0 ?
            <div className='no-cartlines font-21'>There are no products in your cart.</div>
            :
            <div>
              {cartLines.map((item, index) =>
                <div key={index}>
                  <div className='row cursor-pointer' onClick={() => history.push(`/product/${item.product._id}`)}>
                    <div className='col-lg-6 py-2'>
                      <div className='d-flex align-items-center'>
                        <div>
                          <img src={baseURL + item.product.pictures[0]} alt='SETIMG' width='100px' height='70px' className='product-image-border' />
                        </div>
                        <div className='px-2'>
                          <div className='font-18'>
                            {item.product.name}
                          </div>
                          <Star rate={item.product.rate} />
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6 py-2'>
                      <table className='table table-borderless'>
                        <thead className='color-keto-primary'>
                          <tr>
                            <th>Price</th>
                            <th>Shipping</th>
                            <th>Quantity</th>
                            <th>Total Sales</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>${item.product.price / 100}</td>
                            <td>${item.product.shippingFee / 100}</td>
                            <td>{item.quantity}</td>
                            <td>${item.product.price / 100 * item.quantity}</td>
                            <td>
                              <button className='btn btn-light' onClick={e => {
                                e.stopPropagation()
                                removeProductFromCart(item.product._id)
                              }}>
                                <i className='fa fa-remove'></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <hr />
                </div>
              )}
              <div className='row'>
                <div className='col-md-6'>
                  <div className='font-24 font-bold pt-4'>
                    Cart Totals
                  </div>
                  <div className='py-2'>
                    Subtotal
                    <span className='float-right'>$ {subTotal}</span>
                  </div>
                  <div className='py-2'>
                    Shipping
                    <span className='float-right'>$ {shipping}</span>
                  </div>
                  <div className='py-2'>
                    Total
                    <span className='float-right'>$ {subTotal + shipping}</span>
                  </div>
                  <div className='py-2 text-center'>
                    <button className='btn bg-keto-primary' onClick={() => history.push('checkout')}>
                      <i className='fa fa-cart-plus'></i> Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  cartLines: state.cart.lines,
  baseURL: state.admin.baseURL
})

export default connect(mapStateToProps, { removeProductFromCart, loadCartData })(ClientCart)