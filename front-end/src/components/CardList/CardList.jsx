import './CardList.scss'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import Loading from '../Loading/Loading';

import { useStore } from '../../storeMobx';
import { observer } from 'mobx-react';
import CustomLoading from '../Loading/CustomLoading';



const CardList = ({ footerShow, setFooterShow, headerShow, setHeaderShow }) => {

  // 监听滚动是否结束
  const t1 = useRef(0);
  const t2 = useRef(0);
  const timer = useRef(null);

  const contentRef = useRef(null);

  // 滚动事件的回调
  const handleScroll = () => {
    clearTimeout(timer);
    // 滚动结束后 800ms 触发底部栏出现
    timer.current = setTimeout(isScrollEnd, 700)
    t1.current = window.scrollY
    footerShow && setFooterShow(false);
    headerShow && setHeaderShow(false);
  }

  // 判断滚动是否结束
  const isScrollEnd = () => {
    t2.current = window.scrollY
    if (t2.current === t1.current) {
      setFooterShow(true);
    }
    if (t2.current < 20) {
      setHeaderShow(true);
    }
  }

  // 订阅/取消滚动事件
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  /* redux
  const { flights, isLoading } = useSelector((state) => state.flightsReducer) || {}
  */

  // mobx
  const { flightStore } = useStore();
  const { flights, isLoading } = flightStore;

  if (isLoading) {
    return <CustomLoading />
  }

  return (
    <>
      <ul className='app__cardlist-container' ref={contentRef}>
        {flights.map((item) => (
          // 每一项
          <li key={item._id} className="app__cardlist-listItem">
            {/* 左侧 航班信息 */}
            <div className='item-info'>
              {/* 机场信息 */}
              <div className='airpot-info'>
                <div className='from-info'>
                  <p className='time-text'>{item.depTime}</p>
                  <p className='place-text'>{item.depAirport}{item.depTerminal}</p>
                </div>
                <div className='time-info'>
                  {/* <p className='time-info-duration'><span>{item.totalDuration}</span></p> */}
                  <div className='time-info-arrow'>
                    <div className='arrow-icon'>
                    </div>
                    {/* <span className='isTrans'>转</span> */}
                  </div>
                  {/* <p className='trans-city'><span>{item.transCity}</span></p> */}
                </div>
                <div className='to-info'>
                  <p className='time-text'>{item.arrTime}</p>
                  <p className='place-text'>{item.arrAirport}{item.arrTerminal}</p>
                </div>
              </div>
              {/* 具体的班次信息 */}
              <div className='company-info'>
                <span >{item.name.join(" ")}</span>
              </div>
            </div>
            {/* 右侧价格信息 */}
            <div className='item-price'>
              <p className='price-text'>￥{item.minPrice}</p>
              <p className='discont-text'>{item.discount === 0 ? "" : `经济舱${item.discount}折`}</p>
              <p><span className='increasing-text'>{item.increasing ? "持续涨价中" : ""}</span></p>
            </div>
          </li>
        ))}
      </ul>
      <div className='app__cardlist-bottom'></div>
    </>
  )
}

export default observer(CardList)