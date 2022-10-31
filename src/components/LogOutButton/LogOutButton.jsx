import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2d2d2d'
    }
  }
})

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <ThemeProvider theme={theme}>
    <Button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      variant="contained"
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </Button>
    </ThemeProvider>
  );
}

export default LogOutButton;
