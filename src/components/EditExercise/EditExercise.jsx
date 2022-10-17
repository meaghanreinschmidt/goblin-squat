import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

const EditExercise = () => {
    const history = useHistory();

    return (
        <>
            <center>
            <h4>"Title Here"</h4>
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