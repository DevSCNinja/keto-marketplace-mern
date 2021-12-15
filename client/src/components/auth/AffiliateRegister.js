import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { affiliateRegister, checkAffiliateEmail } from '../../actions/auth'
import { useHistory } from 'react-router'

const AffiliateRegister = ({ affiliateRegister, affiliateIsRegistered, connectURL, checkAffiliateEmail }) => {
  const history = useHistory()
  const [buttonName, setButtonName] = React.useState("SUBMIT")
  const [affiliateID, setAffiliateID] = React.useState(null)
  const [accept, setAccept] = React.useState(false)
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

    if (!isExist && !affiliateIsRegistered && name && email && password && brand && bringTo && accept) {
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
        <div className="form-group">
          <label>What do you bring to the table?</label>
          <textarea
            type="text"
            className='form-control'
            name="bringTo"
            value={bringTo}
            rows={4}
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
        <div className="form-group">
          <input
            type='checkbox'
            value={accept}
            onChange={e => setAccept(!accept)}
            required
          />
          <label className='pl-2'>I accept the general<button type="button" className="btn btn-sm color-keto-primary" data-toggle="modal" data-target="#myModal">
            Terms and Conditions
          </button></label>
        </div>
        <div className='text-right mb-5'>
          <input type="submit" className="btn bg-keto-primary" value={buttonName} />
          <Link className='btn bg-keto-secondary ml-2' to="/login">Sign In</Link>
        </div>
      </form>

      <div className="modal" id="myModal">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title font-bold">Terms and Conditions</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body text-justify">
              <p>
                This page contains the terms & conditions. Please read these terms & conditions carefully before ordering any products from us. You should understand that by ordering any of our products, you agree to be bound by these terms & conditions.
              </p>
              <p>
                By placing an order at Perfect Keto, you warrant that you are at least 18 years old (or have parents’ permission to purchase from us) and accept these terms & conditions which shall apply to all orders placed or to be placed at Perfect Keto for the sale and supply of any products. None of these terms & conditions affect your statutory rights. No other terms or changes to the terms & conditions shall be binding unless agreed in writing signed by us.
              </p>
              <p className='font-bold font-21'>
                Personal Information
              </p>
              <p>
                All personal information you provide us with or that we obtain will be handled by Perfect Keto as responsible for the personal information. The personal information you provide will be used to ensure deliveries to you, the credit assessment, to provide offers and information on our catalog to you. The information you provide is only available to Perfect Keto and will not be shared with other third parties. You have the right to inspect the information held about you. You always have the right to request Perfect Keto to delete or correct the information held about you. By accepting the Perfect Keto Conditions, you agree to the above.
              </p>
              <p>
                Dispute Resolution: In the event that there is a dispute, claim, or controversy between you and Us, or between you and Stodge, LLC d/b/a Postscript or any other third-party service provider acting on Our behalf to transmit the mobile messages within the scope of the Program, arising out of or relating to federal or state statutory claims, common law claims, this Agreement, or the breach, termination, enforcement, interpretation or validity thereof, including the determination of the scope or applicability of this agreement to arbitrate, such dispute, claim, or controversy will be, to the fullest extent permitted by law, determined by arbitration in Austin, Texas before one arbitrator.
              </p>
              <p>
                The parties agree to submit the dispute to binding arbitration in accordance with the Commercial Arbitration Rules of the American Arbitration Association (“AAA”) then in effect. Except as otherwise provided herein, the arbitrator shall apply the substantive laws of the Federal Judicial Circuit in which Perfect Keto’s principle place of business is located, without regard to its conflict of laws rules. Within ten (10) calendar days after the arbitration demand is served upon a party, the parties must jointly select an arbitrator with at least five years’ experience in that capacity and who has knowledge of and experience with the subject matter of the dispute. If the parties do not agree on an arbitrator within ten (10) calendar days, a party may petition the AAA to appoint an arbitrator, who must satisfy the same experience requirement. In the event of a dispute, the arbitrator shall decide the enforceability and interpretation of this arbitration agreement in accordance with the Federal Arbitration Act (“FAA”). The parties also agree that the AAA’s rules governing Emergency Measures of Protection shall apply in lieu of seeking emergency injunctive relief from a court. The decision of the arbitrator shall be final and binding, and no party shall have rights of appeal except for those provided in section 10 of the FAA. Each party shall bear its share of the fees paid for the arbitrator and the administration of the arbitration; however, the arbitrator shall have the power to order one party to pay all or any portion of such fees as part of a well-reasoned decision. The parties agree that the arbitrator shall have the authority to award attorneys’ fees only to the extent expressly authorized by statute or contract. The arbitrator shall have no authority to award punitive damages and each party hereby waives any right to seek or recover punitive damages with respect to any dispute resolved by arbitration. The parties agree to arbitrate solely on an individual basis, and this agreement does not permit class arbitration or any claims brought as a plaintiff or class member in any class or representative arbitration proceeding. Except as may be required by law, neither a party nor the arbitrator may disclose the existence, content, or results of any arbitration without the prior written consent of both parties, unless to protect or pursue a legal right.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn bg-keto-primary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  affiliateIsRegistered: state.auth.affiliateIsRegistered,
  connectURL: state.auth.connectURL
})

export default connect(mapStateToProps, { affiliateRegister, checkAffiliateEmail })(AffiliateRegister)
