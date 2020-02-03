import { RECEIVE_HISTORY } from '../actionTypes';

const initialState = {
  history: []
}

const historyReducer = (state = initialState, action) => {
  // copy state
  const newState = { ...state }

  // Deicide how the state is to be modified
  // depending on the action type
  if (!newState.history.includes(action.payload)) {
    switch (action.type) {
      case RECEIVE_HISTORY:
        newState.history = [...newState.history, action.payload]
        break;

      default:
        break;

    }
  }
  return newState;

}

export default historyReducer;