import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from '../routing/PrivateRoute'
import AdminSidebar from './AdminSidebar'
import AdminDashboard from './AdminDashboard'
import AdminAffiliates from './AdminAffiliates'
import AdminProducts from './AdminProducts'
import AdminAnalytics from './AdminAnalytics'
import AdminSettings from './AdminSettings'

const Admin = () => {

  return (
    <div className='container-fluid bg-admin'>
      <div className='row'>
        <AdminSidebar />
        <div className='col-lg-10 col-md-9'>
          <Router basename="/dashboard">
            <PrivateRoute exact path="/" component={AdminDashboard} />
            <PrivateRoute exact path="/affiliates" component={AdminAffiliates} />
            <PrivateRoute exact path="/products" component={AdminProducts} />
            <PrivateRoute exact path="/analytics" component={AdminAnalytics} />
            <PrivateRoute exact path="/settings" component={AdminSettings} />
          </Router>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(Admin)