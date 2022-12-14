import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import './AddExercise.css';

// MUI
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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

const AddExercise = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { workout_id } = useParams();
  const { exercise_id } = useParams();

  const [exerciseName, setExerciseName] = useState("");
  const [setList, setSetList] = useState([]);
  const [notesField, setNotesField] = useState("");

  useEffect(() => {
    if (exercise_id) { // Return false if exercise_id is undefined
      axios.get(`/api/exercise/sets/${exercise_id}`).then(response => {
        const exercise = response.data;
        if (exercise) {
          const setList = exercise.sets;
          console.log('this is response:', response);
          setExerciseName(exercise.name);
          setSetList(setList);
          setNotesField(exercise.notes);
        }
      }).catch(error => {
        console.log(error);
        alert('Something went wrong!');
      })
    } // else do nothing
  }, [exercise_id]);

  const handleSetChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...setList];
    list[index][name] = value;
    setSetList(list);
  };

  const handleNotesChange = (e) => {
    const { value } = e.target;
    setNotesField(value);
  };

  // Adding Set
  const handleAddInput = () => {
    console.log("clicking add set");
    setSetList([...setList, { set_number: "", reps: "", weight: "" }]);
  };

  // Deleting Set
  const deleteSet = (index) => {
    const list = [...setList];
    list.splice(index, 1);
    setSetList(list);
  };

  const handleSubmit = (event) => {
    // Don't reload on form submit
    event.preventDefault();
    if (exercise_id) {
      // EDIT AN EXISTING EXERCISE
      dispatch({ type: 'EDIT_EXERCISE', payload: { exerciseName, setList, notes: notesField, workout_id, exercise_id }, history });
    } else {
      // ADD AN EXERCISE
      dispatch({
        type: "ADD_EXERCISE",
        payload: {
          name: exerciseName,
          sets: setList,
          notes: notesField,
          workout_id: id
        },
      }
      )
      history.goBack();
    };
  };

  return (
    <Box className="container">
      <ThemeProvider theme={theme}>
        <center>
          <div className="add-container">
            <h3 className="App-header">{exercise_id ? 'Edit Exercise' : 'Add Exercise'}</h3>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                name="name"
                placeholder="name of exercise"
                value={exerciseName}
                onChange={(event) =>
                  setExerciseName(event.target.value)
                }
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
                      onChange={(e) => handleSetChange(e, i)}
                    />
                    <TextField
                      type="text"
                      name="reps"
                      size="small"
                      sx={{ width: 75 }}
                      placeholder="reps"
                      value={set.reps}
                      onChange={(e) => handleSetChange(e, i)}
                    />
                    <TextField
                      type="text"
                      name="weight"
                      size="small"
                      sx={{ width: 75 }}
                      placeholder="weight"
                      value={set.weight}
                      onChange={(e) => handleSetChange(e, i)}
                    />
                    <Button type="button" value="Remove" onClick={() => deleteSet(i)}>
                      X
                    </Button>
                    <br />
                    <br />
                  </div>
                );
              })}
              <br />
              <Button color="primary" variant="outlined" type="button" value="Add" onClick={handleAddInput}>
                + Add a Set
              </Button>
              <br />
              <br />
              <div className="box">
                <TextField
                  type="text"
                  name="notes"
                  multiline
                  placeholder="notes"
                  value={notesField}
                  onChange={(e) => handleNotesChange(e)}
                />
                <br />
                <br />
              </div>
              <br />
              <Button color="primary" variant="contained" onClick={() => history.goBack()}>Cancel</Button>
              {/* This button should save all of the input fields and title and post them to the exercise page */}
              <Button color="secondary" variant="contained" type="submit">Save</Button>
            </form>
          </div>
        </center>
      </ThemeProvider>
    </Box>
  );
};

export default AddExercise;