import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";





// gets data for one exercise including sets and workout
function* fetchExerciseDetails(action) {
  try {
    // Get one exercise's details
    const exerciseDetails = yield axios.get(`/api/exercise/${action.payload}`);
    const exerciseSets = yield axios.get(`/api/set/${action.payload}`);
    const exerciseNotes = yield axios.get(`/api/workout/${action.payload}`);
    yield put({ type: "SET_EXERCISE_DETAILS", payload: exerciseDetails.data });
    yield put({ type: "SET_SETS", payload: exerciseSets.data });
    yield put({ type: "SET_WORKOUT", payload: exerciseNotes.data });
  } catch (error) {
    console.log("Error fetching exercise details", error);
    alert("Something went wrong!");
  }
}

function* fetchCompleteExerciseDetails(action) {
  try {
    const completeExerciseDetails = yield axios.get(
      `/api/exercise/completed/${action.payload}`,
    );
    const completeExerciseSets = yield axios.get(
      `/api/set/completed/${action.payload}`,
    );
    const completeExerciseNotes = yield axios.get(
      `/api/workout/${action.payload}`,
    );
    yield put({
      type: "SET_COMPLETE_EXERCISE_DETAILS",
      payload: completeExerciseDetails.data,
    });
    yield put({ type: "SET_SETS", payload: completeExerciseSets.data });
    yield put({ type: "SET_WORKOUT", payload: completeExerciseNotes.data });
  } catch (error) {
    console.log("Error fetching completed exercise details", error);
    alert("Something went wrong!");
  }
}

// CREATE
function* addExercise() {
  try {
    yield axios.post("/api/exercise", action.payload);
    yield put({ type: "FETCH_ACTIVE_EXERCISES" });
    yield put({ type: "FETCH_SETS" });
    yield put({ type: "FETCH_WORKOUTS" });
  } catch (error) {
    console.log("Add exercise failed", error);
    alert("Something went wrong");
  }
}

// Complete Exercise
function* completeExercise() {
  try {
    yield axios.put(`/api/workout/complete/${action.payload}`);
    yield put({ type: "FETCH_ACTIVE_WORKOUT" });
  } catch (error) {
    console.log("Error with completeWorkout saga:", error);
    alert("Something went wrong!");
  }
}

// DELETE
function* deleteExercise(action) {
  try {
    yield axios.delete(`/api/exercise/delete/${action.payload}`);
    yield put({ type: "FETCH_ACTIVE_EXERCISES" });
  } catch (error) {
    console.log("Error with deleteExercise saga:", error);
    alert("Something went wrong!");
  }
}

function* exerciseSaga() {
  // yield takeLatest("FETCH_ACTIVE_EXERCISES", fetchActiveExercises);
  // yield takeLatest("FETCH_COMPLETE_EXERCISES", fetchCompleteExercises);
  yield takeLatest("FETCH_EXERCISE_DETAILS", fetchExerciseDetails);
  yield takeLatest(
    "FETCH_COMPLETE_EXERCISE_DETAILS",
    fetchCompleteExerciseDetails,
  );
  yield takeLatest("ADD_EXERCISE", addExercise);
  yield takeLatest("CLICK_COMPLETE_EXERCISE", completeExercise);
  yield takeLatest("DELETE_EXERCISE", deleteExercise);
}

export default exerciseSaga;
