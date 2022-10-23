import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function ActiveWorkoutItem({workout}) {
    const history = useHistory();

    return (
        <>
        <Box>
        <h4>{workout.name}</h4>
        
        <Button onClick={() => history.push("/add/exercise")}>
          Add Exercise
        </Button>
        </Box>
        </>
    )
}

export default ActiveWorkoutItem;