import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Admin from '../admin/Admin'
import Affiliate from '../affiliate/Affiliate'
import Client from '../client/Client'
import Assistant from '../assistant/Assistant'
import { logout } from '../../actions/auth'

const Dashboard = ({ isAuthenticated, user, logout }) => {
  if (isAuthenticated && user && user.type === "admin") {
    return (
      <Admin />
    )
  } else if (isAuthenticated && user && user.type === "affiliate") {
    return (
      <Affiliate />
    )
  } else if (isAuthenticated && user && user.type === "client") {
    return (
      <Client />
    )
  } else if (isAuthenticated && user && user.type === "assistant") {
    return (
      <Assistant />
    )
  } else if (isAuthenticated !== true) {
    return <Redirect to={'/'} />
  } else {
    return (
      <div>
        <h5>It will be redirected soon.</h5>
        <button className='btn btn-danger' onClick={() => logout()}>Logout</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default connect(mapStateToProps, { logout })(Dashboard)