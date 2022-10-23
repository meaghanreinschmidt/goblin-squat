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



const exerciseDetails = (state = [], action) => {
  switch (action.type) {
    case 'SET_EXERCISE_DETAILS':
      return action.payload;
    default:
      return state;
  }
}

const completedExerciseDetails = (state = [], action) => {
  switch (action.type) {
    case 'SET_COMPLETE_EXERCISE_DETAILS':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  exercises,
  exerciseDetails,
  completedExerciseDetails
});