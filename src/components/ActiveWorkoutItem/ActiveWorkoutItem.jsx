import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';

// MUI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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

function ActiveWorkoutItem({ workout }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleDetails = () => {
        console.log('clicked on single workout');
        // dispatch({ type: 'FETCH_ONE_MOVIE', payload: movie.id})
        history.push(`/workout/details/${workout.id}`);
    }

    const handleDelete = (id) => {
        console.log('handling delete', id);
        dispatch({ type: 'DELETE_WORKOUT', payload: id });
        setOpen(false);
    }

    const handleComplete = (id) => {
        console.log('handling complete', id);
        dispatch({ type: 'COMPLETE_WORKOUT', payload: id });
    }

    return (
        <Grid>
            <Card variant="outlined" sx={{ maxWidth: 230 }}>
                <CardContent>
                    <ThemeProvider theme={theme}>
                        <Typography>{workout.name}</Typography>
                        <Button onClick={handleDetails}>
                            <EditIcon className="edit-icon"></EditIcon>
                        </Button>
                        <Button>
                            <DeleteIcon
                                onClick={handleClickOpen}
                                // onClick={() => handleDelete(workout.id)}
                                className="delete-icon"
                            ></DeleteIcon>
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Are you sure?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you want to delete this workout?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button color="primary" onClick={handleClose}>Cancel</Button>
                                <Button color="secondary" onClick={() => handleDelete(workout.id)} autoFocus>
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Button>
                            <CheckCircleOutlineIcon
                                onClick={() => handleComplete(workout.id)}
                                className="complete-icon"
                            ></CheckCircleOutlineIcon>
                        </Button>
                    </ThemeProvider>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default ActiveWorkoutItem;