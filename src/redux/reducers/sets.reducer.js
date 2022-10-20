// Used to store sets returned from the server
const setList = (state = [], action) => {
    switch (action.type) {
        case 'SET_SET':
            return action.payload;
        default:
            return state;
    }
}

export default setList;