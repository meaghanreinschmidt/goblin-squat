import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddExercise = () => {
    const history = useHistory();
    return (
        <>
            <center>
                <TextField placeholder="title of workout"></TextField>
                <br />
                {/* This button should add a set with a number and two input fields and a delete button */}
                <Button>+ Add a Set</Button>
                <br />
                {/* This button should add one text block and a delete button*/}
                <Button>+ Add a Note Block</Button>
                <br />
                {/* This button takes the user back to the home page */}
                <Button onClick={() => history.push('/')}>Cancel</Button>
                {/* This button should save and post the exercise to the home page */}
                <Button>Save</Button> 
            </center>
        </>
    )
}

export default AddExercise;