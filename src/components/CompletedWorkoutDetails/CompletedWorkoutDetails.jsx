import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CompletedExerciseItem from '../CompletedExerciseItem/CompletedExerciseItem';


function CompletedWorkoutExercises() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const workout = useSelector(store => store.workouts.completedWorkoutDetails);
  const exercises = useSelector(store => store.exercises.exercises);

  const getWorkoutDetails = () => {
    dispatch({ type: 'FETCH_COMPLETED_WORKOUT_DETAILS', payload: id})
  }

  useEffect(() => {
    getWorkoutDetails();
  }, [id])

  return (
    <Box className="container">
      <center>
        <h3>{workout.name}</h3>
        {/* {exercises.map(exercise => {
          return <CompletedExerciseItem key={exercise.id} exercise={exercise}/>
        })} */}

      </center>
    </Box>
  )
}

export default CompletedWorkoutExercises;