import { combineReducers } from 'redux';

// Used to store workout returned from the server 
const workouts = (state = [], action) => {
    switch (action.type) {
        case 'SET_WORKOUT':
            return action.payload;
        default:
            return state;
    }
}

// Used to store workout details (name)
const workoutDetails = (state = [], action) => {
  switch (action.type) {
    case 'SET_WORKOUT_DETAILS':
      return action.payload;
    default:
      return state;
  }
}

// Used to store completed workouts returned from the server
const completedWorkouts = (state = [], action) => {
    switch (action.type) {
      case 'SET_COMPLETE_WORKOUT':
        return action.payload;
      default:
        return state;
    }
  }

// Used to store completed workout details returned from the server
const completedWorkoutDetails = (state = [], action) => {
  switch (action.type) {
    case 'SET_COMPLETED_WORKOUT_DETAILS':
      return action.payload;
    default:
      return state;
  }
}

  export default combineReducers({
    workouts,
    workoutDetails,
    completedWorkouts,
    completedWorkoutDetails
  });