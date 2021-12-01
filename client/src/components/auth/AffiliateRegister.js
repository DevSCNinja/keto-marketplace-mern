import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { register } from '../../actions/auth'

const AffiliateRegister = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = React.useState({
    type: 'affiliate',
    brand: '',
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    password2: '',
    bringTo: '',
    instagram: '',
    facebook: '',
    twitter: '',
  })

  const { brand, name, email, phoneNumber, password, password2, bringTo, instagram, facebook, twitter } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (password !== password2) {
      alert('Passwords do not match', 'danger')
    } else {
      register(formData)
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className='container'>
      <h1 className="large pt-5">Affiliate Registration</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label>Brand/Company Name</label>
          <input
            type="text"
            className='form-control'
            name="brand"
            value={brand}
            required
            onChange={onChange}
          />
        </div>
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
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            className='form-control'
            name="phoneNumber"
            value={phoneNumber}
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className='form-control'
            name="password"
            value={password}
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
            minLength={6}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>What do you bring to the table?</label>
          <input
            type="text"
            className='form-control'
            name="bringTo"
            value={bringTo}
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Instagram Username</label>
          <input
            type="text"
            className='form-control'
            name="instagram"
            value={instagram}
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Facebook Username</label>
          <input
            type="text"
            className='form-control'
            name="facebook"
            value={facebook}
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Twitter Username</label>
          <input
            type="text"
            className='form-control'
            name="twitter"
            value={twitter}
            required
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
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register })(AffiliateRegister)
