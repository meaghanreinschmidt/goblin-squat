import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import CompletedExerciseItem from '../CompletedExerciseItem/CompletedExerciseItem';


function CompletedExercise() {
  const dispatch = useDispatch();
  const history = useHistory();
  const workout = useSelector(store => store.workouts.completedWorkoutExercises);

  // load completed exercises
  useEffect(() => {
    dispatch({ type: 'FETCH_COMPLETE_WORKOUT_EXERCISES' });
  }, []);

  

  
  return (
    <Box className="container">
      <center>
        {workout.map(exercise => {
          return (
            <CompletedExerciseItem key={exercise.id} exercise={exercise}/>
          )
        })}
      </center>
    </Box>
  )
}

export default CompletedExercise;
