import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddExercise = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [exerciseName, setExerciseName] = useState({name: ""});
    const [setList, setSetList] = useState([]);
    const [noteField, setNoteField]= useState([]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...setList];
        list[index][name] = value;
        setSetList(list);
    }

    const handleNoteChange = (e, index) => {
        const { name, value } = e.target;
        const field = [...noteField];
        field[index][name] = value;
        setNoteField(field);
    }

    // Adding Set
    const handleAddInput = () => {
        console.log('clicking add set');
        setSetList([...setList, {set_number: "", reps: "", weight: ""}]);
    }

    // Adding Note
    const handleAddNote = () => {
        console.log('clicking add note');
        setNoteField([...noteField, {notes: ""}]);
    }

    // Update to DELETE dispatch/axios eventually 
    const deleteSet = index => {
        const list = [...setList];
        list.splice(index, 1);
        setSetList(list);
    }

    // Update to DELETE dispatch/axios eventually
    const deleteNote = index => {
        const field = [...noteField];
        field.splice(index, 1);
        setNoteField(field);
    }

    // const addExercise = event => {
    //     // Don't reloaad on form submit
    //     event.preventDefault();
    //     // Tell redux that we want to add a new exercise
    //     console.log('Adding exercise name', {exerciseName});
    //     // DISPATCHS HERE -- examples commented out
    //     dispatch({ type: 'SET_EXERCISE', payload: {exerciseName: exerciseName}});
    //     history.push('/');
    //     // post exercise.name/card to home
    //     // post name, set.set_number, set.reps, set.weight to edit exercise/complete exercise
    // }

    return (
        <center>
        <TextField 
            type="text"
            name="name"
            placeholder="name of exercise"
            value={exerciseName.name}
            onChange={(event) => setExerciseName({...exerciseName, name: event.target.value})}
        />
        <br />
        <br />
        {setList.map((set, i) => {
            return (
                <div key={i} className="box">
                    <TextField 
                        type="number"
                        name="set_number"
                        size="small"
                        sx={{ width: 75 }}
                        placeholder="set #"
                        value={set.set_number}
                        onChange={e => handleChange(e, i)}
                    />
                    <TextField 
                        type="text"
                        name="reps"
                        size="small"
                        sx={{ width: 75 }}
                        placeholder="reps"
                        value={set.reps}
                        onChange={e => handleChange(e, i)}
                    />
                    <TextField 
                        type="text"
                        name="weight"
                        size="small"
                        sx={{ width: 75 }}
                        placeholder="weight"
                        value={set.weight}
                        onChange={e => handleChange(e, i)}
                    />
                    <Button
                        type="button"
                        value="Remove"
                        onClick={() => deleteSet(i)}
                    >X</Button>
                    <br />
                    <br />
                </div>
            )
        })}
        <Button
            type="button"
            value="Add"
            onClick={handleAddInput}
            >+ Add a Set
        </Button>
        <br />
        {noteField.map((note, i) => {
            return (
                <div key={i} className="box">
                    <TextField
                        type="text"
                        name="notes"
                        multiline
                        placeholder="notes"
                        value={note.notes}
                        onChange={e => handleNoteChange(e, i)}
                    />
                    <Button 
                        type="button"
                        value="Remove"
                        onClick={() => deleteNote(i)}
                    >X</Button>
                    <br />
                    <br />
                </div>
            )
        })}
        <Button 
            type="button"
            value="Add"
            onClick={handleAddNote}
            >+ Add a Note
        </Button>
        <br />
        <Button onClick={() => history.push('/')}>Cancel</Button>
        {/* This button should save all of the input fields and title and post them to the home page */}
        <Button>Save</Button>
        </center>
    )
}


export default AddExercise;