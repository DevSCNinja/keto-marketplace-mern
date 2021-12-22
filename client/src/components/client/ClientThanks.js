import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setCurrentPage } from '../../actions/admin'
import { removeAllCartData } from '../../actions/cart'

const ClientThanks = ({ setCurrentPage, removeAllCartData }) => {
  let history = useHistory()

  const goPage = async location => {
    setCurrentPage(location)
    await history.push(`/${location}`)
  }

  React.useEffect(() => {
    removeAllCartData()
  }, [removeAllCartData])

  return (
    <div className='client-thanks'>
      <div>
        <div className='font-36 pt-3'>Thank you</div>
      </div>
      <div className='row mx-1 px-2 my-3 py-3 bg-white keto-rounded-lg keto-shadow'>
        <div className='col-lg-12'>
          <div className='text-center font-24 my-5 py-5'>
            Your Order has been successfully placed. You can now check your <span className='cursor-pointer text-info' onClick={() => goPage('orders')}>order</span> list.
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { setCurrentPage, removeAllCartData })(ClientThanks)