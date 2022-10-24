import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function ActiveWorkoutItem({workout}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const handleDetails = () => {
        console.log('clicked on single workout');
        // dispatch({ type: 'FETCH_ONE_MOVIE', payload: movie.id})
        history.push(`/workout/details/${workout.id}`);
    }

    const handleDelete = (id) => {
        console.log('handling delete', id);
        dispatch({ type: 'DELETE_WORKOUT', payload: id});
    }

    const handleComplete = (id) => {
        console.log('handling complete', id);
        dispatch({ type: 'COMPLETE_WORKOUT', payload: id});
    }

    return (
        <Grid>
            <Card>
                <CardContent>
                    <Typography>{workout.name}</Typography>
                    <Button onClick={handleDetails}>
                        <EditIcon className="edit-icon"></EditIcon>
                    </Button>
                    <Button>
                        <DeleteIcon
                            onClick={() => handleDelete(workout.id)}
                            className="delete-icon"
                        ></DeleteIcon>
                    </Button>
                    <Button>
                    <CheckCircleOutlineIcon
                        onClick={() => handleComplete(workout.id)}
                        className="complete-icon"
                    ></CheckCircleOutlineIcon>
                    </Button>
                    {/* <Button onClick={() => history.push("/add/exercise")}>
                    Add Exercise
                    </Button> */}
                </CardContent>
            </Card>
        </Grid>
    )
}

export default ActiveWorkoutItem;