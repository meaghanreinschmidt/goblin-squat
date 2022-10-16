import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import App from './components/App/App';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_ACTIVE_EXERCISES', fetchActiveExercises);
}

function* fetchActiveExercises() {
  // get exercises from the DB --- NOT YET COMPLETED???
  try {
    const activeExercises = yield axios.get('/api/exercise');
    console.log('get active exercises:', activeExercises.data)
    yield put({ type: 'SET_EXERCISE', payload: activeExercises.data });
  } catch {
    console.log('get active exercises error');
  }
}

// Create sagaMiddlware 
const sagaMiddleware = createSagaMiddleware();

// Used to store exercises returned from the server
const activeExercises = (state = [], action) => {
  switch (action.type) {
    case 'SET_EXERCISE':
      return action.payload;
    default: 
      return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    activeExercises
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById('react-root'),
);
