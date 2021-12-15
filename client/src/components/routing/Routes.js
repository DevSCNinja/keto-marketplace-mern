import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Register from '../auth/Register'
import Login from '../auth/Login'
import Alert from '../layout/Alert'
import Dashboard from '../dashboard/Dashboard'
import NotFound from '../layout/NotFound'
import PrivateRoute from '../routing/PrivateRoute'
import ForgotPassword from '../auth/ForgotPassword'
import ResetPassword from '../auth/ResetPassword'
import ClientRegister from '../auth/ClientRegister'
import AffiliateRegister from '../auth/AffiliateRegister'
import FailedConnectAccount from '../auth/FailedConnectAccount'
import Thanks from '../auth/Thanks'
import ClientRegisterByAffiliate from '../auth/ClientRegisterByAffiliate'

const Routes = props => {
  return (
    <>
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/affiliate" component={AffiliateRegister} />
        <Route exact path="/register/client" component={ClientRegister} />
        <Route exact path="/register/client/:id" component={ClientRegisterByAffiliate} />
        <Route exact path="/thanks/:id" component={Thanks} />
        <Route exact path="/failedconnectaccount/:id" component={FailedConnectAccount} />
        <Route exact path="/login" component={Login} />
        <Route exact path='/dashboard' component={Dashboard} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route exact path='/forgotPassword' component={ForgotPassword} />
        <Route exact path="/resetpassword/:id" component={ResetPassword} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default Routes
