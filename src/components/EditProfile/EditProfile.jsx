import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './EditProfile.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#2d2d2d'
      }
    }
  })

const EditProfile = () => {
    const history = useHistory();
    const user = useSelector((store) => store.user);
    const [name, setName] = useState(user.name);
    const [currentGym, setCurrentGym] = useState(user.current_gym);
    const [favoriteLift, setFavoriteLift] = useState(user.favorite_lift);
    const dispatch = useDispatch();

    const updateProfile = (event) => {
        event.preventDefault();
        console.log('update profile');
        axios.put(`/api/user/${user.id}`, { name: name, current_gym: currentGym, favorite_lift: favoriteLift})
            .then(() => {
                dispatch({ type: 'FETCH_USER' });
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong!');
            });
        history.push('/user/profile');
    };


    
    return (
        <Box className="container">
            <center>
                <div className="edit-profile-container">
                <br />
                <br />
                <FitnessCenterIcon></FitnessCenterIcon>
                <form onSubmit={updateProfile}>
                    <div>
                        <label htmlFor="name">
                            Name:
                            <br />
                            <TextField
                                type="text"
                                name="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            /> 
                        </label>
                        <br />
                    </div>
                    <div>
                        <label htmlFor="current_gym">
                            Current Gym:
                            <br />
                            <TextField  
                                type="text"
                                name="current_gym"
                                value={currentGym}
                                onChange={(event) => setCurrentGym(event.target.value)}
                            />
                        </label>
                        <br />
                    </div>
                    <div>
                        <label htmlFor="favorite_lift">
                            Favorite Lift:
                            <br />
                            <TextField
                                type="text"
                                name="favorite_lift"
                                value={favoriteLift}
                                onChange={(event) => setFavoriteLift(event.target.value)}
                            />
                        </label>
                    </div>
                    <br />
                    <div>
                        <ThemeProvider theme={theme}>
                        <Button variant="contained" type="submit">Save</Button>
                        </ThemeProvider>
                    </div>
                </form>
                <br />
                <ThemeProvider theme={theme}>
            <Button variant="outlined" onClick={() => history.push('/user/profile')}>Back</Button>
            </ThemeProvider>
            </div>
            </center>
        </Box>
    )
}

export default EditProfile;