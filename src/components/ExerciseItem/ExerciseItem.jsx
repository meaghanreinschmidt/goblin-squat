import { HashRouter as Router, Route, Link, useHistory, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios';

function ExerciseItem({exercise}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const {id} = useParams();
    const exercises = useSelector(store => store.exercises.exercises);

    const handleEditView = () => {
      console.log('clicked into handleEditView');
      history.push(`/edit/exercise/${exercise.id}`);
    }
  
    const handleDelete = (inputId) => {
      console.log('handling Delete', id);
      dispatch({ type: 'DELETE_EXERCISE', payload: inputId })
    }
    // const handleDelete = () => {
    //   console.log('clicking delete button')
    //   axios({
    //     method: 'DELETE',
    //     url: `/api/exercise/delete/${exercise.id}`
    //   }).then((response) => {
    //     getActiveExercises();
    //   }).catch((error) => {
    //     console.log(error);
    //     alert('Something went wrong!')
    //   })
    // }

    // const handleDelete = () => {
    //   console.log('clicked delete button');
    //   dispatch({ type: 'DELETE_EXERCISE' });
    // };
    
    return (
        <Grid>
          <Card variant="outlined" sx={{ maxWidth: 230 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }}>{exercise.name}</Typography>
              <CardActions>
                {/* This button should take the user to the edit page */}
                <Button onClick={handleEditView}>
                  <EditIcon className="edit-icon"></EditIcon>
                </Button>
                <Button>
                  <DeleteIcon onClick={() => handleDelete(id)} className="delete-icon"></DeleteIcon>
                </Button>
                <Button>
                  <CheckCircleOutlineIcon className="complete-icon"></CheckCircleOutlineIcon>
                </Button>
              </CardActions>
            </CardContent>
          </Card>
          <br />
          </Grid>
    )
}

export default ExerciseItem;