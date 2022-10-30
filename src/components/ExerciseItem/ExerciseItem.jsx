import {
  HashRouter as Router,
  useHistory,
  useParams,
} from "react-router-dom";
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
import './ExerciseItem.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

function ExerciseItem({ exercise }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const workout = useSelector(store => store.workouts.workouts);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
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

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleEdit = () => {
    console.log('clicked on single exercise');
    // push to /add/exercise/:id/ with another id?
    history.push(`/edit/${id}/${exercise.id}`);
  }

  const handleDelete = () => {
    console.log("handling Delete", exercise.id);
    dispatch({ type: 'DELETE_EXERCISE', payload: exercise });
    setOpen(false);
  };

  return (
    <Grid>
      <Card variant="outlined" sx={{ maxWidth: 230, maxHeight: 100 }}>
        <CardContent>
          <ThemeProvider theme={theme}>
            <Typography>{exercise.name}</Typography>
            {/* This button should take the user to the edit page */}
            <Button onClick={handleEdit}>
              <EditIcon className="edit-icon"></EditIcon>
            </Button>
            <Button className="remove-margin">
              <DeleteIcon
                onClick={handleClickOpen}
                className="delete-icon"
              ></DeleteIcon>
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are you sure?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this item?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={handleClose}>Cancel</Button>
                <Button color="secondary" onClick={() => handleDelete()} autoFocus>
                  Delete
                </Button>
              </DialogActions>
          </Dialog>
          <Button>
            <Checkbox
              icon={<CheckCircleOutlineIcon />}
              checked={checked}
              onClick={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Button>
        </ThemeProvider>
      </CardContent>
    </Card>
    </Grid >
  );
}

export default ExerciseItem;