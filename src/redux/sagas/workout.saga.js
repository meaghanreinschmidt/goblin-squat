import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// READ
function* fetchWorkout() {
    // get workout from the DB -- this is to get the notes 
    try {
        const workouts = yield axios.get('/api/workout');
        console.log('get workout', workouts.data)
        yield put ({ type: 'SET_WORKOUT', payload: workouts.data });
    } catch (error) {
        console.log('get workout error', error);
    }
}

function* workoutSaga() {
    yield takeLatest('FETCH_WORKOUTS', fetchWorkout);
}

export default workoutSaga;