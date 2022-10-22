import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import CompletedExerciseItem from '../CompletedExerciseItem/CompletedExerciseItem';


function CompletedExercise() {
  const dispatch = useDispatch();
  const history = useHistory();
  const exercises = useSelector(store => store.exercises.completedExercise);

  // load completed exercises
  useEffect(() => {
    dispatch({ type: 'FETCH_COMPLETE_EXERCISES' });
  }, []);

  

  console.log('here are the completed exercises:', {exercises})
  return (
    <Box className="container">
      <center>
        {exercises.map(exercise => {
          return (
            <CompletedExerciseItem key={exercise.id} exercise={exercise}/>
          )
        })}
      </center>
    </Box>
  )
}

export default CompletedExercise;
