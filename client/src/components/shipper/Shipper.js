import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from '../routing/PrivateRoute'
import ShipperSidebar from './ShipperSidebar'
import ShipperSettings from './ShipperSettings'
import ShipperOrderDetail from './ShipperOrderDetail'
import ShipperClosedOrders from './ShipperClosedOrders'
import ShipperOpenedOrders from './ShipperOpenedOrders'

const Shipper = () => {

  return (
    <div className='container-fluid bg-admin'>
      <div className='row'>
        <ShipperSidebar />
        <div className='col-lg-10 col-md-9'>
          <Router basename="/dashboard">
            <PrivateRoute exact path="/" component={ShipperOpenedOrders} />
            <PrivateRoute exact path="/closedOrders" component={ShipperClosedOrders} />
            <PrivateRoute exact path="/order/:id" component={ShipperOrderDetail} />
            <PrivateRoute exact path="/settings" component={ShipperSettings} />
          </Router>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(Shipper)