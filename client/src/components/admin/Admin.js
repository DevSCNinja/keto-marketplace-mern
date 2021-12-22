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
import AdminOrderDetail from './AdminOrderDetail'
import AdminClosedOrders from './AdminClosedOrders'
import AdminOpenedOrders from './AdminOpenedOrders'
import AdminProductCreate from './AdminProductCreate'
import AdminProductEdit from './AdminProductEdit'
import AdminAcademy from './AdminAcademy'
import AdminAcademyCreate from './AdminAcademyCreate'
import AdminAcademyEdit from './AdminAcademyEdit'
import AdminAcademyView from './AdminAcademyView'
import AdminInfulfillmentOrders from './AdminInfulfillmentOrders'
import AdminCategories from './AdminCategories'
import AdminCategoryCreate from './AdminCategoryCreate'
import AdminCategoryEdit from './AdminCategoryEdit'
import AdminVAs from './AdminVAs'
import AdminVACreate from './AdminVA-Create'
import AdminVAEdit from './AdminVA-Edit'

const Admin = () => {

  return (
    <div className='container-fluid bg-admin'>
      <div className='row'>
        <AdminSidebar />
        <div className='col-lg-10 col-md-9'>
          <Router basename="/dashboard">
            <PrivateRoute exact path="/" component={AdminDashboard} />
            <PrivateRoute exact path="/affiliates" component={AdminAffiliates} />
            <PrivateRoute exact path="/categories" component={AdminCategories} />
            <PrivateRoute exact path="/create-category" component={AdminCategoryCreate} />
            <PrivateRoute exact path="/edit-category/:id" component={AdminCategoryEdit} />
            <PrivateRoute exact path="/products" component={AdminProducts} />
            <PrivateRoute exact path="/create-product" component={AdminProductCreate} />
            <PrivateRoute exact path="/edit-product/:id" component={AdminProductEdit} />
            <PrivateRoute exact path="/analytics" component={AdminAnalytics} />
            <PrivateRoute exact path="/openedOrders" component={AdminOpenedOrders} />
            <PrivateRoute exact path="/infulfillmentOrders" component={AdminInfulfillmentOrders} />
            <PrivateRoute exact path="/closedOrders" component={AdminClosedOrders} />
            <PrivateRoute exact path="/order/:id" component={AdminOrderDetail} />
            <PrivateRoute exact path="/academy" component={AdminAcademy} />
            <PrivateRoute exact path="/academy/:id" component={AdminAcademyView} />
            <PrivateRoute exact path="/academy-create" component={AdminAcademyCreate} />
            <PrivateRoute exact path="/academy-edit/:id" component={AdminAcademyEdit} />
            <PrivateRoute exact path="/assistants" component={AdminVAs} />
            <PrivateRoute exact path="/create-assistant" component={AdminVACreate} />
            <PrivateRoute exact path="/edit-assistant/:id" component={AdminVAEdit} />
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