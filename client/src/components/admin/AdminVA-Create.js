import React from 'react'
import { connect } from 'react-redux'
import { createAssistant } from '../../actions/admin'
import { useHistory } from 'react-router'
import Spinner from '../layout/Spinner'

const AdminVACreate = ({ createAssistant, isLoading }) => {
  const history = useHistory()

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [password2, setPassword2] = React.useState('')

  const onSubmit = e => {
    e.preventDefault()
    if (password === password2) {
      createAssistant({ name, email, password }, history)
    } else {
      alert('Passwords are not matched.')
    }
  }

  return (
    <div className='admin-create-category'>
      <div className='font-36 pt-3'>Create A Virtual Assistant</div>
      <div className='row my-3'>
        <div className='col-md-12'>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            {isLoading ?
              <Spinner />
              :
              <form className='form' onSubmit={onSubmit}>
                <div className='form-group'>
                  <label>First and Last Name</label>
                  <input
                    type='text'
                    name='name'
                    className='form-control category-field'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label>Email</label>
                  <input
                    type='email'
                    name='email'
                    className='form-control category-field'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label>Password</label>
                  <input
                    type='password'
                    name='password'
                    className='form-control category-field'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label>Confirm Password</label>
                  <input
                    type='password'
                    name='password2'
                    className='form-control category-field'
                    value={password2}
                    onChange={e => setPassword2(e.target.value)}
                    required
                  />
                </div>
                <div className='d-flex justify-content-end'>
                  <button className='btn bg-keto-primary'>
                    Submit
                  </button>
                </div>
              </form>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isLoading: state.admin.pageIsLoading
})

export default connect(mapStateToProps, { createAssistant })(AdminVACreate)