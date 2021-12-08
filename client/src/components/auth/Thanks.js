import React from 'react'
import { connect } from 'react-redux'
import { getPendingAffiliateByUserId } from '../../actions/auth'
import { Link, useHistory } from "react-router-dom"

const Thanks = ({ match, getPendingAffiliateByUserId, pendingAffiliateIsLoaded, pendingAffiliate }) => {
  let history = useHistory()

  React.useEffect(() => {
    if (!pendingAffiliateIsLoaded) {
      getPendingAffiliateByUserId(match.params.id)
    }
  }, [match.params.id, getPendingAffiliateByUserId, pendingAffiliateIsLoaded])

  React.useEffect(() => {
    if (pendingAffiliateIsLoaded && pendingAffiliate.connectedAccountStatus !== 'enabled') {
      history.push(`/failedconnectaccount/${match.params.id}`)
    } else if (pendingAffiliateIsLoaded && pendingAffiliate.connectedAccountStatus === 'enabled') {
      localStorage.removeItem('affiliateID')
    }
  }, [match.params.id, history, pendingAffiliate, pendingAffiliateIsLoaded])

  return (
    <>
      <div className="container-fluid bg-affiliate">
        <div className="row">
          <div className="col-md-2">

          </div>
          <div className="col-md-8">
            <h1 className="text-center mt-5">THANK YOU</h1>
            <div className="text-justify font-21">
              <div className='pt-3'>
                Thank you <span className="color-keto-primary">{pendingAffiliate.name}</span>. We have received your affiliateship request. You will receive an email, too. If you have completed the connected account creation then your affiliateship will be approved soon.
              </div>
              <div className='pt-3'>
                We will let you know again when you are approved.
              </div>
              <div className='pt-3'>
                Thank you. KETO Team.
              </div>
            </div>
            <div className="text-right my-3">
              <Link to="/login" className="btn bg-keto-primary ml-2 mt-3 min-width-250">RETURN TO HOMEPAGE</Link>
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
  pendingAffiliate: state.auth.pendingAffiliate
})

export default connect(mapStateToProps, { getPendingAffiliateByUserId })(Thanks)