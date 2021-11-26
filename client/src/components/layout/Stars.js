import React from 'react'
import ReactStars from "react-rating-stars-component"

const Stars = ({ rate }) => {
  if (rate > 1) {
    return (
      <ReactStars
        value={rate}
        size={24}
        isHalf={true}
        edit={false}
        activeColor="#3DBD8F"
      />
    )
  }
  return null
}

export default Stars
