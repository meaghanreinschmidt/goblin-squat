import React, { useEffect } from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import ActiveExercise from '../ActiveExercise/ActiveExercise';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTaskIcon from '@mui/icons-material/AddTask';

function Home() {
  const dispatch = useDispatch();
  const activeExercises = useSelector(store => store.activeExercises);

  // load active exercises
  useEffect(() => {
    dispatch({ type: 'FETCH_ACTIVE_EXERCISES' });
  }, []);

  return (
    <Box className="container">
      <center>
      {/* <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" /> */}
      {activeExercises.map(exercise => {
        return (
          <Card sx={{ maxWidth: 230 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }}>{exercise.name}</Typography>
              <CardActions>
                <Button>
                  <EditIcon className="edit-icon"></EditIcon>
                </Button>
                <Button>
                  <DeleteIcon className="delete-icon"></DeleteIcon>
                </Button>
                <Button>
                  <AddTaskIcon className="log-icon"></AddTaskIcon>
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        )
      })}
      <Button>Add Exercise</Button>
      </center>
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default Home;
