import React, { useState, useEffect, useContext } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants';

const ListPrograms = () => {
  const { token } = useContext(AuthContext);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${BASE_URL}/programs/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setPrograms(response.data);
      } catch (err) {
        setError('Failed to fetch programs');
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, [token]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        All Programs
      </Typography>
      {programs.length === 0 ? (
        <Typography color="text.secondary">No programs available</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><Typography fontWeight="bold">Name</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Description</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Created By</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Created At</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {programs.map((program) => (
                <TableRow
                  key={program.id}
                  hover
                  sx={{
                    '&:hover': { backgroundColor: '#e3f2fd' },
                    transition: 'background-color 0.2s',
                  }}
                >
                  <TableCell>{program.name}</TableCell>
                  <TableCell>{program.description}</TableCell>
                  <TableCell>{program.doctor_details?.username || 'Unknown'}</TableCell>
                  <TableCell>{new Date(program.date_created).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ListPrograms;