import React from 'react'
import { connect } from 'react-redux'
import { addTrackingNumber } from '../../actions/order'

const AssistantOrderDetailVendor = ({ vendor, orderItems, addTrackingNumber, orderID }) => {
  const [showOrderItems, setShowOrderItems] = React.useState([])
  const [trackingNumber, setTrackingNumber] = React.useState('')

  React.useEffect(() => {
    let tempOrderItems = orderItems.filter(orderItem => orderItem.vendor === vendor)
    if (tempOrderItems.length) {
      setTrackingNumber(tempOrderItems[0].trackingNumber)
    }
    setShowOrderItems(tempOrderItems)
  }, [vendor, orderItems])

  const submitTrackingNumber = () => {
    if (trackingNumber.length === 0) {
      alert('Set Tracking Number First!')
      return
    }
    let orderItemIDs = []
    orderItems.forEach(orderItem => {
      orderItemIDs.push(orderItem._id)
    })
    addTrackingNumber({ orderItemIDs, trackingNumber }, orderID)
  }

  return (
    <div className='assistant my-3'>
      <div className='row my-2'>
        <div className='col-lg-4'>
          <div className='font-18 font-bold'>{vendor}</div>
          {showOrderItems.map((orderItem, orderItemIndex) =>
            <div key={orderItemIndex} className='row my-2'>
              <div className='col-lg-10'>
                {orderItem.productName}
              </div>
              <div className='col-lg-2'> x {orderItem.quantity}</div>
            </div>
          )}
        </div>
        {showOrderItems.length
          ?
          <div className='col-lg-8'>
            <div className='font-18 font-bold'>Tracking Number</div>
            <div className='my-2'>
              <input
                className='min-width-250'
                value={trackingNumber}
                onChange={e => setTrackingNumber(e.target.value)}
              />
            </div>
            <div className='my-2'>
              <button
                className='btn btn-sm bg-keto-primary min-width-250'
                onClick={() => submitTrackingNumber()}
              >Save</button>
            </div>
          </div>
          :
          null
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { addTrackingNumber })(AssistantOrderDetailVendor)