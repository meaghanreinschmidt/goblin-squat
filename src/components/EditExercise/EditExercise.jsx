import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

const EditExercise = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const exercise = useSelector(store => store.exerciseList.exerciseItem);
    // const set = useSelector(store => store.oneExerciseSet);
    // const workout = useSelector(store => store.oneWorkout);

    // get details for each exercise
    const getExercise = () => {
        dispatch({ type: 'FETCH_ONE_EXERCISE', payload: id })
        // dispatch({ type: 'FETCH_ONE_WORKOUT', payload: id })
        // dispatch({ type: 'FETCH_ONE_SET', payload: id });
    }
    
    useEffect(() => {
        getExercise();
    }, [id]);
    
    console.log('this is the exercise:', {exercise});

    return (
        <>
            <center>
            <h4>{exercise.name}</h4>
            
            <h5>"Already Added Input fields here with delete buttons"</h5>
            <Button>+ Add a Set</Button>
            <h5>"Already Added Note block here with delete button</h5>
            <Button>+ Add a Note Block</Button>
            <br />
            <Button onClick={() => history.push('/')}>Cancel</Button>
            <Button>Save</Button>
            </center>
        </>
    )
}

export default EditExercise;