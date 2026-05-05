import { legacy_createStore as createStore } from 'redux'
import { rootReducer } from '../store/store'

export const makeStore = (preloadedState = {}) => {
  return createStore(rootReducer, preloadedState)
}