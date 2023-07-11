// mobx 模块化
import { createContext, useContext } from 'react'
import flightStore from './flights'

class RootStore {
  flightStore = flightStore;
}

const store = new RootStore();
const StoreContext = createContext(store)

export function useStore() {
  return useContext(StoreContext)
}