import React, { useEffect } from "react";
// import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import ExerciseItem from "../ExerciseItem/ExerciseItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const exercises = useSelector((store) => store.exercises.exercises);

  // load active exercises
  useEffect(() => {
    getActiveExercises();
  }, []);

  const getActiveExercises = () => {
    dispatch({ type: "FETCH_ACTIVE_EXERCISES", payload: { id } });
  };

  return (
    <Box className="container">
      <center>
        {/* <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" /> */}
        {exercises.map((exercise) => {
          return <ExerciseItem key={exercise.id} exercise={exercise} />;
        })}
        <br />
        <Button onClick={() => history.push("/add/exercise")}>
          Add Exercise
        </Button>
      </center>
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default Home;