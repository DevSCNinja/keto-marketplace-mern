import React from 'react'
import { connect } from 'react-redux'

const ShipperOrderDetail = () => {

  return (
    <div className='admin-orders'>
      <div className='d-flex align-items-center pt-3'>
        <div className='font-36 mr-3'>Order Details</div>
        <span className='font-12 badge badge-info badge-keto-primary'>Shipped</span>
      </div>
      <div className='row my-3'>
        <div className='col-md-12'>
          <div className='font-18 font-bold my-3'>
            Ordered on September 18, 2021
          </div>
          <div className='font-18 font-bold my-3'>
            Order# 112-7958708-9707400
          </div>
          <div className='font-18 font-bold my-3'>
            Shipping Address
          </div>
          <div>
            <div>Sankum Landry Marcel Some</div>
            <div>13385 S ENSIGN POINT LN APT 15108</div>
            <div>DRAPER, UT 84020-8013</div>
            <div>United States</div>
          </div>
          <div className='font-18 font-bold my-3'>
            Payment Method
          </div>
          <div>
            Visa **** 3719
          </div>
          <div className='font-18 font-bold my-3'>
            Order Summary
          </div>
          <div>
            <div>Item(s) Subtotal: $8.43</div>
            <div>Shipping & Handling: $5.99</div>
            <div>Total before tax: $14.42</div>
            <div>Estimated tax to be collected: $0.61</div>
            <div>Grand Total: $15.03</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(ShipperOrderDetail)