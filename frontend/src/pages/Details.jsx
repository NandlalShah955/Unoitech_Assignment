import React from 'react'
import {useLocation } from "react-router-dom";
function Details() {
  const location = useLocation();
  const { productId } = location.state || {};
  console.log('productId', productId)
  return (
    <div>Details</div>
  )
}

export default Details