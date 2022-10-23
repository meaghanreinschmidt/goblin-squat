import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CompletedExerciseItem from '../CompletedExerciseItem/CompletedExerciseItem';


function CompletedWorkoutExercises() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const exercises = useSelector(store => store.workouts.completedWorkoutExercises);

    useEffect(() => {
        dispatch({ type: 'FETCH_COMPLETE_WORKOUT_EXERCISES', payload: { id }})
    }, []);

  return (
    <Box className="container">
      <center>
        <h3>Exercises Here</h3>
        {exercises.map(exercise => {
          return <CompletedExerciseItem key={exercise.id} exercise={exercise}/>
        })}

      </center>
    </Box>
  )
}

export default CompletedWorkoutExercises;
