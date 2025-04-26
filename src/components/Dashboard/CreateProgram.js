
import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Box, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants';

const CreateProgram = () => {
  const { token,id } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.post(
        `${BASE_URL}/programs/`,
        { name, description,doctor:id },
        { headers: { Authorization: `Token ${token}` } }
      );
      setMessage('Program created successfully');
      setSeverity('success');
      setName('');
      setDescription('');
    } catch (err) {
      setMessage(err.response?.data?.name?.[0] || 'Failed to create program');
      setSeverity('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Create Health Program
      </Typography>
      {message && <Alert severity={severity} sx={{ mb: 2 }}>{message}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Program Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Creating...' : 'Create Program'}
        </Button>
      </form>
    </Box>
  );
};

export default CreateProgram;