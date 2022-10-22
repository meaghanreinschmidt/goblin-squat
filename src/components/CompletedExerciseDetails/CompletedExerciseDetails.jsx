import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

const completedExerciseDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const exercises = useSelector(store => store.exercises.completedExerciseDetails);
    const sets = useSelector(store => store.set);
    const workout = useSelector(store => store.workout)
    
    // get details for each completed exercise
    const getDetails = () => {
        dispatch({ type: 'FETCH_COMPLETE_EXERCISE_DETAILS', payload: id });
    }
    
    useEffect(() => {
        getDetails();
    }, [id]);

    console.log('this is the exercise:', {exercises});
    console.log('these are the sets:', {sets});

    return (
        <center>
            <h4>{exercises.name}</h4>
            <p>Sets: </p>
            {sets.map(set => {
                return (
                    <table>
                        <tr>
                            <th>Set #</th>
                            <th>Reps</th>
                            <th>Weight</th>
                        </tr>
                        <tr>
                            <td>{set.set_number}</td>
                            <td>{set.reps}</td>
                            <td>{set.weight}</td>
                        </tr>
                    </table>
                )
            })}
            <p>Notes: </p>
            {workout.map(workout => {
                return (
                    <>
                        <h5>{workout.notes}</h5>
                    </>
                )
            })}
        </center>
    )
}

export default completedExerciseDetails;