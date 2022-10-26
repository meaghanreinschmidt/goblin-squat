import { useSelector } from 'react-redux';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

const EditProfile = () => {
    const history = useHistory();
    const user = useSelector((store) => store.user);
    
    return (
        <>
            <center>
                <br />
                <br />

                <FitnessCenterIcon></FitnessCenterIcon>
                <h5>name:</h5>
                <h5>current gym:</h5>
                <h5>favorite lift:</h5>
            <Button onClick={() => history.push('/user/profile')}>Cancel</Button>
            <Button>Submit</Button>
            </center>
        </>
    )
}

export default EditProfile;