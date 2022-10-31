import React, { useEffect, useState } from "react";
// import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ActiveWorkoutItem from "../ActiveWorkoutItem/ActiveWorkoutItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './Home.css';
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

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const workout = useSelector(store => store.workouts.workouts);
  // local state for mui form dialog box
  const [open, setOpen] = React.useState(false);
  const [workoutName, setWorkoutName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    setOpen(false);
    event.preventDefault();
    dispatch({
      type: 'ADD_WORKOUT',
      payload: {
        name: workoutName.name
      }
    })
  }

  // load active workouts
  useEffect(() => {
    getActiveWorkout();
  }, []);

  const getActiveWorkout = () => {
    dispatch({ type: 'FETCH_ACTIVE_WORKOUT', payload: { id } });
  };

  return (
    <Box className="container">
      <ThemeProvider theme={theme}>
      <center>
        <div className="home-container">
      <h2 className="App-header">Active Workouts</h2>
        <br />
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>Start Workout</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Enter Name of Workout</DialogTitle>
          <DialogContent>
            <form>
            <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Workout Name"
            type="text"
            fullWidth
            variant="standard"
            value={workoutName.name}
            onChange={(event) =>
              setWorkoutName({ ...workoutName, name: event.target.value })
            }
            />
            <Button color="primary" onClick={handleClose}>Cancel</Button>
            <Button color="secondary" onClick={handleSubmit}>Add</Button>
            </form>
          </DialogContent>
        </Dialog>
        <br />
        <br />
        {workout.map(workout => {
          return (
            <>
            <ActiveWorkoutItem workout={workout}/>
            <br />
            </>
          )
        })}

          </div>
      </center>
      </ThemeProvider>
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default Home;