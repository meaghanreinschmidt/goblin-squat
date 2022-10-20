import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// READ
function* fetchActiveExercises() {
    // get exercises from the DB --- NOT YET COMPLETED
    try {
      const activeExercises = yield axios.get('/api/exercise');
      console.log('get active exercises:', activeExercises.data)
      yield put({ type: 'SET_EXERCISE', payload: activeExercises.data });
    } catch (error) {
      console.log('get active exercises error', error);
    }
  }

// READ
function* fetchCompleteExercises() {
  // get exercises from the DB -- COMPLETED
  try {
    const completedExercises = yield axios.get('/api/exercise/completed');
    console.log('get completed exercises:', completedExercises.data)
    yield put ({ type: 'SET_EXERCISE', payload: completedExercises.data});
  } catch (error) {
    console.log('get completed exercises', error);
  }
}

// CREATE 
function* addExercise(action) {
  try {
    yield axios({
      method: 'POST', 
      url: '/api/exercise',
      data: action.payload
    })
    yield put ({ type: 'FETCH_ACTIVE_EXERCISES'})
  } catch (error) {
    console.log(error);
  }
}

// EDIT

// DELETE

function* exerciseSaga() {
    yield takeLatest('FETCH_ACTIVE_EXERCISES', fetchActiveExercises);
    yield takeLatest('FETCH_COMPLETE_EXERCISES', fetchCompleteExercises);
    yield takeLatest('ADD_EXERCISE', addExercise);
}

export default exerciseSaga;

