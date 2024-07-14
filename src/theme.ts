import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#673ab7', 
    },
    secondary: {
      main: '#ff9800', 
    },
    background: {
      default: '#2c2c2c', 
      paper: '#424242', 
    },
    text: {
      primary: '#ffffff', 
      secondary: '#bdbdbd', 
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#424242', 
        },
      },
    },
  },
});

export default theme;
