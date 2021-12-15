import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { clientRegister } from '../../actions/auth'
import { getAffiliates, getAdmin } from '../../actions/admin'

const ClientRegisterByAffililate = ({ match, clientRegister, isAuthenticated, getAffiliates, getAdmin, affiliates, admin }) => {
  const affiliateID = match.params.id

  React.useEffect(() => {
    getAffiliates()
    getAdmin()
  }, [getAffiliates, getAdmin])

  const [formData, setFormData] = React.useState({
    type: 'client',
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const [affiliate, setAffiliate] = React.useState('')

  const { name, email, password, password2 } = formData

  React.useEffect(() => {
    setAffiliate(affiliateID)
  }, [affiliateID])

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (password !== password2) {
      alert('Passwords do not match', 'danger')
    } else {
      clientRegister(formData)
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className='container'>
      <h1 className="large pt-5">Customer Registration</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label>First and Last Name</label>
          <input
            type="text"
            className='form-control'
            name="name"
            value={name}
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className='form-control'
            name="email"
            value={email}
            required
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <label>Affiliate</label>
          <select className='form-control' name='affiliate' disabled value={affiliate} onChange={e => setAffiliate(e.target.value)} required>
            <option value=''>-- Please Select --</option>
            {affiliates.map((item, index) =>
              <option key={index} value={item._id}>{item.name}</option>
            )}
            <option value={admin._id}>{admin.name} (Admin)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className='form-control'
            name="password"
            value={password}
            required
            minLength={6}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            className='form-control'
            name="password2"
            value={password2}
            required
            minLength={6}
            onChange={onChange}
          />
        </div>
        <div className='text-right mb-5'>
          <input type="submit" className="btn bg-keto-primary" value="Register" />
          <Link className='btn bg-keto-secondary ml-2' to="/login">Sign In</Link>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  affiliates: state.admin.affiliates,
  admin: state.admin.admin
})

export default connect(mapStateToProps, { clientRegister, getAffiliates, getAdmin })(ClientRegisterByAffililate)
