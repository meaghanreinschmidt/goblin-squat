import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const AddExercise = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { workout_id } = useParams();
  const { exercise_id } = useParams();
  const params = useParams();
  // console.log('id:', id);
  // console.log('this is params:', JSON.stringify(params));
  // console.log(params.workout_id)
  

  const [exerciseName, setExerciseName] = useState("");
  const [setList, setSetList] = useState([]);
  const [notesField, setNotesField] = useState("");
  // console.log(workout_id);
  useEffect(() => {
      if (exercise_id) { // Return false if exercise_id is undefined
        axios.get(`/api/workout/${workout_id}`).then(response => {
          const exercise = response.data;
          setExerciseName(exercise.name);
          setSetList(setList);
          setNotesField(notesField);
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
      dispatch({ type: 'EDIT_EXERCISE', payload: {exerciseName, setList, notesField, workout_id, exercise_id}, history });
    } else {
      // ADD AN EXERCISE
      dispatch({
        type: "ADD_EXERCISE",
        payload: {
          name: exerciseName.name,
          sets: setList,
          notes: notesField,
          workout_id: id
      },
    }
    
    )
    history.goBack();};
  };

  return (
    <center>
      <h1>{ exercise_id ? 'Edit Exercise' : 'Add Exercise' }</h1>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="name"
          placeholder="name of exercise"
          value={exerciseName.name}
          onChange={(event) =>
            setExerciseName({ ...exerciseName, name: event.target.value })
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
        <Button type="button" value="Add" onClick={handleAddInput}>
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
            value={notesField.notes}
            onChange={(e) => handleNotesChange(e)}
          />
          <br />
          <br />
        </div>
        <br />
        <Button onClick={() => history.goBack()}>Cancel</Button>
        {/* This button should save all of the input fields and title and post them to the home page */}
        <Button type="submit">Save</Button>
      </form>
    </center>
  );
};

export default AddExercise;