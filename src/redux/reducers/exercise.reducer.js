// Used to store exercises returned from the server
const activeExercises = (state = [], action) => {
    switch (action.type) {
      case 'SET_EXERCISE':
        return action.payload;
      default: 
        return state;
    }
  }

export default activeExercises;