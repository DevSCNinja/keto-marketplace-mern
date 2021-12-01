import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'
import logo from '../../img/logo.PNG'

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    login(email, password)
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
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
                        type='password'
                        placeholder='Password'
                        name='password'
                        className='form-control'
                        value={password}
                        onChange={onChange}
                        minLength='6'
                      />
                    </div>
                    <Link to="/forgotPassword" className="form-label pb-2">Forgot password?</Link>
                    <div className='form-group'>
                      <input
                        type='submit'
                        className='form-control btn'
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                        value='Login'
                      />
                    </div>
                    <div className='form-group'>
                      <Link
                        to='/register'
                        className='btn form-control'
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        Register
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
