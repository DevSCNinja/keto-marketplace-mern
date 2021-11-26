import React from 'react'
import { connect } from 'react-redux'

const ClientCheckout = () => {

  const onSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className='client-checkout'>
      <div>
        <div className='font-36 pt-3'>Checkout</div>
      </div>
      <form onSubmit={onSubmit}>
        <div className='row mx-1 my-3 py-3 bg-white keto-rounded-lg keto-shadow'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label>First Name</label>
              <input
                className='form-control narrow-input bg-light'
                type='text'
                required
              />
            </div>
            <div className='form-group'>
              <label>Last Name</label>
              <input
                className='form-control narrow-input bg-light'
                type='text'
              />
            </div>
            <div className='form-group'>
              <label>Address</label>
              <input
                className='form-control narrow-input bg-light'
                type='text'
              />
            </div>
            <div className='form-group'>
              <label>City</label>
              <input
                className='form-control narrow-input bg-light'
                type='text'
              />
            </div>
            <div className='form-group'>
              <label>State</label>
              <input
                className='form-control narrow-input bg-light'
                type='text'
              />
            </div>
            <div className='form-group'>
              <label>Zip Code</label>
              <input
                className='form-control narrow-input bg-light'
                type='text'
              />
            </div>
            <div className='form-group'>
              <label>Phone Number</label>
              <input
                className='form-control narrow-input bg-light'
                type='text'
              />
            </div>
            <div className='form-group'>
              <label>Email</label>
              <input
                className='form-control narrow-input bg-light'
                type='text'
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label>Card Number</label>
              <input
                className='form-control narrow-input bg-light'
                type='text'
              />
            </div>
            <div className='form-group'>
              <label>Expiration Date</label>
              <input
                className='form-control narrow-input bg-light'
                type='text'
              />
            </div>
            <div className='form-group'>
              <label>CVV</label>
              <input
                className='form-control narrow-input bg-light'
                type='text'
              />
            </div>
            <div className='form-group'>
              <label>Name On Card</label>
              <input
                className='form-control narrow-input bg-light'
                type='text'
              />
            </div>
            <div className='form-group'>
              <label>State</label>
              <input
                className='form-control narrow-input bg-light'
                type='text'
              />
            </div>
            <div className='form-group'>
              <label>Zip Code</label>
              <input
                className='form-control narrow-input bg-light'
                type='text'
              />
            </div>
          </div>
          <div className='col-md-12 text-center py-2'>
            <button className='btn bg-keto-primary' type='submit'> 
              <i className='fa fa-cart-plus'></i> Checkout
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(ClientCheckout)