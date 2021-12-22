import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { loadCartData } from '../../actions/cart'
import PrivateRoute from '../routing/PrivateRoute'
import ClientSidebar from './ClientSidebar'
import ClientDashboard from './ClientDashboard'
import ClientStore from './ClientStore'
import ClientProduct from './ClientProduct'
import ClientSettings from './ClientSettings'
import ClientCart from './ClientCart'
import ClientCheckout from './ClientCheckout'
import ClientAcademyView from './ClientAcademyView'
import ClientOrders from './ClientOrders'
import ClientThanks from './ClientThanks'
import ClientOrderDetail from './ClientOrderDetail'

const Client = ({loadCartData}) => {

  React.useEffect(() => {
    loadCartData()
  }, [loadCartData])

  return (
    <div className='container-fluid bg-admin'>
      <div className='row'>
        <ClientSidebar />
        <div className='col-lg-10 col-md-9'>
          <Router basename="/dashboard">
            <PrivateRoute exact path="/" component={ClientDashboard} />
            <PrivateRoute exact path="/academy/:id" component={ClientAcademyView} />
            <PrivateRoute exact path="/store" component={ClientStore} />
            <PrivateRoute exact path="/cart" component={ClientCart} />
            <PrivateRoute exact path="/orders" component={ClientOrders} />
            <PrivateRoute exact path="/order/:id" component={ClientOrderDetail} />
            <PrivateRoute exact path="/checkout" component={ClientCheckout} />
            <PrivateRoute exact path="/thanks" component={ClientThanks} />
            <PrivateRoute exact path="/product/:id" component={ClientProduct} />
            <PrivateRoute exact path="/settings" component={ClientSettings} />
          </Router>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {loadCartData})(Client)