import * as api from '../../api'

// 获取一天所有的航班信息
export const getFlightsListAction = (depCity = "北京", arrCity = "上海", depDate = "2023-06-19") => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" })
    const res = await api.fetchFlights(depCity, arrCity, depDate);
    dispatch({ type: "FETCH_ALL", payload: res })
    dispatch({ type: "END_LOADING" })
  } catch (error) {
    console.log(error);
  }
}

export const sortFlightsListAction = (sort) => (dispatch) => {
  dispatch({ type: "START_LOADING" })
  dispatch({ type: "SORT", payload: sort })
  dispatch({ type: "END_LOADING" })
}

// 获取近几天航班的最低价
export const getSeveralLowPriceFlightsAction = (depCity = "北京", arrCity = "上海", depDate = "2023-06-19") => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" })
    const res = await api.fetchSeveralLowPriceFlights(depCity, arrCity, depDate);
    dispatch({ type: "FETCH_SEVERAL_LOW_PRICE", payload: res })
    dispatch({ type: "END_LOADING" })
  } catch (error) {
    console.log(error);
  }
}