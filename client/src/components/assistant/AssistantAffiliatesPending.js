import React from 'react'
import { connect } from 'react-redux'
import { getPendingAffililates } from '../../actions/admin'
import { useHistory } from 'react-router'

const AssistantAffiliatesPending = ({ getPendingAffililates, affiliates }) => {
  const history = useHistory()

  React.useEffect(() => {
    getPendingAffililates()
  }, [getPendingAffililates])

  return (
    <div className='admin-orders'>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='font-36 pt-3'>Pending Affiliates</div>
        </div>
        <div className='col-lg-6'>
          <div className='text-right pt-4'>
            <select
              type='text'
              className='search-filter'
            >
              <option>All</option>
              <option>Active</option>
              <option>Pending</option>
            </select>
            <input
              type='text'
              className='search-filter'
              placeholder='Search'
            />
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <div className='col-md-12'>
          <div className='table-responsive bg-white keto-rounded-lg keto-shadow'>
            {affiliates.length === 0 ? <div className='text-center py-5 my-5 font-24'>There is no Pending Affiliates.</div>
              :
              <table className='table'>
                <thead className='thead-light'>
                  <tr>
                    <th>No</th>
                    <th>Brand/Company</th>
                    <th>First and Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliates.map((item, index) =>
                    <tr key={index} onClick={e => history.push(`/affiliate-pending/${item._id}`)} className='cursor-pointer hover-keto-light'>
                      <td>{index + 1}</td>
                      <td>{item.brand}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.connectedAccountStatus === 'enabled' ? <span>Connected Account is <span className="text-info">ENABLED</span>. You can approve this partner.</span> : item.mailSent ? <span>Connected Stripe Account is <span className="text-warning">RESTRICTED</span></span> : <span>Update link <span className="text-warning">SENT</span> to Client</span>}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  affiliates: state.admin.affiliates
})

export default connect(mapStateToProps, { getPendingAffililates })(AssistantAffiliatesPending)