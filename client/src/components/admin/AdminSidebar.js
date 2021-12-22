import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import { useHistory } from 'react-router-dom'
import { setCurrentPage } from '../../actions/admin'
import dashboardImage from '../../img/icons/dashboard.PNG'
import productImage from '../../img/icons/product.PNG'
import analyticsImage from '../../img/icons/analytics.PNG'
import affiliatesImage from '../../img/icons/affiliates.PNG'
import settingsImage from '../../img/icons/settings.PNG'
import storeImage from '../../img/icons/store.PNG'
import logoutImage from '../../img/icons/logout.PNG'
import academyImage from '../../img/icons/academy.PNG'

const AdminSidebar = ({ user, logout, setCurrentPage, currentPage }) => {
  let history = useHistory()

  const goPage = async location => {
    setCurrentPage(location)
    await history.push(`/`)
    await history.push(`/dashboard`)

    if (location === 'dashboard') {
      await history.push(`/dashboard/`)
      return
    }
    await history.push(`/dashboard/${location}`)
  }

  return (
    <div className='col-lg-2 col-md-3 sidebar p-0'>
      <div className='container-fluid p-0'>
        <div className='py-3'>
          <div className='text-center cursor-pointer' onClick={() => goPage('dashboard')}>
            <img src={user.avatar} className='rounded-circle' width='60px' alt='PROFILE' />
            <div className='pt-2 font-21 font-bold'>{user.name}</div>
          </div>
        </div>
        <div className='top-border p-2 pt-3'>
          <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'dashboard' ? 'selected' : '')} onClick={() => goPage('dashboard')}>
            <div className='d-flex align-items-center'>
              <div><img src={dashboardImage} alt='SETIMG' height='20px' width='20px' className='mr-3' /></div>
              <div>Dashboard</div>
            </div>
          </div>
          <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'affiliates' ? 'selected' : '')} onClick={() => goPage('affiliates')}>
            <div className='d-flex align-items-center'>
              <div><img src={affiliatesImage} alt='SETIMG' height='20px' width='20px' className='mr-3' /></div>
              <div>Affiliates</div>
            </div>
          </div>
          <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'categories' ? 'selected' : '')} onClick={() => goPage('categories')}>
            <div className='d-flex align-items-center'>
              <div><img src={productImage} alt='SETIMG' height='20px' width='20px' className='mr-3' /></div>
              <div>Categories</div>
            </div>
          </div>
          <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'products' ? 'selected' : '')} onClick={() => goPage('products')}>
            <div className='d-flex align-items-center'>
              <div><img src={productImage} alt='SETIMG' height='20px' width='20px' className='mr-3' /></div>
              <div>Products</div>
            </div>
          </div>
          <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'analytics' ? 'selected' : '')} onClick={() => goPage('analytics')}>
            <div className='d-flex align-items-center'>
              <div><img src={analyticsImage} alt='SETIMG' height='20px' width='20px' className='mr-3' /></div>
              <div>Analytics</div>
            </div>
          </div>
          <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'openedOrders' ? 'selected' : '')} onClick={() => goPage('openedOrders')}>
            <div className='d-flex align-items-center'>
              <div><img src={storeImage} alt='SETIMG' height='20px' width='20px' className='mr-3' /></div>
              <div>Open Orders</div>
            </div>
          </div>
          <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'infulfillmentOrders' ? 'selected' : '')} onClick={() => goPage('infulfillmentOrders')}>
            <div className='d-flex align-items-center'>
              <div><img src={storeImage} alt='SETIMG' height='20px' width='20px' className='mr-3' /></div>
              <div>In Fulfillment</div>
            </div>
          </div>
          <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'closedOrders' ? 'selected' : '')} onClick={() => goPage('closedOrders')}>
            <div className='d-flex align-items-center'>
              <div><img src={storeImage} alt='SETIMG' height='20px' width='20px' className='mr-3' /></div>
              <div>Closed Orders</div>
            </div>
          </div>
          <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'academy' ? 'selected' : '')} onClick={() => goPage('academy')}>
            <div className='d-flex align-items-center'>
              <div><img src={academyImage} alt='SETIMG' height='20px' width='20px' className='mr-3' /></div>
              <div>Academy</div>
            </div>
          </div>
          <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'assistants' ? 'selected' : '')} onClick={() => goPage('assistants')}>
            <div className='d-flex align-items-center'>
              <div><img src={affiliatesImage} alt='SETIMG' height='20px' width='20px' className='mr-3' /></div>
              <div>Virtual Assistants</div>
            </div>
          </div>
        </div>

        <div className='signoutLink top-border p-2 pt-3'>
          
          <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'settings' ? 'selected' : '')} onClick={() => goPage('settings')}>
            <div className='d-flex align-items-center'>
              <div><img src={settingsImage} alt='SETIMG' height='20px' width='20px' className='mr-3' /></div>
              <div>Settings</div>
            </div>
          </div>
          <div className='row mx-1 h5 menuItem rounded p-1' onClick={() => {
            setCurrentPage('dashboard')
            logout()
          }}>
            <div className='d-flex align-items-center'>
              <div><img src={logoutImage} alt='SETIMG' height='20px' width='20px' className='mr-3' /></div>
              <div>Sign Out</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  currentPage: state.admin.currentPage
})

export default connect(mapStateToProps, { logout, setCurrentPage })(AdminSidebar)