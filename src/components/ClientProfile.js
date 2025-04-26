import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Assignment as ProgramIcon,
  AccountCircle as ProfileIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { styled } from '@mui/material/styles';
import { BASE_URL } from '../constants';

// Styled component for the card
const ProfileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
}));

// Styled component for list items with hover effect
const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: 8,
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: '#e3f2fd',
    transition: 'background-color 0.2s',
  },
}));

const ClientProfile = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${BASE_URL}/clients/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setClient(response.data);
      } catch (err) {
        setError('Failed to fetch client profile');
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [id, token]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        {error}
      </Alert>
    );
  }
  if (!client) return null;

  return (
    <ProfileCard elevation={3}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
          <ProfileIcon />
        </Avatar>
        <Typography variant="h5" color="primary" fontWeight="bold">
          Client Profile
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />

     
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Personal Information
        </Typography>
        <List dense>
          <StyledListItem>
            <ListItemIcon>
              <PersonIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Name"
              secondary={`${client.first_name} ${client.last_name}`}
              primaryTypographyProps={{ fontWeight: 'medium' }}
            />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <EmailIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Email"
              secondary={client.email}
              primaryTypographyProps={{ fontWeight: 'medium' }}
            />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <CalendarIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Date of Birth"
              secondary={client.date_of_birth}
              primaryTypographyProps={{ fontWeight: 'medium' }}
            />
          </StyledListItem>
        </List>
      </Box>

      {/* Enrolled Programs */}
      <Box>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Enrolled Programs
        </Typography>
        {client.enrollments.length === 0 ? (
          <Typography color="text.secondary" sx={{ ml: 2 }}>
            No programs enrolled
          </Typography>
        ) : (
          <List dense>
            {client.enrollments.map((enrollment) => (
              <StyledListItem key={enrollment.id}>
                <ListItemIcon>
                  <ProgramIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={enrollment.program.name}
                  secondary={`Enrolled on: ${enrollment.enrolled_date}`}
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
              </StyledListItem>
            ))}
          </List>
        )}
      </Box>
    </ProfileCard>
  );
};

export default ClientProfile;