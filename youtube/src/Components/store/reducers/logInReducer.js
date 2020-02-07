import { RECEIVE_USER } from '../actionTypes';

const initialState = {
  isUserLoggedIn: '',
  username: ''
}

const logInReducer = (state = initialState, action) => {
  // copy state
  const newState = { ...state }

  // Deicide how the state is to be modified
  // depending on the action type
    switch (action.type) {
      case RECEIVE_USER:
        newState.isUserLoggedIn =  action.payload.isUserLoggedIn
        newState.username = action.payload.username
        break;

      default:
        break;

    }
  
  return newState;

}

export default logInReducer;