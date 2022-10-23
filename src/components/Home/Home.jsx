import React, { useEffect } from "react";
// import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import ActiveWorkoutItem from "../ActiveWorkoutItem/ActiveWorkoutItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const workout = useSelector(store => store.workouts.workouts);

  // load active workouts
  useEffect(() => {
    getActiveWorkout();
  }, []);

  const getActiveWorkout = () => {
    dispatch({ type: 'FETCH_ACTIVE_WORKOUT', payload: { id } });
  };

  return (
    <Box className="container">
      <center>
        {/* MAP through workouts and get active workouts */}
        {workout.map(workout => {
          return (
            <ActiveWorkoutItem workout={workout}/>
          )
        })}
        <br />
        <Button>Start Workout</Button>
      </center>
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default Home;