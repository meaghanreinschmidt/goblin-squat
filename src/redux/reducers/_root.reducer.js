import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import exercises from './exercise.reducer';
import workouts from './workout.reducer';
import set from './sets.reducer';

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  exercises,
  workouts,
  set
});

export default rootReducer;
