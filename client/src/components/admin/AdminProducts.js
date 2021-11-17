import React from 'react'
import { connect } from 'react-redux'
import productImage from '../../img/product.PNG'

const AdminProducts = () => {

  return (
    <div className='admin-products'>
      <div>
        <div className='font-36 pt-3'>Products</div>
      </div>
      <div className='row my-3'>
        <div className='col-lg-12'>
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) =>
            <div key={index} className='row mx-1 bg-white my-2 keto-rounded-lg keto-shadow d-flex align-items-center'>
              <div className='col-lg-6 py-2'>
                <div className='d-flex align-items-center'>
                  <div>
                    <img src={productImage} alt='SETIMG' width='100px' height='70px' className='product-image-border' />
                  </div>
                  <div className='px-2'>
                    <div className='font-18'>
                      Keto Elevate™ — C8 MCT Oil Powder
                    </div>
                    <div>
                      Stars
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-6 py-2'>
                <table className='table table-borderless'>
                  <thead className='color-keto-primary'>
                    <tr>
                      <th>Clicks</th>
                      <th>Conversion</th>
                      <th>Total Sales</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>3,481</td>
                      <td>87.53%</td>
                      <td>$58,472.51</td>
                      <td>$49.99</td>
                      <td><i className='fa fa-ellipsis-v'></i></td>
                    </tr>
                  </tbody>
                </table>
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

export default connect(mapStateToProps, {})(AdminProducts)