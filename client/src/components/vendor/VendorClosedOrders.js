import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'

const VendorInfulfillmentOrders = () => {
  const history = useHistory()

  return (
    <div className='admin-orders'>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='font-36 pt-3'>In Fulfillment</div>
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
            <table className='table'>
              <thead className='thead-light'>
                <tr>
                  <th>Order ID</th>
                  <th>Order Placed</th>
                  <th>Items Ordered</th>
                  <th>Ship To</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) =>
                  <tr key={index} onClick={() => history.push('/order/123')} className='cursor-pointer hover-keto-light'>
                    <td>846232</td>
                    <td>Anthony Hamilton</td>
                    <td>Keto Elevate™ — C8 MCT Oil Powder</td>
                    <td>Anthony Hamilton</td>
                    <td>$1,541.52</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(VendorInfulfillmentOrders)