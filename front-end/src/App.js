import './App.css';
import { Header, CardList, Footer } from './components'
import { useState, useEffect } from 'react'
import { getFlightsListAction, getSeveralLowPriceFlightsAction, sortFlightsListAction } from './store/actions/flightsActions'
import { useDispatch } from 'react-redux';

import { observer } from 'mobx-react'
import { useStore } from './storeMobx';

function App() {

  // 控制动画
  const [footerShow, setFooterShow] = useState(true);
  const [headerShow, setHeaderShow] = useState(true);

  // 控制排序 依次为：推荐5、时间34、价格12
  const [sort, setSort] = useState(5);

  /* redux
  const dispatch = useDispatch();
  useEffect(() => {
    // 获取数据(默认为北京到上海 6-19号的机票)，存放到redux 
    dispatch(getFlightsListAction())
    // 获取每天的最低价
    dispatch(getSeveralLowPriceFlightsAction())
  }, [])

  // 排序（正常来说，每次想排序都要请求后端数据）
  useEffect(() => {
    dispatch(sortFlightsListAction(sort))
  }, [sort])
  */


  // mobx
  const { flightStore } = useStore();
  const { getFlights, getSeveralLowPriceFlights, sortFlighs } = flightStore;

  useEffect(() => {
    getFlights()
    getSeveralLowPriceFlights()
  }, [])

  useEffect(() => {
    sortFlighs(sort)
  }, [sort])

  return (
    <div className="app_container">
      <Header headerShow={headerShow} setSort={setSort} />
      <CardList footerShow={footerShow} setFooterShow={setFooterShow} headerShow={headerShow} setHeaderShow={setHeaderShow} />
      <Footer footerShow={footerShow} sort={sort} setSort={setSort} />
    </div>
  );
}

export default observer(App);
