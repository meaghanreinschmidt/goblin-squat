import { HashRouter as Router, Route, Link, useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function CompletedExerciseItem({exercise}) {
    const history = useHistory();

    const handleDetailView = () => {
        console.log('clicked into handleDetailView');
        history.push(`/exercise/completed/${exercise.id}`);
      }

    return (
        <Grid key={exercise.id}>
              <Card variant="outlined" sx={{ maxWidth: 230 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 20 }}>{exercise.name}</Typography>
                  <Typography sx={{ fontSize: 15 }}>{exercise.completed_at}</Typography>
                  <Button onClick={handleDetailView}>Details</Button>
                </CardContent>
              </Card>
        </Grid>
    )
}

export default CompletedExerciseItem;