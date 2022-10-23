import { HashRouter as Router, Route, Link, useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function CompletedExerciseItem({exercise}) {
    const history = useHistory();


    return (
      <>
        <h3>{exercise.name}</h3>
      </>
    )
}

export default CompletedExerciseItem;