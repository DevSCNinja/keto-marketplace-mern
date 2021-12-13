import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from '../routing/PrivateRoute'
import VendorSidebar from './VendorSidebar'
import VendorSettings from './VendorSettings'
import VendorOrderDetail from './VendorOrderDetail'
import VendorClosedOrders from './VendorClosedOrders'
import VendorOpenedOrders from './VendorOpenedOrders'
import VendorInfulfillmentOrders from './VendorInfulfillmentOrders'

const Vendor = () => {

  return (
    <div className='container-fluid bg-admin'>
      <div className='row'>
        <VendorSidebar />
        <div className='col-lg-10 col-md-9'>
          <Router basename="/dashboard">
            <PrivateRoute exact path="/" component={VendorOpenedOrders} />
            <PrivateRoute exact path="/infulfillmentOrders" component={VendorInfulfillmentOrders} />
            <PrivateRoute exact path="/closedOrders" component={VendorClosedOrders} />
            <PrivateRoute exact path="/order/:id" component={VendorOrderDetail} />
            <PrivateRoute exact path="/settings" component={VendorSettings} />
          </Router>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(Vendor)