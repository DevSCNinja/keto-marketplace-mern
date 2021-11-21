import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from '../routing/PrivateRoute'
import ClientSidebar from './ClientSidebar'
import ClientDashboard from './ClientDashboard'
import ClientStore from './ClientStore'

const Client = () => {

  return (
    <div className='container-fluid bg-admin'>
      <div className='row'>
        <ClientSidebar />
        <div className='col-lg-10 col-md-9'>
          <Router basename="/dashboard">
            <PrivateRoute exact path="/" component={ClientDashboard} />
            <PrivateRoute exact path="/store" component={ClientStore} />
          </Router>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(Client)