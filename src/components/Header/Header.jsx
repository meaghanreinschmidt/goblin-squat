import React from 'react';
import './Header.css';

// MUI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import goblinSquatLogo from '../../images/goblin.jpg';

const Header = () => {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    // Open dialog page for About Goblin Squat
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <>
            <center>
                <header className="App-main-header">
                    <Avatar onClick={handleClickOpen('paper')} src={goblinSquatLogo} sx={{ width: 70, height: 70 }} />
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        scroll={scroll}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                    >
                        <DialogTitle id="scroll-dialog-title">About Goblin Squat</DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                            <DialogContentText
                                id="scroll-dialog-descriiption"
                                ref={descriptionElementRef}
                                tabIndex={-1}
                            >
                                <h3>Technologies Used</h3>
                                HTML, CSS, JavaSCript, Node.js,
                                Express.js, React, Redux, Redux Sagas,
                                Material UI, PostgresSQL
                                <br />
                                <h3>Reflections</h3>
                                The most challenging aspect of this project
                                was targeting and pulling data throughout the many different pages of this app.
                                I am excited to implement the Progress Chart so users can track their progress for different workouts and exercises.
                                <br />
                                <h3>Ackowledgements</h3>
                                My partner Maddie, friends, and family
                                Prime faculty and staff
                                Members of the Phrygian cohort
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </header>
            </center>
        </>
    )
}

export default Header;