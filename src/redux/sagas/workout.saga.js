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

function* fetchSingleWorkout() {
    try {
        // get one workout
        const oneWorkout = yield axios.get(`/api/workout/${action.payload}`);
        yield put ({ type: 'SET_ONE_WORKOUT', payload: oneWorkout.data});
    } catch (error) {
        console.log('Error fetching workout', error);
        alert('Something went wrong!');
    }

}

function* workoutSaga() {
    yield takeLatest('FETCH_WORKOUTS', fetchWorkout);
    yield takeLatest('FETCH_ONE_WORKOUT', fetchSingleWorkout);
}

export default workoutSaga;