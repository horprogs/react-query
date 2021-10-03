import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useGetProfile } from '../../api/auth';

type Props = {};

const UserProfile = ({}: Props) => {
  const { data: user, isLoading } = useGetProfile();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="flex-end">
        <CircularProgress color="inherit" size={24} />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="flex-end">
      {user ? `User: ${user.name}` : 'Unauthorized'}
    </Box>
  );
};

export default UserProfile;
