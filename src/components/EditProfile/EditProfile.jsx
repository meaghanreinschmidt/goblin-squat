import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios';

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
        <>
            <center>
                <br />
                <br />
                <FitnessCenterIcon></FitnessCenterIcon>
                <form onSubmit={updateProfile}>
                    <div>
                        <label htmlFor="name">
                            Name:
                            <TextField
                                type="text"
                                name="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            /> 
                        </label>
                    </div>
                    <div>
                        <label htmlFor="current_gym">
                            Current Gym:
                            <TextField  
                                type="text"
                                name="current_gym"
                                value={currentGym}
                                onChange={(event) => setCurrentGym(event.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="favorite_lift">
                            Favorite Lift:
                            <TextField
                                type="text"
                                name="favorite_lift"
                                value={favoriteLift}
                                onChange={(event) => setFavoriteLift(event.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <input type="submit" />
                    </div>
                </form>
            <Button onClick={() => history.push('/user/profile')}>Back</Button>
            </center>
        </>
    )
}

export default EditProfile;