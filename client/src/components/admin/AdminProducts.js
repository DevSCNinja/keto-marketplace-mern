import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import productImage from '../../img/product.PNG'
import ReactStars from "react-rating-stars-component"

const AdminProducts = () => {

  return (
    <div className='admin-products'>
      <div className='d-flex align-items-center pt-3'>
        <div className='font-36 mr-2'>Products</div>
        <Link to='create-product'><i className='fa fa-plus-circle font-24 cursor-pointer pt-2'></i></Link>
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
                    <ReactStars
                      value={3.5}
                      size={24}
                      isHalf={true}
                      edit={false}
                      activeColor="#3DBD8F"
                    />
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