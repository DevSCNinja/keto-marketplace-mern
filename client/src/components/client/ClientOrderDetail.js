import React from 'react'
import { connect } from 'react-redux'
import { getOrder, getOrderItems } from '../../actions/order'
import formatDate from '../../utils/formatDate'

const ClientOrderDetail = ({ match, getOrder, order, getOrderItems, orderItems }) => {
  const orderID = match.params.id

  React.useEffect(() => {
    getOrder(orderID)
    getOrderItems(orderID)
  }, [getOrder, getOrderItems, orderID])

  return (
    <div className='admin-orders'>
      <div className='d-flex align-items-center pt-3'>
        <div className='font-36 mr-3'>Order Details</div>
      </div>
      {order._id === undefined ? null
        :
        <div className='row my-3'>
          <div className='col-lg-12'>
            <div className='p-3 bg-white keto-rounded-lg keto-shadow'>
              <div className='row'>
                <div className='col-lg-5'>
                  <div className='font-18 font-bold'>
                    Ordered on {formatDate(order.date)}
                  </div>
                </div>
                <div className='col-lg-7'>
                  <div className='font-18 font-bold'>
                    Order# {order._id}
                  </div>
                </div>
              </div>
              <div className='row my-3'>
                <div className='col-lg-4'>
                  <div className='font-18 font-bold'>
                    Shipping Address
                  </div>
                  <div className='pt-2'>
                    <div><span style={{ display: 'inline-block', width: '80px' }}>Name:</span> {order.shippingFirstName} {order.shippingLastName}</div>
                    <div><span style={{ display: 'inline-block', width: '80px' }}>Address:</span> {order.shippingAddress}</div>
                    <div><span style={{ display: 'inline-block', width: '80px' }}>City:</span> {order.shippingCity}</div>
                    <div><span style={{ display: 'inline-block', width: '80px' }}>State:</span> {order.shippingState}</div>
                    <div><span style={{ display: 'inline-block', width: '80px' }}>Zip:</span> {order.shippingZipCode}</div>
                  </div>
                </div>
                <div className='col-lg-4'>
                  <div className='font-18 font-bold'>
                    Payment Intent
                  </div>
                  <div className='pt-2'>
                    {order.paymentIntent}
                  </div>
                </div>
                <div className='col-lg-4'>
                  <div className='font-18 font-bold'>
                    Order Summary
                  </div>
                  <div className='pt-2'>
                    <div>Item(s) Subtotal: ${order.subTotal / 100}</div>
                    <div>Shipping & Handling: ${order.shippingFee / 100}</div>
                    <div><b>Grand Total</b>: ${order.subTotal / 100 + order.shippingFee / 100}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  order: state.order.order,
  orderItems: state.order.orderItems
})

export default connect(mapStateToProps, { getOrder, getOrderItems })(ClientOrderDetail)