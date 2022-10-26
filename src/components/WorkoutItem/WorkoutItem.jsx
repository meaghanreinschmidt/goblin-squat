import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import DeleteIcon from "@mui/icons-material/Delete";

function WorkoutItem({ workout }) {
    const dispatch = useDispatch();
    const history = useHistory();
    
    
    const handleDetailView = () => {
        console.log('clicked into handleDetailView');
        history.push(`/workout/completed/${workout.id}`)
    }

    const handleDelete = (id) => {
        console.log('handling delete', id);
        dispatch({ type: 'DELETE_WORKOUT', payload: id});
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
    }

    return (
        <Grid>
            <Card variant="outlined" sx={{ maxWidth: 230 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 20 }}>{workout.name}</Typography>
                    <Typography sx={{ fontSize: 15 }}>{formatDate(workout.completed_at)}</Typography>
                    <CardActions>
                        <Button onClick={handleDetailView}>Details</Button>
                        <Button>
                            <DeleteIcon
                                onClick={() => handleDelete(workout.id)}
                                className="delete-icon"
                            ></DeleteIcon>
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default WorkoutItem;