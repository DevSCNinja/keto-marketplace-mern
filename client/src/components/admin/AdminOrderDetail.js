import React from 'react'
import { connect } from 'react-redux'

const AdminOrderDetail = () => {

  return (
    <div className='admin-orders'>
      <div className='d-flex align-items-center pt-3'>
        <div className='font-36 mr-3'>Order Details</div>
        <select className='font-12 badge bg-keto-primary'>
          <option>Open</option>
          <option>In Fulfillment</option>
          <option>Closed</option>
        </select>
      </div>
      <div className='row my-3'>
        <div className='col-lg-12'>
          <div className='p-3 bg-white keto-rounded-lg keto-shadow'>
            <div className='row'>
              <div className='col-lg-5'>
                <div className='font-18 font-bold'>
                  Ordered on September 18, 2021
                </div>
              </div>
              <div className='col-lg-7'>
                <div className='font-18 font-bold'>
                  Order# 112-7958708-9707400
                </div>
              </div>
            </div>
            <div className='row my-3'>
              <div className='col-lg-4'>
                <div className='font-18 font-bold'>
                  Shipping Address
                </div>
                <div className='pt-2'>
                  <div>Sankum Landry Marcel Some</div>
                  <div>13385 S ENSIGN POINT LN APT 15108</div>
                  <div>DRAPER, UT 84020-8013</div>
                  <div>United States</div>
                </div>
              </div>
              <div className='col-lg-4'>
                <div className='font-18 font-bold'>
                  Payment Method
                </div>
                <div className='pt-2'>
                  Visa **** 3719
                </div>
              </div>
              <div className='col-lg-4'>
                <div className='font-18 font-bold'>
                  Order Summary
                </div>
                <div className='pt-2'>
                  <div>Item(s) Subtotal: $8.43</div>
                  <div>Shipping & Handling: $5.99</div>
                  <div>Total before tax: $14.42</div>
                  <div>Estimated tax to be collected: $0.61</div>
                  <div><b>Grand Total</b>: $15.03</div>
                </div>
              </div>
            </div>
            <div className='vendors'>
              {[1, 2, 3].map((vendorItem, vendorIndex) =>
                <div key={vendorIndex} className='vendor my-3'>
                  <div className='row my-2'>
                    <div className='col-lg-4'>
                      <div className='font-18 font-bold'>Vendor {vendorIndex + 1}</div>
                      {[1, 2, 3].map((productItem, productIndex) =>
                        <div key={productIndex} className='row my-2'>
                          <div className='col-lg-10'>
                            Exogenous Ketone Base
                          </div>
                          <div className='col-lg-2'> x 4</div>
                        </div>
                      )}
                    </div>
                    <div className='col-lg-8'>
                      <div className='font-18 font-bold'>Tracking Number</div>
                      <div className='my-2'>
                        <input className='min-width-250' />
                      </div>
                      <div className='my-2'>
                        <button className='btn btn-sm bg-keto-primary min-width-250'>Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(AdminOrderDetail)