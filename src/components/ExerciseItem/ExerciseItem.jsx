import {
  HashRouter as Router,
  Route,
  Link,
  useHistory,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function ExerciseItem({exercise}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleView = () => {
    console.log('clicked on single exercise');
    history.push(`/exercise/details/${exercise.id}`);
  }

  const handleDelete = (inputId) => {
    console.log("handling Delete", id);
    dispatch({ type: "DELETE_EXERCISE", payload: inputId });
  };

  const handleComplete = (exerciseId) => {
    console.log("clicked on complete button");
    dispatch({ type: "CLICK_COMPLETE_EXERCISE", payload: exerciseId });
  };

  return (
    <Grid>
      <Card variant="outlined" sx={{ maxWidth: 230 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }}>{exercise.name}</Typography>
          <CardActions>
            {/* This button should take the user to the edit page */}
            <Button onClick={handleView}>
              <EditIcon className="edit-icon"></EditIcon>
            </Button>
            <Button>
              <DeleteIcon
                onClick={() => handleDelete(id)}
                className="delete-icon"
              ></DeleteIcon>
            </Button>
            <Button>
              <CheckCircleOutlineIcon
                onClick={() => handleComplete(id)}
                className="complete-icon"
              ></CheckCircleOutlineIcon>
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      <br />
    </Grid>
  );
}

export default ExerciseItem;