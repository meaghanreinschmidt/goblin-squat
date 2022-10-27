import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchExercise(action) {
  try {
    const exercises = yield axios.get(`/api/exercise/${action.payload}`);
    console.log('get exercise', exercises.data);
    yield put({ type: 'SET_EXERCISES', payload: exercises.data });
  } catch (error) {
    console.log('get exercises error', error);
  }
}

// GOOD
// Gets exercise details (sets and notes)
function* fetchExerciseDetails(action) {
  try {
    // Get one exercise's details
    const exerciseDetails = yield axios.get(`/api/exercise/details/${action.payload}`);
    const exerciseSets = yield axios.get(`/api/set/${action.payload}`);
    yield put({ type: 'SET_EXERCISE_DETAILS', payload: exerciseDetails.data });
    yield put({ type: 'SET_SETS', payload: exerciseSets.data });
  } catch (error) {
    console.log("Error fetching exercise details", error);
    alert("Something went wrong!");
  }
}


// CREATE
function* addExercise(action) {
  const workoutId = action.payload.workout_id;
  console.log('this is action:', action.payload);
  try {
    yield axios.post('/api/exercise/', action.payload);
    yield put({ type: 'FETCH_EXERCISES', payload: workoutId});
  } catch (error) {
    console.log("Add exercise failed", error);
    alert("Something went wrong");
  }
}

function* editExercise(action) {
  try {
    yield axios.put(`/api/exercise/edit/${action.payload.workout_id}/${action.payload.exercise_id}`, action.payload);
    if (action.history) {
        action.history.goBack();
    }
  } catch (error) {
    console.log('Edit exercise failed', error);
  }
}

// DELETE
function* deleteExercise(action) {
  const workoutId = action.payload.workout_id;
  try {
    yield axios.delete(`/api/exercise/delete/${action.payload.id}`);
    yield put({ type: 'FETCH_EXERCISES', payload: workoutId });
  } catch (error) {
    console.log("Error with deleteExercise saga:", error);
    alert("Something went wrong!");
  }
}

function* exerciseSaga() {
  yield takeLatest('FETCH_EXERCISES', fetchExercise);
  yield takeLatest('FETCH_EXERCISE_DETAILS', fetchExerciseDetails);
  yield takeLatest('ADD_EXERCISE', addExercise);
  yield takeLatest('EDIT_EXERCISE', editExercise);
  yield takeLatest('DELETE_EXERCISE', deleteExercise);
}

export default exerciseSaga;
