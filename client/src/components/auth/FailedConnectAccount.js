import React from 'react'
import { connect } from 'react-redux'
import { getPendingAffiliateByUserId, updateAffiliateConnectedAccount } from '../../actions/auth'
import { Link } from 'react-router-dom'

const FailedConnectAccount = ({ match, getPendingAffiliateByUserId, pendingAffiliateIsLoaded, pendingAffiliate, updateAffiliateConnectedAccount, affiliateConnectedAccountUpdateLink }) => {
  const [buttonName, setButtonName] = React.useState("UPDATE MY ACCOUNT")

  React.useEffect(() => {
    if (!pendingAffiliateIsLoaded) {
      getPendingAffiliateByUserId(match.params.id)
    }
  }, [match.params.id, getPendingAffiliateByUserId, pendingAffiliateIsLoaded])

  React.useEffect(() => {
    if (affiliateConnectedAccountUpdateLink.length) {
      window.location.href = affiliateConnectedAccountUpdateLink;
    }
  }, [affiliateConnectedAccountUpdateLink])

  const updateAccount = () => {
    setButtonName("Processing...")
    updateAffiliateConnectedAccount(match.params.id)
  }

  return (
    <>
      <div className="container-fluid bg-affiliate">
        <div className="row">
          <div className="col-md-2">

          </div>
          <div className="col-md-8">
            <h1 className="text-center mt-5">CONNECTED ACCOUNT HAVE SOME ISSUES</h1>
            <div className="text-justify font-21">
              <div className='pt-3'>
                Hi <span className="color-keto-primary">{pendingAffiliate.name}</span>. We detected some issues on your account connected to our stripe dashboard. You need to provide more information to Stripe to enable payments and payouts on this account.
              </div>
              <div className='pt-3'>
                <span className="color-keto-primary">INFORMATION NEEDED</span> - DUE NOW (Bank account or debit card). You will receive an email, too. You can update your information by clicking the <span onClick={() => updateAccount()} className="color-keto-primary cursor-pointer">UPDATE MY ACCOUNT</span> button below.
              </div>
              <div className='pt-3'>
                We will let you know again when your connected account is 
                <span className="color-keto-primary"> ENABLED</span>.
              </div>
              <div className='pt-3'>
                Thank you. KETO Team.
              </div>
            </div>
            <div className="text-right my-3">
              <button onClick={() => updateAccount()} className="btn bg-keto-primary mt-3 min-width-250">{buttonName}</button>
              <Link to="/login" className="btn bg-keto-secondary ml-2 mt-3 min-width-250">RETURN TO HOMEPAGE</Link>
            </div>
          </div>
          <div className="col-md-2">

          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  pendingAffiliateIsLoaded: state.auth.pendingAffiliateIsLoaded,
  pendingAffiliate: state.auth.pendingAffiliate,
  affiliateConnectedAccountUpdateLink: state.auth.affiliateConnectedAccountUpdateLink
})

export default connect(mapStateToProps, { getPendingAffiliateByUserId, updateAffiliateConnectedAccount })(FailedConnectAccount)