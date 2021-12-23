import React from 'react'
import { connect } from 'react-redux'
import { getOrder, getOrderItems, setOrderStatus } from '../../actions/order'
import formatDate from '../../utils/formatDate'
import getVendors from '../../utils/getVendors'
import AssistantOrderDetailVendor from './AssistantOrderDetailVendor'
import Spinner from '../layout/Spinner'

const AssistantOrderDetail = ({ match, getOrder, order, getOrderItems, orderItems, isLoading, setOrderStatus }) => {
  const orderID = match.params.id
  const vendors = getVendors()
  const [status, setStatus] = React.useState('')

  React.useEffect(() => {
    getOrder(orderID)
    getOrderItems(orderID)
  }, [getOrder, getOrderItems, orderID])

  React.useEffect(() => {
    setStatus(order.status)
  }, [order])

  const changeOrderStatus = status => {
    let allTracked = true
    orderItems.forEach(orderItem => {
      if (orderItem.trackingNumber === '') {
        allTracked = false
      }
    })
    if (status === 'closed' && allTracked === false) {
      alert('All Tracking Numbers Must Be Placed To Close')
      return
    }
    setStatus(status)
    setOrderStatus(status, orderID)
  }

  return (
    <div className='admin-orders'>
      <div className='d-flex align-items-center pt-3'>
        <div className='font-36 mr-3'>Order Details</div>
        <select
          className='font-12 badge bg-keto-primary'
          value={status}
          onChange={e => changeOrderStatus(e.target.value)}
        >
          <option value='open'>Open</option>
          <option value='infulfillment'>In Fulfillment</option>
          <option value='closed'>Closed</option>
        </select>
      </div>
      {(order._id === undefined || isLoading) ? <Spinner />
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
              <div className='vendors'>
                {vendors.map((vendor, vendorIndex) =>
                  <AssistantOrderDetailVendor
                    key={vendorIndex}
                    orderID={orderID}
                    vendor={vendor}
                    orderItems={orderItems}
                  />
                )}
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
  orderItems: state.order.orderItems,
  isLoading: state.admin.pageIsLoading
})

export default connect(mapStateToProps, { getOrder, getOrderItems, setOrderStatus })(AssistantOrderDetail)