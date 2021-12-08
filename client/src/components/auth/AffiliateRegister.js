import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { affiliateRegister, checkAffiliateEmail } from '../../actions/auth'
import { useHistory } from 'react-router'

const AffiliateRegister = ({ affiliateRegister, affiliateIsRegistered, connectURL, checkAffiliateEmail }) => {
  const history = useHistory()
  const [buttonName, setButtonName] = React.useState("SUBMIT")
  const [affiliateID, setAffiliateID] = React.useState(null)
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

  React.useEffect(() => {
    if (affiliateIsRegistered) {
      setButtonName("SUBMIT")
      window.location.href = connectURL
    }
  }, [affiliateIsRegistered, connectURL])

  React.useEffect(() => {
    setAffiliateID(localStorage.getItem('affiliateID'))
  }, [])

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    const isExist = await checkAffiliateEmail({
      email: formData.email
    })

    if (!isExist && !affiliateIsRegistered && name && email && password && brand && bringTo) {
      setButtonName("Processing...")
      await affiliateRegister({ affiliateID, ...formData }, history)
    }
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
          <label>Instagram </label>
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
          <label>Facebook </label>
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
          <label>Twitter </label>
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
          <input type="submit" className="btn bg-keto-primary" value={buttonName} />
          <Link className='btn bg-keto-secondary ml-2' to="/login">Sign In</Link>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  affiliateIsRegistered: state.auth.affiliateIsRegistered,
  connectURL: state.auth.connectURL
})

export default connect(mapStateToProps, { affiliateRegister, checkAffiliateEmail })(AffiliateRegister)
