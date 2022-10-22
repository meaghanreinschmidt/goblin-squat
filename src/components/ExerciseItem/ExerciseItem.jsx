import { HashRouter as Router, Route, Link, useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTaskIcon from '@mui/icons-material/AddTask';

function ExerciseItem({exercise}) {
    const history = useHistory();

    const handleEditView = () => {
      console.log('clicked into handleEditView');
      history.push(`/edit/exercise/${exercise.id}`);
    }
    return (
        <Grid>
          <Card variant="outlined" sx={{ maxWidth: 230 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }}>{exercise.name}</Typography>
              <CardActions>
                {/* This button should take the user to the edit page */}
                <Button onClick={handleEditView}>
                  <EditIcon className="edit-icon"></EditIcon>
                </Button>
                <Button>
                  <DeleteIcon className="delete-icon"></DeleteIcon>
                </Button>
                <Button onClick={() => history.push('/log/exercise')}>
                  <AddTaskIcon className="log-icon"></AddTaskIcon>
                </Button>
              </CardActions>
            </CardContent>
          </Card>
          <br />
          </Grid>
    )
}

export default ExerciseItem;