import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function CompletedExercise() {
  const dispatch = useDispatch();
  const history = useHistory();
  const exercises = useSelector(store => store.exercises.completedExercise);

  // load completed exercises
  useEffect(() => {
    dispatch({ type: 'FETCH_COMPLETE_EXERCISES' });
  }, []);

  console.log('here are the completed exercises:', {exercises})
  return (
    <Box className="container">
      <center>
        {exercises.map(exercise => {
          return (
            <Grid>
              <Card variant="outlined" sx={{ maxWidth: 230 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 20 }}>{exercise.name}</Typography>
                  <Typography sx={{ fontSize: 15 }}>{exercise.completed_at}</Typography>
                  <Button>Details</Button>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </center>
    </Box>
  )
}

export default CompletedExercise;
