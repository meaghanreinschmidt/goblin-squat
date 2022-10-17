import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

const LogExercise = () => {
    const history = useHistory();

    return (
        <>
            <center>
            <h4>"Title of exercise here"</h4>
            <h5>"Sets Here with checkmark button"</h5>
            <h5>"Notes Here</h5>
            <br />
            <Button onClick={() => history.push('/')}>Cancel</Button>
            <Button>Complete</Button>
            </center>
        </>
    )
}

export default LogExercise;