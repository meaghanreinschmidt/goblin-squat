// Used to store sets returned from the server
const set = (state = [], action) => {
    switch (action.type) {
        case 'SET_SETS':
            return action.payload;
        default:
            return state;
    }
}

export default set;