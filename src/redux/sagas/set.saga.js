import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// READ 
function* fetchSet() {
    // get sets from the DB 
    try {
        const sets = yield axios.get('/api/set');
        console.log('get sets', sets.data)
        yield put ({ type: 'SET_SET', payload: sets.data });
    } catch (error) {
        console.log('get set error', error);
    }
}

// gets data for one exercise's set
// function* fetchSingleSet() {
//     try {
//         const oneExerciseSet = yield axios.get(`/api/set/${action.payload}`);
//         console.log('get one set', oneExerciseSet.data);
//         yield put ({ type: 'SET_ONE_SET', payload: oneExerciseSet.data});
//     } catch (error) {
//         console.log('get one exercise set', error);
//     }
// }

function* setSaga() {
    yield takeLatest('FETCH_SETS', fetchSet);
    // yield takeLatest('FETCH_ONE_SET', fetchSingleSet)
}

export default setSaga;