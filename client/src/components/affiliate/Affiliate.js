import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from '../routing/PrivateRoute'
import AffiliateSidebar from './AffiliateSidebar'
import AffiliateDashboard from './AffiliateDashboard'
import AffiliateCustomers from './AffiliateCustomers'
import AffiliateSales from './AffiliateSales'
import AffiliateSettings from './AffiliateSettings'

const Affiliate = () => {

  return (
    <div className='container-fluid bg-admin'>
      <div className='row'>
        <AffiliateSidebar />
        <div className='col-lg-10 col-md-9'>
          <Router basename="/dashboard">
            <PrivateRoute exact path="/" component={AffiliateDashboard} />
            <PrivateRoute exact path="/customers" component={AffiliateCustomers} />
            <PrivateRoute exact path="/sales" component={AffiliateSales} />
            <PrivateRoute exact path="/settings" component={AffiliateSettings} />
          </Router>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(Affiliate)