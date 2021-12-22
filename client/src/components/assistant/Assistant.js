import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from '../routing/PrivateRoute'
import AssistantSidebar from './AssistantSidebar'
import AssistantSettings from './AssistantSettings'
import AssistantOrderDetail from './AssistantOrderDetail'
import AssistantClosedOrders from './AssistantClosedOrders'
import AssistantOpenedOrders from './AssistantOpenedOrders'
import AssistantInfulfillmentOrders from './AssistantInfulfillmentOrders'
import AssistantAffiliatesPending from './AssistantAffiliatesPending'
import AssistantAffiliatePending from './AssistantAffiliatePending'

const Assistant = () => {

  return (
    <div className='container-fluid bg-admin'>
      <div className='row'>
        <AssistantSidebar />
        <div className='col-lg-10 col-md-9'>
          <Router basename="/dashboard">
            <PrivateRoute exact path="/" component={AssistantOpenedOrders} />
            <PrivateRoute exact path="/infulfillmentOrders" component={AssistantInfulfillmentOrders} />
            <PrivateRoute exact path="/closedOrders" component={AssistantClosedOrders} />
            <PrivateRoute exact path="/order/:id" component={AssistantOrderDetail} />
            <PrivateRoute exact path="/affiliates-pending" component={AssistantAffiliatesPending} />
            <PrivateRoute exact path="/affiliate-pending/:id" component={AssistantAffiliatePending} />
            <PrivateRoute exact path="/settings" component={AssistantSettings} />
          </Router>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(Assistant)