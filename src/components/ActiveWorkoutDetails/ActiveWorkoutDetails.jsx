import { useHistory, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ExerciseItem from '../ExerciseItem/ExerciseItem';
import './ActiveWorkoutDetails.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#2d2d2d'
      }
    }
  })

function ActiveWorkoutDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const workout = useSelector(store => store.workouts.workoutDetails);
    const exercises = useSelector(store => store.exercises.exercises);

    const handleAdd = () => {
        console.log('clicked add exercise');
        history.push(`/add/exercise/${id}`);
    }

    const getWorkoutDetails = () => {
        dispatch({ type: 'FETCH_ACTIVE_WORKOUT_DETAILS', payload: id });
    }

    useEffect(() => {
        getWorkoutDetails();
    }, [id]);

    return (
        <Box className="container">
            <ThemeProvider theme={theme}>
            <center>
                <div className="active-container">
                <h3 className="App-header">{workout.name}</h3>
                <br />
                <Button variant="outlined" onClick={handleAdd}>Add Exercise</Button>
                    <br />
                    <br />
                    {exercises.map(exercise => {
                        return (
                            <>
                            <ExerciseItem exercise={exercise}/>
                            <br />
                            </>
                        )
                    })}
            <Button variant="outlined" onClick={() => history.goBack()}>Back</Button>
            </div>
            </center>
            </ThemeProvider>
        </Box>
    )
}

export default ActiveWorkoutDetails;