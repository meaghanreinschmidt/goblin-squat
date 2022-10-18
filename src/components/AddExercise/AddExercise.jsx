import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddExercise = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    // Only saving exercise name on this form
    // const [exerciseName, setExerciseName] = useState({
    //     name: "" 
    // });

    const [setList, setSetList] = useState([]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;

        const list = [...setList];
        list[index][name] = value;
        setSetList(list);
    }

    const handleAddInput = () => {
        console.log('clicking add set');
        setSetList([...setList, {set_number: "", reps: "", weight: ""}]);
    }

    // Update to DELETE dispatch/axios eventually 
    const deleteSet = index => {
        const list = [...setList];
        list.splice(index, 1);
        setSetList(list);
    }

    const addExercise = event => {
        // Don't reloaad on form submit
        event.preventDefault();
        // Tell redux that we want to add a new exercise
        console.log('Adding exercise name', {exerciseName});
        // DISPATCHS HERE -- examples commented out
        dispatch({ type: 'SET_EXERCISE', payload: {exerciseName: exerciseName}});
        history.push('/');
        // post exercise.name/card to home
        // post name, set.set_number, set.reps, set.weight to edit exercise/complete exercise
    }

    return (
        <center>

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
                </div>
            )
        })}
        <Button
            type="button"
            value="Add"
            onClick={handleAddInput}
            >+ Add a Set</Button>
        </center>
    )
}


export default AddExercise;