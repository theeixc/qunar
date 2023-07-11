import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RiArrowLeftSLine, RiSearchLine } from 'react-icons/ri'
import { LuCalendarDays } from 'react-icons/lu'
import { getFlightsListAction } from '../../store/actions/flightsActions'
import oneWay from '../../assets/icons/arrow-right-3.png'

import './Header.scss'
import { useStore } from '../../storeMobx'
import { observer } from 'mobx-react'

const Header = ({ headerShow, setSort }) => {

  const [clickNum, setclickNum] = useState(0);

  /* redux
  const { lowPrice5Days } = useSelector((state) => state.flightsReducer) || {}
  */

  // mobx
  const { flightStore } = useStore();
  const { lowPrice5Days } = flightStore;


  return (
    <header className='app__header-container'>
      <div className='app__header-title'>
        <div className='app__header-title-arrowIcon'><RiArrowLeftSLine /></div>
        <div className='app__header-title-siteInfo'>
          <span>北京</span>
          <img src={oneWay} alt="oneWay" />
          <span>上海</span>
        </div>
        <div className='app__header-title-searchIcon'><RiSearchLine /></div>
      </div>
      <div className={['app__header-dateBar', !headerShow ? "hide" : ""].join(" ")}>
        <div className='app__header-dateBar-date'>
          {lowPrice5Days.map((content) => (
            <DateCard key={content._id} content={content} clickNum={clickNum} setclickNum={setclickNum} setSort={setSort} />
          ))}
        </div>
        <div className='app__header-dateBar-more'>
          <LuCalendarDays />
          <p className='more-text'>更多日期</p>
        </div>
      </div>
    </header >
  )
}


// 单个日期卡片组件
const DateCard = ({ content, clickNum, setclickNum, setSort }) => {

  const { price, date, index, arrCity, depCity } = content


  // 点击日期的回调 redux
  /*
  const handleClick = () => {
    setclickNum(index);
    setSort(5);
    dispatch(getFlightsListAction(depCity, arrCity, date));
  }
  */

  // mobx
  const { flightStore } = useStore();
  const { getFlights } = flightStore

  const handleClick = () => {
    setclickNum(index);
    setSort(5);
    getFlights(depCity, arrCity, date);
  }

  return (
    <div className="date-item">
      <div className={`date-item-inner ${content.index === clickNum ? 'active' : ''}`} onClick={handleClick}>
        <p>{date.slice(5)}</p>
        <p>{index === 0 ? "今天" : getDayInWeeks(date)}</p>
        <p><span className='date-item-price'>￥</span>{price}</p>
      </div>
    </div>
  )
}

// 格式转换：日期 --> 周几
const getDayInWeeks = (dataStr) => {
  const weeks = ["日", "一", "二", "三", "四", "五", "六"]
  const week = new Date(dataStr).getDay()
  return `周${weeks[week % 7]}`;
}

export default observer(Header)