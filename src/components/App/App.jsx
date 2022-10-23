import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Home from '../Home/Home';
import AddExercise from '../AddExercise/AddExercise';
import EditExercise from '../EditExercise/EditExercise';
import WorkoutLog from '../WorkoutLog/WorkoutLog';
import CompletedWorkoutExercises from '../CompletedWorkoutExercises/CompletedWorkoutExercises';
import CompletedExerciseDetails from '../CompletedExerciseDetails/CompletedExerciseDetails';
import ProgressChart from '../ProgressChart/ProgressChart';
import EditProfile from '../EditProfile/EditProfile';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import UserProfile from '../UserProfile/UserProfile';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  // May need to add this to multiple pages if data from other users is still being stored
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div className="box">
        <Header />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/login */}
          <Redirect exact from="/" to="/login" />

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          {/* Home page */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <Home />
          </ProtectedRoute>
          
          {/* Add Exercise page */}
          <ProtectedRoute 
            exact
            path="/add/exercise"
          >
            <AddExercise />
          </ProtectedRoute>

          {/* Edit Exercise page */}
          <ProtectedRoute 
            exact 
            path="/edit/exercise/:id"
          >
            <EditExercise />
          </ProtectedRoute>

          <ProtectedRoute 
            exact
            path="/workout/log"
          >
            <WorkoutLog />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Completed else shows LoginPage
            exact
            path="/workout/completed/:id"
          >
            <CompletedWorkoutExercises />
          </ProtectedRoute>
        
          <ProtectedRoute
            // logged in shows Completed exercise else shows loginPage
            exact 
            path="/workout/exercise/completed/:id"
          >
            <CompletedExerciseDetails />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Progress Chart else shows LoginPage
            exact
            path="/progress/chart"
          >
            <ProgressChart />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows User Profile else shows LoginPage
            exact
            path="/user/profile"
          >
            <UserProfile />
          </ProtectedRoute>

          <ProtectedRoute
            exact 
            path="/edit/profile"
          >
            <EditProfile />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LoginPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
