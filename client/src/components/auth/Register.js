import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

const Register = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className='container-fluid bg-login'>
      <div className='row'>
        <div className='col-lg-4 col-md-3'></div>
        <div className='col-lg-4 col-md-6'>
          <div className='row'>
            <div className='col-12'>
              <div className='row' style={{ height: '35vh' }}></div>
              <div className='row height-center'>
                <div className='col'>
                  <div className='text-center'>
                    <Link className='btn btn-register mx-1' to='/register/affiliate'>Affiliate Registration</Link>
                    <Link className='btn btn-register mx-1' to='/register/client'>Customer Registration</Link>
                    <Link className='btn btn-register mt-3' to='/login'>Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-4 col-md-3'></div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {})(Register)
