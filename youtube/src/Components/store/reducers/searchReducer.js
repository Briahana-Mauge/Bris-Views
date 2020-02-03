import { RECEIVE_SEARCH } from '../actionTypes';

const initialState = {
  search: ''
}

const searchReducer = (state = initialState, action) => {
  // copy state
  const newState = { ...state }

  // Deicide how the state is to be modified
  // depending on the action type
    switch (action.type) {
      case RECEIVE_SEARCH:
        newState.search =  action.payload
        break;

      default:
        break;

    }
  
  return newState;

}

export default searchReducer;