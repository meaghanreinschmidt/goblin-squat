import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';

// Used to store exercises returned from the server
const activeExercises = (state = [], action) => {
  switch (action.type) {
    case 'SET_EXERCISE':
      return action.payload;
    default: 
      return state;
  }
}

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  activeExercises
});

export default rootReducer;