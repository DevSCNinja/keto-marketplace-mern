import React from 'react'
import { connect } from 'react-redux'
import Chart from 'react-apexcharts'

const AffiliateDashboard = ({ user }) => {
  const options = {
    dataLabels: {
      enabled: true
    },
    xaxis: {
      type: 'date',
      categories: [1, 2, 3, 4, 5, 6]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy'
      },
    }
  }

  const series = [
    {
      name: 'Monthly Sales',
      data: [5, 4, 3, 4, 5, 6]
    }
  ]

  return (
    <div className='admin-dashboard'>
      <div>
        <div className='font-36 pt-3'>Dashboard</div>
      </div>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            <div className='font-22'>
              Recent Transactions
            </div>
            <div className='table-responsive'>
              <table className='table table-borderless'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Sale</th>
                    <th>Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7].map((item, index) =>
                    <tr key={index}>
                      <td>Steve Correl</td>
                      <td>04/15/2021</td>
                      <td>$67.98</td>
                      <td className='color-keto-primary'>$13.74</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className='row mb-4'>
        <div className='col-lg-4'>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            <div className='text-center font-22'>
              Top 10 Customers
            </div>
            <div className='table-responsive'>
              <table className='table table-borderless'>
                <thead>
                  <tr>
                    <th></th>
                    <th>Sales</th>
                    <th>Clicks</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((item, index) =>
                    <tr key={index}>
                      <td>
                        <div className='d-flex align-items-center p-1 mb-1'>
                          <img alt='SETIMG' src={user.avatar} className='rounded-circle mr-2' width='37px' />
                          <div style={{ lineHeight: '1' }}>
                            <div>Annette Black</div>
                            <small className='text-muted text-break'>Annette@gmail.com</small>
                          </div>
                        </div>
                      </td>
                      <td className='color-keto-primary'>$37K</td>
                      <td>137</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='col-lg-8'>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            <div className='font-36 font-bold'>
              $183,471.87
            </div>
            <Chart
              options={options}
              series={series}
              type='area'
              height='400px'
              width='100%'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, {})(AffiliateDashboard)