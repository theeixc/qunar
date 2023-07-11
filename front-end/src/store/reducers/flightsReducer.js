

export default function (state = { flights: [], initialFlights: [], lowPrice5Days: [], isLoading: true }, action) {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true }
    case "END_LOADING":
      return { ...state, isLoading: false }
    case "FETCH_ALL":
      return { ...state, flights: action.payload, initialFlights: action.payload }

    case "SORT":
      const newFlights = [...state.flights]
      switch (action?.payload) {
        case 1:
          return { ...state, flights: newFlights.sort((a, b) => a.minPrice > b.minPrice ? 1 : -1) }
        case 2:
          return { ...state, flights: newFlights.sort((a, b) => b.minPrice > a.minPrice ? 1 : -1) }
        case 3:
          return { ...state, flights: newFlights.sort((a, b) => a.arrTime > b.arrTime ? 1 : -1) }
        case 4:
          return { ...state, flights: newFlights.sort((a, b) => b.arrTime > a.arrTime ? 1 : -1) }
        default:
          // 对应推荐排序
          return { ...state, flights: state.initialFlights }
      }

    case "FETCH_SEVERAL_LOW_PRICE":
      return { ...state, lowPrice5Days: action.payload }
    default:
      return { ...state }
  }
}