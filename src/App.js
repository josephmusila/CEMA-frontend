import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography, IconButton, Container } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { AuthContext } from './context/AuthContext';
import { lightTheme, darkTheme } from './theme';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import ClientProfile from './components/ClientProfile';

function App() {
  const { token, themeMode, toggleTheme } = useContext(AuthContext);
  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Health System
            </Typography>
            <IconButton onClick={toggleTheme} color="inherit">
              {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
            {token && (
              <Typography
                variant="body1"
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
                sx={{ cursor: 'pointer', ml: 2 }}
              >
                Logout
              </Typography>
            )}
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
            {/* <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <Register />} /> */}
            <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/client/:id" element={token ? <ClientProfile /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;