import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './ViewExercise.css';

// MUI
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Page Colors
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
        <Box className="container">
            <ThemeProvider theme={theme}>
                <center>
                    <div className="view-container">
                        <h3 className="App-header">{exercises.name}</h3>
                        <table>
                            <tr>
                                <th className="table-header">Set #</th>
                                <th className="table-header">Reps</th>
                                <th className="table-header">Weight</th>
                            </tr>
                            {sets.map(set => {
                                return (
                                    <tr>
                                        <td className="table-item">{set.set_number}</td>
                                        <td className="table-item">{set.reps}</td>
                                        <td className="table-item">{set.weight}</td>
                                    </tr>

                                )
                            })}
                        </table>
                        <br />
                        <h4>{exercises.notes}</h4>
                        <br />
                        <Button variant="contained" onClick={() => history.goBack()}>Back</Button>
                    </div>
                </center>
            </ThemeProvider>
        </Box>
    )
}

export default ViewExercise;
