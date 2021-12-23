import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { getAllClosedOrders } from '../../actions/order'
import formateDate from '../../utils/formatDate'
import Spinner from '../layout/Spinner'

const AssistantClosedOrders = ({ getAllClosedOrders, orders, isLoading }) => {
  const history = useHistory()

  React.useEffect(() => {
    getAllClosedOrders()
  }, [getAllClosedOrders])

  return (
    <div className='admin-orders'>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='font-36 pt-3'>Closed Orders</div>
        </div>
        <div className='col-lg-6'>
          <div className='text-right pt-4'>
            <select
              type='text'
              className='search-filter'
            >
              <option>All</option>
              <option>Active</option>
              <option>Pending</option>
            </select>
            <input
              type='text'
              className='search-filter'
              placeholder='Search'
            />
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <div className='col-md-12'>
          <div className='table-responsive bg-white keto-rounded-lg keto-shadow'>
            {isLoading
              ?
              <Spinner />
              :
              <table className='table'>
                <thead className='thead-light'>
                  <tr>
                    <th>Order ID</th>
                    <th>Order Placed</th>
                    <th>Order Date</th>
                    <th>Ship To</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item, index) =>
                    <tr key={index} onClick={() => history.push(`/order/${item._id}`)} className='cursor-pointer'>
                      <td>{item._id}</td>
                      <td>{item.client.name}</td>
                      <td>{formateDate(item.date)}</td>
                      <td>{item.shippingFirstName} {item.shippingLastName}</td>
                      <td>${item.subTotal / 100 + item.shippingFee / 100}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  isLoading: state.admin.pageIsLoading
})

export default connect(mapStateToProps, { getAllClosedOrders })(AssistantClosedOrders)