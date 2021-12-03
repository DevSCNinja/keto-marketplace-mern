import React from 'react'
import { connect } from 'react-redux'

const AffiliateSales = () => {

  return (
    <div className='admin-affiliates'>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='font-36 pt-3'>Sales</div>
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
                  <th>Name</th>
                  <th>Date</th>
                  <th>sales</th>
                  <th>Earnings</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) =>
                  <tr key={index}>
                    <td>John Doe</td>
                    <td>05/14/2021</td>
                    <td>$124.89</td>
                    <td>$41.52</td>
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

export default connect(mapStateToProps, {})(AffiliateSales)