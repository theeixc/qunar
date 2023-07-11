import React from 'react'
import ReactLoading from "react-loading";

import "./Loading.scss"

const Loading = () => {
  return (
    <div className='app__loading-container'>
      <ReactLoading type='spin' color='#1ba9ba' />
    </div>
  )
}

export default Loading