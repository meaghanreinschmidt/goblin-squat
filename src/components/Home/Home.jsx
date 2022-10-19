import React, { useEffect } from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
  const history = useHistory();
  const exerciseList = useSelector(store => store.exerciseList);

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
      {exerciseList.map(exercise => {
        return (
          <Grid>
          <Card variant="outlined" sx={{ maxWidth: 230 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }}>{exercise.name}</Typography>
              <CardActions>
                {/* This button should take the user to the edit page */}
                <Button onClick={() => history.push('/edit/exercise')}>
                  <EditIcon className="edit-icon"></EditIcon>
                </Button>
                <Button>
                  <DeleteIcon className="delete-icon"></DeleteIcon>
                </Button>
                <Button onClick={() => history.push('/log/exercise')}>
                  <AddTaskIcon className="log-icon"></AddTaskIcon>
                </Button>
              </CardActions>
            </CardContent>
          </Card>
          <br />
          </Grid>
        )
      })}
      <br />
      <Button onClick={() => history.push('/add/exercise')}>Add Exercise</Button>
      </center>
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default Home;
