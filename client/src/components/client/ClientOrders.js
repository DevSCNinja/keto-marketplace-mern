import React from 'react'
import { connect } from 'react-redux'
import { getOrders } from '../../actions/order'
import Spinner from '../layout/Spinner'
import { useHistory } from 'react-router'
import formateDate from '../../utils/formatDate'

const ClientOrders = ({ getOrders, orders, clientID, isLoading }) => {
  const history = useHistory()

  React.useEffect(() => {
    getOrders(clientID)
  }, [getOrders, clientID])

  return (
    <div>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='font-36 pt-3'>Orders</div>
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
      {isLoading
        ?
        <Spinner />
        :
        orders.length
          ?
          <div className='row my-3'>
            <div className='col-md-12'>
              <div className='table-responsive bg-white keto-rounded-lg keto-shadow'>
                <table className='table'>
                  <thead className='thead-light'>
                    <tr>
                      <th>Order ID</th>
                      <th>Ordered Date</th>
                      <th>Ship To</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) =>
                      <tr key={index} onClick={() => history.push(`/order/${item._id}`)} className='cursor-pointer'>
                        <td>{item._id}</td>
                        <td>{formateDate(item.date)}</td>
                        <td>{item.shippingFirstName} {item.shippingLastName}</td>
                        <td>${item.subTotal / 100 + item.shippingFee / 100}</td>
                        <td>
                          {item.status === 'closed'
                            ? <span className='badge badge-info badge-keto-primary'>Closed</span>
                            : <span className='badge badge-info badge-keto-danger'>Active</span>
                          }
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          :
          <div>There are no orders yet.</div>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  clientID: state.auth.user._id,
  orders: state.order.orders,
  isLoading: state.admin.isLoading
})

export default connect(mapStateToProps, { getOrders })(ClientOrders)