import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CompletedExerciseItem from '../CompletedExerciseItem/CompletedExerciseItem';
import './CompletedWorkoutDetails.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#2d2d2d'
      },
      secondary: {
        main: '#FA6318'
      }
    }
  })


function CompletedWorkoutExercises() {
  const history = useHistory();
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
      <ThemeProvider theme={theme}>
      <center>
        <div className="completed-container">
        <h3 className="App-header">{workout.name}</h3>
        {exercises.map(exercise => {
          return (
            <>
            <CompletedExerciseItem key={exercise.id} exercise={exercise}/>
            <br />
            </>
          )
            
        })}
        <br />
      <Button variant="contained" onClick={() => history.goBack()}>Back</Button>
        </div>
      </center>
      </ThemeProvider>
    </Box>
  )
}

export default CompletedWorkoutExercises;
