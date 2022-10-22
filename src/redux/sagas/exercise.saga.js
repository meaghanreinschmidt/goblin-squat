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
    yield put ({ type: 'SET_COMPLETE_EXERCISE', payload: completedExercises.data});
  } catch (error) {
    console.log('get completed exercises', error);
  }
}

// gets data for one exercise including sets and workout
function* fetchExerciseDetails(action) {
  try {
    // Get one exercise's details
    const exerciseDetails = yield axios.get(`/api/exercise/${action.payload}`);
    const exerciseSets = yield axios.get(`/api/set/${action.payload}`);
    const exerciseNotes = yield axios.get(`/api/workout/${action.payload}`);
    yield put ({ type: 'SET_EXERCISE_DETAILS', payload: exerciseDetails.data });
    yield put ({ type: 'SET_SETS', payload: exerciseSets.data});
    yield put ({ type: 'SET_WORKOUT', payload: exerciseNotes.data});
    // yield put ({ type: 'SET_WORKOUT', payload: workouts.data });
    // yield put ({ type: 'SET_SET', payload: sets.data});
  } catch (error) {
    console.log('Error fetching exercise details', error);
    alert('Something went wrong!');
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
    yield takeLatest('FETCH_EXERCISE_DETAILS', fetchExerciseDetails);
    yield takeLatest('ADD_EXERCISE', addExercise);
}

export default exerciseSaga;

