import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// READ
function* fetchActiveWorkout() {
    // get exercises from the DB --- NOT YET COMPLETED
    try {
      const activeExercises = yield axios.get('/api/workout');
      console.log("get active workout:", activeExercises.data);
      yield put({ type: 'SET_WORKOUT', payload: activeExercises.data });
    } catch (error) {
      console.log("get active workout error", error);
    }
  }

// READ
function* fetchCompleteWorkout() {
    // get workout from the DB -- COMPLETED
    try {
      const completedWorkout = yield axios.get('/api/workout/completed');
      console.log("get completed workout:", completedWorkout.data);
      yield put({
        type: 'SET_COMPLETE_WORKOUT',
        payload: completedWorkout.data,
      });
    } catch (error) {
      console.log("get completed workout", error);
    }
  }

  // READ
  function* fetchCompleteWorkoutExercises(action) {
    // get exercises from completed workout
    try {
      const completedExercises = yield axios.get(`/api/workout/completed/${action.payload}`);
      yield put({ type: 'SET_COMPLETE_WORKOUT_EXERCISES', payload: completedExercises.data});
    } catch (error) {
      console.log("get completed workout exercises", error);
    }
  }

// // READ
// function* fetchWorkout() {
//     // get workout from the DB -- this is to get the notes 
//     try {
//         const workouts = yield axios.get('/api/workout');
//         console.log('get workout', workouts.data)
//         yield put ({ type: 'SET_WORKOUT', payload: workouts.data });
//     } catch (error) {
//         console.log('get workout error', error);
//     }
// }

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
    yield takeLatest('FETCH_ACTIVE_WORKOUT', fetchActiveWorkout);
    yield takeLatest('FETCH_COMPLETE_WORKOUT', fetchCompleteWorkout);
    yield takeLatest('FETCH_COMPLETE_WORKOUT_EXERCISES', fetchCompleteWorkoutExercises);
    yield takeLatest('FETCH_ONE_WORKOUT', fetchSingleWorkout);
}

export default workoutSaga;