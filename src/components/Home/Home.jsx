import React, { useEffect } from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import ActiveExercise from '../ActiveExercise/ActiveExercise';

function Home() {
  const dispatch = useDispatch();
  const activeExercises = useSelector(store => store.activeExercises);

  // load active exercises
  useEffect(() => {
    dispatch({ type: 'FETCH_ACTIVE_EXERCISES' });
  }, []);

  return (
    <div className="container">
      <center>
      {/* <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" /> */}
      {activeExercises.map(exercise => {
        return (
          <>
          <h4>{exercise.name}</h4>
          <p>Edit Button</p>
          <p>Delete Button</p>
          <p>Log Button</p>
          </>
        )
      })}
      <p>Add Exercise Button</p>
      </center>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default Home;
