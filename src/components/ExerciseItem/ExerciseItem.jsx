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
import axios from "axios";

function ExerciseItem({exercise}) {
  const history = useHistory();
  const dispatch = useDispatch();
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

  const handleView = () => {
    console.log('clicked on single exercise');
    history.push(`/exercise/details/${exercise.id}`);
  }

  const handleDelete = () => {
    console.log("handling Delete", exercise.id);
    dispatch({ type: 'DELETE_EXERCISE', payload: exercise });
  };

  return (
    <Grid>
      <Card variant="outlined" sx={{ maxWidth: 230 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }}>{exercise.name}</Typography>
          <CardActions>
            {/* This button should take the user to the edit page */}
            <Button onClick={handleView}>
              <EditIcon className="edit-icon"></EditIcon>
            </Button>
            <Button>
              <DeleteIcon
                onClick={() => handleDelete()}
                className="delete-icon"
              ></DeleteIcon>
            </Button>
            <Checkbox 
              checked={checked} 
              onClick={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </CardActions>
        </CardContent>
      </Card>
      <br />
    </Grid>
  );
}

export default ExerciseItem;