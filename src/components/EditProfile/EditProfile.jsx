import { useSelector } from 'react-redux';

const EditProfile = () => {
    const user = useSelector((store) => store.user);
    
    return (
        <>
            <center>
                <h5>AVATAR HERE</h5>
                <h5>username: {user.username}</h5>
            </center>
        </>
    )
}

export default EditProfile;