import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

const EditExercise = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const exercises = useSelector(store => store.exercises.exerciseDetails);

    // get details for each exercise
    const getDetails = () => {
        dispatch({ type: 'FETCH_EXERCISE_DETAILS', payload: id })
        // dispatch({ type: 'FETCH_WORKOUTS' })
        // dispatch({ type: 'FETCH_SETS' });
    }
    
    useEffect(() => {
        getDetails();
    }, [id]);
    
    console.log('this is the exercise:', {exercises});

    return (
        <>
            <center>
            <h4>{exercises.name}</h4>
            {/* STILL TRYING TO GET SETS */}
            <Button>+ Add a Set</Button>
            <h5>{exercises.notes}</h5>
            <Button>+ Add a Note Block</Button>
            <br />
            <Button onClick={() => history.push('/')}>Cancel</Button>
            <Button>Save</Button>
            </center>
        </>
    )
}

export default EditExercise;