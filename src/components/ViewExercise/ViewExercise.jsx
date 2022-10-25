import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function ViewExercise() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const exercises = useSelector(store => store.exercises.exerciseDetails);
    const sets = useSelector(store => store.set);

    // get details for each exercise
    const getDetails = () => {
        dispatch({ type: 'FETCH_EXERCISE_DETAILS', payload: id })
    }
    
    useEffect(() => {
        getDetails();
    }, [id]);

    return (
        <>
            <center>
                <h4>{exercises.name}</h4>
                <h5>Sets: </h5>
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
                <h5>Notes: </h5>
                <p>{exercises.notes}</p>
                <br />
                <Button onClick={() => history.goBack()}>Back</Button>
            </center>
        </>
    )
}

export default ViewExercise;
