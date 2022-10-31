import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

// MUI
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from "@mui/icons-material/Delete";
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Page Colors
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

function WorkoutItem({ workout }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleDetailView = () => {
        console.log('clicked into handleDetailView');
        history.push(`/workout/completed/${workout.id}`)
    }

    const handleDelete = (id) => {
        console.log('handling delete', id);
        dispatch({ type: 'DELETE_WORKOUT', payload: id });
        setOpen(false);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    }

    return (
        <Grid>
            <Card variant="outlined" sx={{ maxWidth: 230 }}>
                <CardContent>
                    <ThemeProvider theme={theme}>
                        <Typography sx={{ fontSize: 20 }}>{workout.name}</Typography>
                        <Typography sx={{ fontSize: 15 }}>{formatDate(workout.completed_at)}</Typography>
                        <Button>
                            <ViewTimelineIcon
                                onClick={handleDetailView}>
                            </ViewTimelineIcon>
                        </Button>
                        <Button>
                            <DeleteIcon
                                onClick={handleClickOpen}
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
                    </ThemeProvider>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default WorkoutItem;