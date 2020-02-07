import { combineReducers } from 'redux'

import historyReducer from './historyReducers'
import logInReducer from './logInReducer';

const rootReducer = combineReducers({
  // partOfState: reducerInCharge 
  historyState: historyReducer,
  logInState: logInReducer
})

export default rootReducer;