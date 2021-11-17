import React from 'react'
import { connect } from 'react-redux'
import productImage from '../../img/product.PNG'

const ClientDashboard = () => {

  return (
    <div className='client-dashboard'>
      <div>
        <div className='font-36 pt-3'>Dashboard</div>
      </div>
      <div className='row my-3'>
        <div className='col-lg-12'>
          {[1, 2, 3, 4, 5, 6].map((item, index) =>
            <div className='row' key={index}>
              <div className='col-md-10'>
                <div className='d-flex align-items-center'>
                  <div>
                    <img src={productImage} alt='SETIMG' width='70' height='70' className='product-image-border' />
                  </div>
                  <div className='px-2'>
                    <div className='font-15'>
                      What's It Worth: A George Mikan PSA 3.5, and Ernie Banks autographs
                    </div>
                    <br />
                    <div className='font-12'>
                      Collectable
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-2 pt-2 text-right font-12'>
                2 hours ago
              </div>
              <div className='col-md-12'>
                <hr />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(ClientDashboard)