import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import WorkoutItem from '../WorkoutItem/WorkoutItem';
import './WorkoutLog.css';

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
            <center>
                <div className="log-container">
                <h3 className="App-header">Completed Workouts</h3>
                {workouts.map(workout => {
                    return (
                        <WorkoutItem key={workout.id} workout={workout} />
                    )
                })}
                </div>
            </center>
        </Box>
    )
}

export default WorkoutLog;