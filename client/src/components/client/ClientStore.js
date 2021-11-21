import React from 'react'
import { connect } from 'react-redux'
import productImage from '../../img/product.PNG'
import ReactStars from "react-rating-stars-component"

const ClientStore = () => {

  return (
    <div className='client-dashboard'>
      <div>
        <div className='font-36 pt-3'>Store</div>
      </div>
      <div className='row'>
        {[1, 2, 3, 4, 5, 6].map((item, index) =>
          <div key={index} className='col-lg-3 col-md-6 my-3'>
            <div>
              <img src={productImage} alt='SETIMG' className='store-image' />
              <div>
                <div className='font-24 font-bold'>
                  MCT Oil Powder
                </div>
                <ReactStars
                  value={3.5}
                  size={24}
                  isHalf={true}
                  edit={false}
                  activeColor="#3DBD8F"
                />
                <div className='font-15'>
                  Supports mental clarity, metabolic function and provides convenient fats.
                </div>
                <div className='font-18 font-bold color-keto-primary pt-1'>
                  $39.99
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(ClientStore)