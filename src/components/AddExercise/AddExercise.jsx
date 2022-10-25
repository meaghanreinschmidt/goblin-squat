import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddExercise = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log('id:', id);

  // const exercise = useSelector((store) => store.exercises);
  // const set = useSelector((store) => store.set);
  // const workout = useSelector((store) => store.workout);
  const [exerciseName, setExerciseName] = useState("");
  const [setList, setSetList] = useState([]);
  const [notesField, setNotesField] = useState("");

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = () => {
    dispatch({ type: 'FETCH_EXERCISES' });
  };


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

  // const deleteNote = (index) => {
  //   const field = [...notesField];
  //   field.splice(index, 1);
  //   setNotesField(field);
  // };

  const handleSubmit = (event) => {
    // Don't reload on form submit
    event.preventDefault();
    // Tell redux that we want to add a new exercise
    //   console.log('Adding exercise name', {exerciseName});
    // DISPATCH HERE -- examples commented out
    dispatch({
      type: "ADD_EXERCISE",
      payload: {
        name: exerciseName.name,
        sets: setList,
        notes: notesField,
        workout_id: id
      },
    });
    history.push('/');
    // post exercise.name/card to home
    // post name, set.set_number, set.reps, set.weight to edit exercise/complete exercise
  };

  return (
    <center>
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
        <Button type="button" value="Add" onClick={handleAddInput}>
          + Add a Set
        </Button>
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
          {/* <Button type="button" value="Remove" onClick={() => deleteNote(i)}>
            X
          </Button> */}
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