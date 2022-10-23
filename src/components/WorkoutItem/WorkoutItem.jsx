import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

function WorkoutItem({ workout }) {
    const history = useHistory();
    
    
    const handleDetailView = () => {
        console.log('clicked into handleDetailView');
        history.push(`/workout/completed/${workout.id}`)
    }

    return (
        <Grid>
            <Card variant="outlined" sx={{ maxWidth: 230 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 20 }}>{workout.completed_at}</Typography>
                    <CardActions>
                        <Button onClick={handleDetailView}>Details</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default WorkoutItem;