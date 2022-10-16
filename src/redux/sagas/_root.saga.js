import { takeEvery, put, all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import axios from 'axios';

function* fetchActiveExercises() {
  // get exercises from the DB --- NOT YET COMPLETED???
  try {
    const activeExercises = yield axios.get('/api/exercise');
    console.log('get active exercises:', activeExercises.data)
    yield put({ type: 'SET_EXERCISE', payload: activeExercises.data });
  } catch (error) {
    console.log('get active exercises error', error);
  }
}

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield takeEvery('FETCH_ACTIVE_EXERCISES', fetchActiveExercises);
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
  ]);
}
