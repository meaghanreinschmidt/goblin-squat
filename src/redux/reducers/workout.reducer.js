// Used to store worokout (notes) returned from the server 
const workoutNotes = (state = [], action) => {
    switch (action.type) {
        case 'SET_WORKOUT':
            return action.payload;
        default:
            return state;
    }
}

export default workoutNotes;