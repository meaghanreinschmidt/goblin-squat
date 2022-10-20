import { combineReducers } from 'redux';
// Used to store exercises returned from the server
const exerciseList = (state = [], action) => {
    switch (action.type) {
      case 'SET_EXERCISE':
        return action.payload;
      default: 
        return state;
    }
  }

const exerciseItem = (state = [], action) => {
  switch (action.type) {
    case 'SET_ONE_EXERCISE':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  exerciseList,
  exerciseItem,
});