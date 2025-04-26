import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Box, CircularProgress, Alert, List, ListItem, ListItemText, Link } from '@mui/material';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants';

const SearchClients = () => {
  const { token } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.get(`${BASE_URL}/clients/?search=${searchTerm}`, {
        headers: { Authorization: `Token ${token}` },
      });
      setClients(response.data);
      setMessage(response.data.length === 0 ? 'No clients found' : '');
    } catch (err) {
      setMessage('Failed to search clients');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Search Clients
      </Typography>
      {message && <Alert severity={message.includes('Failed') ? 'error' : 'info'} sx={{ mb: 2 }}>{message}</Alert>}
      <form onSubmit={handleSearch}>
        <TextField
          label="Search by name or email"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={loading}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </form>
      <List sx={{ mt: 2 }}>
        {clients.map((client) => (
          <ListItem key={client.id} divider>
            <ListItemText
              primary={`${client.first_name} ${client.last_name}`}
              secondary={client.email}
            />
            <Link component={RouterLink} to={`/client/${client.id}`} sx={{ ml: 2 }}>
              View Profile
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchClients;