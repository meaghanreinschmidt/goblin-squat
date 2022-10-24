import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// READ GOOD
// Gets incomplete workout on home page
function* fetchActiveWorkout() {
    try {
      const activeWorkouts = yield axios.get('/api/workout');
      console.log("get active workout:", activeWorkouts.data);
      yield put({ type: 'SET_WORKOUT', payload: activeWorkouts.data });
    } catch (error) {
      console.log("get active workout error", error);
    }
  }

// GOOD
// Gets workout details (name) and exercises
function* fetchActiveWorkoutDetails(action) {
  try {
    // Get one workout's details
    const workoutDetails = yield axios.get(`/api/workout/${action.payload}`);
    const exercises = yield axios.get(`/api/exercise/${action.payload}`);
    yield put ({ type: 'SET_WORKOUT_DETAILS', payload: workoutDetails.data})
    yield put ({ type: 'SET_EXERCISES', payload: exercises.data });
  } catch (error) {
    console.log('Error fetching workout', error);
    alert('Something went wrong!');
  }
}

// // READ
// function* fetchCompleteWorkout() {
//     try {
//       const completedWorkout = yield axios.get('/api/workout/completed');
//       console.log("get completed workout:", completedWorkout.data);
//       yield put({
//         type: 'SET_COMPLETE_WORKOUT',
//         payload: completedWorkout.data,
//       });
//     } catch (error) {
//       console.log("get completed workout", error);
//     }
//   }

  // // READ
  // function* fetchCompleteWorkoutExercises(action) {
  //   // get exercises from completed workout
  //   try {
  //     const completedExercises = yield axios.get(`/api/workout/completed/${action.payload}`);
  //     yield put({ type: 'SET_COMPLETE_WORKOUT_EXERCISES', payload: completedExercises.data});
  //   } catch (error) {
  //     console.log("get completed workout exercises", error);
  //   }
  // }

  // GOOD AND WORKING
  // CREATE
  function* addWorkout(action) {
    try {
      yield axios.post('/api/workout', action.payload);
      yield put({ type: 'FETCH_ACTIVE_WORKOUT'});
    } catch (error) {
      console.log('Add Workout failed', error);
      alert('Something went wrong!');
    }
  }

  // GOOD AND WORKING
  // UPDATE
  function* completeWorkout(action) {
    try {
      yield axios.put(`/api/workout/complete/${action.payload}`);
      yield put({ type: 'FETCH_ACTIVE_WORKOUT' });
    } catch (error) {
      console.log('Error with completeWorkout saga', error);
      alert('Something went wrong!');
    }
  }

  // GOOD AND WORKING
  // DELETE
  function* deleteWorkout(action) {
    try {
      yield axios.delete(`/api/workout/delete/${action.payload}`)
      yield put({ type: 'FETCH_ACTIVE_WORKOUT' });
    } catch (error) {
      console.log('ERROR with delete workout saga:', error);
      alert('Something went wrong!');
    }
  }

// function* fetchSingleWorkout() {
//     try {
//         // get one workout
//         const oneWorkout = yield axios.get(`/api/workout/${action.payload}`);
//         yield put ({ type: 'SET_ONE_WORKOUT', payload: oneWorkout.data});
//     } catch (error) {
//         console.log('Error fetching workout', error);
//         alert('Something went wrong!');
//     }

// }



function* workoutSaga() {
    yield takeLatest('FETCH_ACTIVE_WORKOUT', fetchActiveWorkout);
    yield takeLatest('FETCH_ACTIVE_WORKOUT_DETAILS', fetchActiveWorkoutDetails);
    // yield takeLatest('FETCH_COMPLETE_WORKOUT', fetchCompleteWorkout);
    // yield takeLatest('FETCH_COMPLETE_WORKOUT_EXERCISES', fetchCompleteWorkoutExercises);
    yield takeLatest('ADD_WORKOUT', addWorkout);
    yield takeLatest('COMPLETE_WORKOUT', completeWorkout);
    yield takeLatest('DELETE_WORKOUT', deleteWorkout);
    // yield takeLatest('FETCH_ONE_WORKOUT', fetchSingleWorkout);
}

export default workoutSaga;