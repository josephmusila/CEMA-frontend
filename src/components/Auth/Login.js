// src/components/Auth/Login.js
import React, { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants';

const Login = () => {
  const { setToken,setId } = useContext(AuthContext);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${BASE_URL}/login/`, { username, password });
     
      setToken(response.data.token);
      setId(response.data.id)
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.non_field_errors?.[0] || 'Login failed');
    } finally {
      setLoading(false);
    }
  };


  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom align="center">
        Doctor Login
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleTogglePassword}
                  edge="end"
                  disabled={loading}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        {/* <Button href="/register" variant="text" fullWidth sx={{ mt: 1 }}>
          Register as Doctor
        </Button> */}
      </form>
    </Box>
  );
};

export default Login;