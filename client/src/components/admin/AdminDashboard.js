import React from 'react'
import { connect } from 'react-redux'
import Chart from 'react-apexcharts'

const AdminDashboard = ({ user }) => {
  const options = {
    dataLabels: {
      enabled: true
    },
    xaxis: {
      type: 'date',
      categories: [1,2,3,4,5,6]
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
      data: [5,4,3,4,5,6]
    }
  ]

  return (
    <div className='admin-dashboard'>
      <div>
        <div className='font-36 pt-3'>Dashboard</div>
      </div>
      <div className='row'>
        <div className='col-lg-4'>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            <div className='d-flex align-items-center'>
              <div className='rounded-circle text-center mr-2 ml-2 p-2 bg-keto-secondary'>
                <i className='fa fa-dollar color-keto-primary' style={{ fontSize: '45px', width: '45px', height: '45px' }}></i>
              </div>
              <div className='ml-3'>
                <div className='font-14 font-bold color-keto-secondary'>Total Sales</div>
                <div className='font-18'>$ 984K</div>
                <small className='text-success'><i className='fa fa-arrow-up'></i> 9% Since last month</small>
              </div>
            </div>
          </div>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            <div className='d-flex align-items-center'>
              <div className='rounded-circle text-center mr-2 ml-2 p-2 bg-keto-secondary'>
                <i className='fa fa-dollar color-keto-primary' style={{ fontSize: '45px', width: '45px', height: '45px' }}></i>
              </div>
              <div className='ml-3'>
                <div className='font-14 font-bold color-keto-secondary'>Total Earnings</div>
                <div className='font-18'>$ 176</div>
                <small className='text-success'><i className='fa fa-arrow-up'></i> 9% Since last month</small>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-4'>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            <div className='d-flex align-items-center'>
              <div className='rounded-circle text-center mr-2 ml-2 p-2 bg-keto-secondary'>
                <i className='fas fa-user-friends color-keto-primary' style={{ fontSize: '38px', width: '45px', height: '45px' }}></i>
              </div>
              <div className='ml-3'>
                <div className='font-14 font-bold color-keto-secondary'>Total Affiliates</div>
                <div className='font-18'>598</div>
                <small className='text-success'><i className='fa fa-plus'></i> 43 Since last month</small>
              </div>
            </div>
          </div>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            <div className='d-flex align-items-center'>
              <div className='rounded-circle text-center mr-2 ml-2 p-2 bg-keto-secondary'>
                <i className='fas fa-user-friends color-keto-primary' style={{ fontSize: '38px', width: '45px', height: '45px' }}></i>
              </div>
              <div className='ml-3'>
                <div className='font-14 font-bold color-keto-secondary'>Total Customers</div>
                <div className='font-18'>2784</div>
                <small className='text-success'><i className='fa fa-plus'></i> 214 Since last month</small>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-4'>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            <div className='d-flex align-items-center'>
              <div className='rounded-circle text-center mr-2 ml-2 p-2 bg-keto-secondary'>
                <i className='fa fa-shopping-cart color-keto-primary' style={{ fontSize: '45px', width: '45px', height: '45px' }}></i>
              </div>
              <div className='ml-3'>
                <div className='font-14 font-bold color-keto-secondary'>Most Sold Item</div>
                <div className='font-18'>KetoBoost</div>
                <small className='text-success'><i className='fa fa-arrow-up'></i> 7.3K Since last month</small>
              </div>
            </div>
          </div>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            <div className='d-flex align-items-center'>
              <div className='rounded-circle text-center mr-2 ml-2 p-2 bg-keto-secondary'>
                <i className='fa fa-shopping-cart color-keto-primary' style={{ fontSize: '45px', width: '45px', height: '45px' }}></i>
              </div>
              <div className='ml-3'>
                <div className='font-14 font-bold color-keto-secondary'>Treding Item</div>
                <div className='font-18'>KIND BARS</div>
                <small className='text-success'><i className='fa fa-arrow-up'></i> 3% Since last month</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row mb-4'>
        <div className='col-lg-4'>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            <div className='text-center font-22'>
              Top 10 Earners
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
              $452,819.37
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

export default connect(mapStateToProps, {})(AdminDashboard)