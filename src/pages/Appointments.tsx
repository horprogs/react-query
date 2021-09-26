import React from 'react';
import { Box } from '@mui/material';
import UsersList from '../components/UsersList/UsersList';
import UsersSummary from '../components/UsersSummary/UsersSummary';

const Appointments = () => {
  return (
    <Box>
      <UsersSummary />
      <UsersList />
    </Box>
  );
};

export default Appointments;
