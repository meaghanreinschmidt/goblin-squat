import { combineReducers } from 'redux';
// Used to store exercises returned from the server
const exercises = (state = [], action) => {
    switch (action.type) {
      case 'SET_EXERCISES':
        return action.payload;
      default: 
        return state;
    }
  }

// Used to store exercises from Active Workouts
const completedWorkoutExercises = (state = [], action) => {
  switch (action.type) {
    case 'SET_COMPLETED_EXERCISES':
      return action.payload;
    default: 
      return state;
  }
}

// Used to store exercise details
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
  completedWorkoutExercises,
  exerciseDetails,
});