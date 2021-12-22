import React from 'react'
import { connect } from 'react-redux'
import { getAffiliate, approvePendingAffiliate, updateConnectedAccount, deletePendingAffiliate } from '../../actions/admin'
import formatDate from '../../utils/formatDate'
import { useHistory } from 'react-router'
import Spinner from '../layout/Spinner'

const AssistantAffiliatePending = ({ isLoading, match, assistantID, getAffiliate, approvePendingAffiliate, updateConnectedAccount, deletePendingAffiliate, affiliate }) => {
  const affiliateID = match.params.id
  const history = useHistory()

  React.useEffect(() => {
    getAffiliate(affiliateID)
  }, [getAffiliate, affiliateID])

  return (
    <div className='assistant-affiliate'>
      <div>
        <div className='font-36 pt-3'>Pending Affiliate Details</div>
      </div>
      {isLoading ? <Spinner />
        :
        affiliate._id === affiliateID ?
          <div className='row mx-1 my-3 py-3 bg-white keto-rounded-lg keto-shadow'>
            <div className='col-lg-5'>
              <div className='my-2'>
                <div className='font-bold font-19'>Brand / Company</div>
                <div className='font-18'>{affiliate.brand}</div>
              </div>
              <div className='my-2'>
                <div className='font-bold font-19'>First and Last Name</div>
                <div className='font-18'>{affiliate.name}</div>
              </div>
              <div className='my-2'>
                <div className='font-bold font-19'>Email</div>
                <div className='font-18'>{affiliate.email}</div>
              </div>
              <div className='my-2'>
                <div className='font-bold font-19'>Phone Number</div>
                <div className='font-18'>{affiliate.phoneNumber}</div>
              </div>
              <div className='my-2'>
                <div className='font-bold font-19'>Instagram</div>
                <div className='font-18'>{affiliate.instagram}</div>
              </div>
              <div className='my-2'>
                <div className='font-bold font-19'>Facebook</div>
                <div className='font-18'>{affiliate.facebook}</div>
              </div>
              <div className='my-2'>
                <div className='font-bold font-19'>Twitter</div>
                <div className='font-18'>{affiliate.twitter}</div>
              </div>
            </div>
            <div className='col-lg-7'>
              <div className='my-2'>
                <div className='font-bold font-19'>What do you bring to the table?</div>
                <div className='font-18 course-description'>{affiliate.bringTo}</div>
              </div>
              <div className='my-2'>
                <div className='font-bold font-19'>Connected Stripe Status</div>
                <div className='font-18'>{affiliate.connectedAccountStatus === 'enabled' ? <span><span className="text-info">TRANSFERS</span> and <span className="text-info">PAYOUTS</span> are enabled.</span> : <span>Account is <span className="text-info">RESTRICTED</span>. It needs more information.</span>}</div>
              </div>
              <div className='my-2'>
                <div className='font-bold font-19'>Request Date</div>
                <div className='font-18'>{formatDate(affiliate.date)}</div>
              </div>
              <div className='my-2'>
                <div className='font-bold font-19'>Status</div>
                <div className='font-18'>{affiliate.status.toUpperCase()}</div>
              </div>
              <div className='my-2'>
                <div className='font-bold font-19'>Status Description</div>
                <div className='font-18'>{affiliate.inActiveReason}</div>
              </div>
              <div className='my-2'>
                <div className='font-bold font-19'>Stripe Connected Account Number</div>
                <div className='font-18 text-info'>{affiliate.stripeConnectedAccount}</div>
              </div>
            </div>
            <div className='col-lg-12'>
              <div className='text-right'>
                {affiliate.connectedAccountStatus === 'enabled' ?
                  <button className='btn bg-keto-primary mr-2 my-1' onClick={() => approvePendingAffiliate(history, affiliate._id, assistantID)}><i className="fa fa-check mr-1"></i>Approve</button>
                  :
                  <button className='btn btn-info mr-2 my-1' onClick={() => updateConnectedAccount(history, affiliate._id)}><i className="fa fa-refresh mr-1"></i>Send Update Link via Email</button>}
                <button className='btn btn-secondary my-1' onClick={() => deletePendingAffiliate(history, affiliate._id)}><i className="fa fa-trash mr-1"></i>Delete</button>
              </div>
            </div>
          </div>
          :
          null
      }

    </div>
  )
}

const mapStateToProps = state => ({
  assistantID: state.auth.user._id,
  affiliate: state.admin.affiliate,
  isLoading: state.admin.pageIsLoading
})

export default connect(mapStateToProps, { getAffiliate, approvePendingAffiliate, updateConnectedAccount, deletePendingAffiliate })(AssistantAffiliatePending)