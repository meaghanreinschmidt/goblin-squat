import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import store from './redux/store';
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
    const activeExercises = yield axios.get('/')
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root'),
);
