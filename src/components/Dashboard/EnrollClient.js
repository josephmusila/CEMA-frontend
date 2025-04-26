
import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Typography, Box, CircularProgress, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants';

const EnrollClient = () => {
  const { token } = useContext(AuthContext);
  const [clients, setClients] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [clientId, setClientId] = useState('');
  const [programId, setProgramId] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsRes, programsRes] = await Promise.all([
          axios.get(`${BASE_URL}/clients`, {
            headers: { Authorization: `Token ${token}` },
          }),
          axios.get(`${BASE_URL}/programs/`, {
            headers: { Authorization: `Token ${token}` },
          }),
        ]);
        setClients(clientsRes.data);
        setPrograms(programsRes.data);
      } catch (err) {
        setMessage('Failed to fetch data');
        setSeverity('error');
      }
    };
    fetchData();
  }, [token]);

  const handleSubmit = async (e) => {
    console.log('Submitting form');
    console.log('Client ID:', clientId);
    console.log('Program ID:', programId);
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.post(
        `${BASE_URL}/enrollments/`,
        { client: clientId, program_id: programId },
        { headers: { Authorization: `Token ${token}` } }
      );
      setMessage('Client enrolled successfully');
      setSeverity('success');
      setClientId('');
      setProgramId('');
    } catch (err) {
      setMessage(err.response?.data?.non_field_errors?.[0] || 'Failed to enroll client');
      setSeverity('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Enroll Client in Program
      </Typography>
      {message && <Alert severity={severity} sx={{ mb: 2 }}>{message}</Alert>}
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Client</InputLabel>
          <Select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            label="Client"
            disabled={loading}
          >
            <MenuItem value="">Select Client</MenuItem>
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.first_name} {client.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Program</InputLabel>
          <Select
            value={programId}
            onChange={(e) => setProgramId(e.target.value)}
            label="Program"
            disabled={loading}
          >
            <MenuItem value="">Select Program</MenuItem>
            {programs.map((program) => (
              <MenuItem key={program.id} value={program.id}>{program.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading || !clientId || !programId}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Enrolling...' : 'Enroll Client'}
        </Button>
      </form>
    </Box>
  );
};

export default EnrollClient;