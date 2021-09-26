import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { useGetAppointmentsList } from '../../api/appointments';
import Skeleton from '@mui/material/Skeleton';

const UsersSummary = () => {
  const { data: list, isLoading } = useGetAppointmentsList();

  if (!isLoading && !list) {
    return null;
  }

  return (
    <Box mb={2}>
      <Card>
        <Box p={2}>
          <Typography>
            Total appointments:{' '}
            {isLoading ? (
              <Skeleton
                animation="wave"
                variant="rectangular"
                height={15}
                width="60%"
              />
            ) : (
              list!.pages[0].count
            )}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default UsersSummary;
