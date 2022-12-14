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


function* setSaga() {
    yield takeLatest('FETCH_SETS', fetchSet);
}

export default setSaga;