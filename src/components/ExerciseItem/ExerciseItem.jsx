import {
  HashRouter as Router,
  Route,
  Link,
  useHistory,
  useParams,
} from "react-router-dom";
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
import './ExerciseItem.css';

function ExerciseItem({exercise}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const workout = useSelector(store => store.workouts.workouts);
  const { id } = useParams();
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setChecked(event.target.checked);
    console.log('check complete');
    axios.put(`/api/exercise/${exercise.id}`)
      .then(() => {
        dispatch({ type: 'FETCH_ACTIVE_EXERCISES' });
      }).catch((error) => {
        console.log(error);
        alert('Something went wrong!');
      });
  };

  const handleEdit = () => {
    console.log('clicked on single exercise');
    // push to /add/exercise/:id/ with another id?
    history.push(`/edit/${id}/${exercise.id}`);
  }

  const handleDelete = () => {
    console.log("handling Delete", exercise.id);
    dispatch({ type: 'DELETE_EXERCISE', payload: exercise });
  };

  return (
    <Grid>
      <Card variant="outlined" sx={{ maxWidth: 230, maxHeight: 100 }}>
        <CardContent>
          <Typography>{exercise.name}</Typography>
            {/* This button should take the user to the edit page */}
            {/* <CardActions sx={{ justifyContent: 'center'}}> */}
            <Button onClick={handleEdit}>
              <EditIcon className="edit-icon"></EditIcon>
            </Button>
            <Button className="remove-margin">
              <DeleteIcon
                onClick={() => handleDelete()}
                className="delete-icon"
              ></DeleteIcon>
            </Button>
            <Button>
            <Checkbox 
              icon={<CheckCircleOutlineIcon />}
              checked={checked} 
              onClick={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            </Button>
           {/* </CardActions> */}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ExerciseItem;