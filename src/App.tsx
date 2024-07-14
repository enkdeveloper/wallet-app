import React from 'react';
import './App.css';
import PythData from './pyth/PythData';
import Swap from './swap/Swap';
import { Container, CssBaseline, AppBar, Toolbar, Box, ThemeProvider, Button, Grid } from '@mui/material';
import theme from './theme';
import logo from './logo.png'; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'center' }}>
          <img src={logo} alt="Logo" style={{ width: '90px', margin: '20px' }} />
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box my={4} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Button variant="contained" color="secondary" style={{ backgroundColor: '#673ab7', color: '#ffffff', marginBottom: '16px' }} disabled>
            Connect Wallet (Disabled)
          </Button>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <PythData />
          </Grid>
          <Grid item xs={12}>
            <Swap />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
