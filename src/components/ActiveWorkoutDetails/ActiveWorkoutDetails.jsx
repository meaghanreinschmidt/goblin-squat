import { useHistory, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ExerciseItem from '../ExerciseItem/ExerciseItem';

function ActiveWorkoutDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const workout = useSelector(store => store.workouts.workoutDetails);
    const exercises = useSelector(store => store.exercises.exercises);

    const handleAdd = () => {
        console.log('clicked add exercise');
        history.push('/add/exercise');
    }

    const getWorkoutDetails = () => {
        dispatch({ type: 'FETCH_ACTIVE_WORKOUT_DETAILS', payload: id });
    }

    useEffect(() => {
        getWorkoutDetails();
    }, [id]);

    return (
        <center>
        <Card>
            <CardContent>
                <h3>{workout.name}</h3>
                <Button onClick={handleAdd}>Add Exercise</Button>
                <br />
                <br />
                {exercises.map(exercise => {
                    return (
                        <ExerciseItem exercise={exercise} />
                    )
                })}
            </CardContent>
        </Card>
        
        </center>
    )
}

export default ActiveWorkoutDetails;