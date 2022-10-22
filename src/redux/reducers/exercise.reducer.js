import { combineReducers } from 'redux';
// Used to store exercises returned from the server
const exercises = (state = [], action) => {
    switch (action.type) {
      case 'SET_EXERCISE':
        return action.payload;
      default: 
        return state;
    }
  }

// Used to store completed exercises returned from the server
const completedExercise = (state = [], action) => {
  switch (action.type) {
    case 'SET_COMPLETE_EXERCISE':
      return action.payload;
    default:
      return state;
  }
}

const exerciseDetails = (state = [], action) => {
  switch (action.type) {
    case 'SET_EXERCISE_DETAILS':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  exercises,
  completedExercise,
  exerciseDetails,
});