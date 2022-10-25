import { HashRouter as Router, Route, Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect } from 'react';

function CompletedExerciseItem({exercise}) {
  const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const handleDetails = () => {
      console.log('clicked on single exercise');
      history.push(`/completed/exercise/details/${exercise.id}`);
    }

    const getDetails = () => {
      dispatch({ type: 'FETCH_EXERCISE_DETAILS', payload: id })
    }

    useEffect(() => {
      getDetails();
    }, [id]);



    return (
      <Grid>
        <Card variant="outlined" sx={{ maxWidth: 230}}>
          <CardContent>
          <h4>{exercise.name}</h4>
          <Button onClick={handleDetails}>Details</Button>
          </CardContent>
        </Card>
        
      </Grid>
    )
}

export default CompletedExerciseItem;