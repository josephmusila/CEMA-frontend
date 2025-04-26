import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Box, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants';

const RegisterClient = () => {
  const { token } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.post(
        `${BASE_URL}/clients/`,
        {
          first_name: firstName,
          last_name: lastName,
          email,
          date_of_birth: dob,
        },
        { headers: { Authorization: `Token ${token}` } }
      );
      setMessage('Client registered successfully');
      setSeverity('success');
      setFirstName('');
      setLastName('');
      setEmail('');
      setDob('');
    } catch (err) {
      setMessage(err.response?.data?.email?.[0] || 'Failed to register client');
      setSeverity('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Register New Client
      </Typography>
      {message && <Alert severity={severity} sx={{ mb: 2 }}>{message}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={loading}
        />
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={loading}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <TextField
          label="Date of Birth"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          disabled={loading}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Registering...' : 'Register Client'}
        </Button>
      </form>
    </Box>
  );
};

export default RegisterClient;