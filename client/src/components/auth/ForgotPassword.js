import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { forgotPassword } from '../../actions/auth'
import logo from '../../img/logo.PNG'

const ForgotPassword = ({ forgotPassword }) => {
  const [formData, setFormData] = React.useState({
    email: ''
  })

  const { email } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    forgotPassword(email)
  }

  return (
    <div className='container-fluid bg-login'>
      <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-8'>
          <br />
          <br />
          <br />
          <br />
          <div className='text-center'>
            <img alt="SETIMG" src={logo} className='img-fluid' />
          </div>
        </div>
        <div className='col-md-2'></div>
      </div>
      <div className='row'>
        <div className='col-lg-4 col-md-3'></div>
        <div className='col-lg-4 col-md-6'>
          <div className='row'>
            <div className='col-1'></div>
            <div className='col-10'>
              <div className='row' style={{ height: '20%' }}></div>
              <div className='row height-center'>
                <div className='col'>
                  <form className='form' onSubmit={onSubmit}>
                    <label className='text-white'>Email</label>
                    <div className='form-group'>
                      <input
                        type='email'
                        placeholder='email'
                        name='email'
                        className='form-control'
                        value={email}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='submit'
                        className='form-control btn'
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                        value='SUBMIT'
                      />
                    </div>
                    <div className='form-group'>
                      <Link
                        to='/login'
                        className='btn form-control'
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        Login
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='col-1'></div>
          </div>
        </div>
        <div className='col-lg-4 col-md-3'></div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword)
