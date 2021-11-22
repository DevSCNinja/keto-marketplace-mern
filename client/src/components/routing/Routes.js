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

const Routes = props => {
  return (
    <>
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
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
