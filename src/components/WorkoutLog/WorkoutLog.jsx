import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import WorkoutItem from '../WorkoutItem/WorkoutItem';

function WorkoutLog() {
    const dispatch = useDispatch();
    const history = useHistory();
    const workouts = useSelector(store => store.workouts.completedWorkouts);

    useEffect(() => {
        dispatch({ type: 'FETCH_COMPLETE_WORKOUT' });
    }, []);

    console.log('workouts:', {workouts});
    
    return (
        <Box>
            <center>
                {workouts.map(workout => {
                    return (
                        <WorkoutItem key={workout.id} workout={workout} />
                    )
                })}
            </center>
        </Box>
    )
}

export default WorkoutLog;