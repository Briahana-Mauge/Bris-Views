import { combineReducers } from 'redux'

import historyReducer from './historyReducers'
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  // partOfState: reducerInCharge 
  historyState: historyReducer,
  searchState: searchReducer
})

export default rootReducer;