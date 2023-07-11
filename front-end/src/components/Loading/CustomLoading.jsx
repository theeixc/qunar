import React from 'react'

import "./CustomLoading.scss"

const CustomLoading = () => {
  return (
    <div className='app__customLoading-container'>
      <div className='custom-loading'>
        <div className='custom-loading-circle'>
          <div></div>
        </div>
        <div className='custom-loading-camel'>
        </div>
      </div>
      <div className='loading-text-container'>加载中</div>
    </div>
  )
}

export default CustomLoading