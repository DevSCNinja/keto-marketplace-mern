import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import { useHistory } from 'react-router-dom'
import { setCurrentPage } from '../../actions/admin'
import academyImage from '../../img/icons/academy.PNG'
import storeImage from '../../img/icons/store.PNG'
import settingsImage from '../../img/icons/settings.PNG'
import logoutImage from '../../img/icons/logout.PNG'

const ClientSidebar = ({ user, logout, setCurrentPage, currentPage }) => {
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
              <div><img src={academyImage} alt='SETIMG' height='20px' width='20px' className='mr-3' /></div>
              <div>Academy</div>
            </div>
          </div>
          <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'store' ? 'selected' : '')} onClick={() => goPage('store')}>
            <div className='d-flex align-items-center'>
              <div><img src={storeImage} alt='SETIMG' height='20px' width='20px' className='mr-3' /></div>
              <div>Store</div>
            </div>
          </div>
          <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'cart' ? 'selected' : '')} onClick={() => goPage('cart')}>
            <div className='d-flex align-items-center'>
              <div><img src={storeImage} alt='SETIMG' height='20px' width='20px' className='mr-3' /></div>
              <div>Cart</div>
            </div>
          </div>
          <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'orders' ? 'selected' : '')} onClick={() => goPage('orders')}>
            <div className='d-flex align-items-center'>
              <div><img src={storeImage} alt='SETIMG' height='20px' width='20px' className='mr-3' /></div>
              <div>Orders</div>
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

export default connect(mapStateToProps, { logout, setCurrentPage })(ClientSidebar)