import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { resetPassword } from '../../actions/auth'
import logo from '../../img/logo.PNG'

const ForgotPassword = ({ match, resetPassword }) => {
  let history = useHistory()
  const userID = match.params.id
  const [password, setPassword] = React.useState('')

  const onSubmit = e => {
    e.preventDefault()
    resetPassword({ userID, password }, history)
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
                    <label className='text-white'>New Password</label>
                    <div className='form-group'>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="PASSWORD"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        minLength="6"
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

export default connect(mapStateToProps, { resetPassword })(ForgotPassword)
