import { makeAutoObservable, runInAction } from 'mobx'
import * as api from '../api'

class Flight {
  flights = []
  initialFlights = []
  lowPrice5Days = []
  isLoading = true
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  // 获取指定日期的航班信息
  async getFlights(depCity = "北京", arrCity = "上海", depDate = "2023-06-19") {

    // 修改 state 的操作使用 runInAction 包裹
    runInAction(() => {
      this.isLoading = true;
    })

    const response = await api.fetchFlights(depCity, arrCity, depDate);

    runInAction(() => {
      this.flights = response;
      this.initialFlights = response;
      this.isLoading = false;
    })
  }

  // 获取近几天最低价格
  async getSeveralLowPriceFlights(depCity = "北京", arrCity = "上海", depDate = "2023-06-19") {

    runInAction(() => {
      this.isLoading = true;
    })
    const response = await api.fetchSeveralLowPriceFlights(depCity, arrCity, depDate);
    runInAction(() => {
      this.lowPrice5Days = response;
      this.isLoading = false;
    })
  }

  // 排序
  async sortFlighs(sort) {

    runInAction(() => {
      this.isLoading = true;
    })

    // 模拟请求耗时
    await new Promise((resolve, _) => {
      setTimeout(() => resolve(), 200)
    })

    runInAction(() => {
      switch (sort) {
        case 1:
          this.flights.sort((a, b) => a.minPrice > b.minPrice ? 1 : -1)
          break;
        case 2:
          this.flights.sort((a, b) => b.minPrice > a.minPrice ? 1 : -1)
          break;
        case 3:
          this.flights.sort((a, b) => a.arrTime > b.arrTime ? 1 : -1)
          break;
        case 4:
          this.flights.sort((a, b) => b.arrTime > a.arrTime ? 1 : -1)
          break;
        case 5:
          this.flights = this.initialFlights;
          break;
        default:
          return this;
      }
      this.isLoading = false;
    })
  }
}


const flightStore = new Flight()
export default flightStore