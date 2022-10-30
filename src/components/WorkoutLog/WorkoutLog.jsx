import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import WorkoutItem from '../WorkoutItem/WorkoutItem';
import './WorkoutLog.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2d2d2d'
    }
  }
})

function WorkoutLog() {
    const dispatch = useDispatch();
    const history = useHistory();
    const workouts = useSelector(store => store.workouts.completedWorkouts);

    useEffect(() => {
        dispatch({ type: 'FETCH_COMPLETE_WORKOUT' });
    }, []);

    console.log('workouts:', {workouts});
    
    return (
        <Box className="container">
            <ThemeProvider theme={theme}>
            <center>
                <div className="log-container">
                <h2 className="App-header">Completed Workouts</h2>
                {workouts.map(workout => {
                    return (
                        <WorkoutItem key={workout.id} workout={workout} />
                    )
                })}
                </div>
            </center>
            </ThemeProvider>
        </Box>
    )
}

export default WorkoutLog;