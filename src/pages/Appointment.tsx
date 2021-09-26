import React, { useRef, useState } from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import {
  useGetAppointment,
  useGetInsurance,
  usePrefetchCarDetails,
} from '../api/appointments';
import { useParams } from 'react-router-dom';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CarDetails from '../components/CarDetails/CarDetails';
import Jobs from '../components/Jobs/Jobs';
import History from '../components/History/History';
import ServicesList from '../components/ServicesList/ServicesList';
import Skeleton from '@mui/material/Skeleton';

const Appointment = () => {
  const prefetched = useRef<boolean>();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetAppointment(+id);
  const { data: insurance } = useGetInsurance(data?.hasInsurance ? +id : null);
  const [showAdditional, setShowAdditional] = useState(false);
  const prefetchCarDetails = usePrefetchCarDetails(+id);

  if (isLoading) {
    return (
      <Box>
        <Box mb={2}>
          <Card>
            <Skeleton variant="rectangular" height={303} animation="wave" />
          </Card>
        </Box>

        <Box mb={2}>
          <Card>
            <Skeleton variant="rectangular" height={173} animation="wave" />
          </Card>
        </Box>

        <Box mb={2}>
          <Card>
            <Skeleton variant="rectangular" height={125} animation="wave" />
          </Card>
        </Box>

        <Box mb={2}>
          <Card>
            <Skeleton variant="rectangular" height={145} animation="wave" />
          </Card>
        </Box>
      </Box>
    );
  }

  if (!data) {
    return <>No data</>;
  }

  return (
    <>
      <Card>
        <Box p={2}>
          <Typography display="block" variant="h3" component="h3">
            {data.name} {insurance?.allCovered && <DoneAllIcon />}
          </Typography>
          <Box mt={3}>
            <ServicesList checked={data.services} onChange={() => {}} />
          </Box>
        </Box>
      </Card>
      <Box mt={2}>
        <Card>
          <Box p={2}>
            <Typography display="block" variant="h4" component="h4">
              History
            </Typography>
            <History id={+id} />
          </Box>
        </Card>
      </Box>
      <Box
        mt={2}
        onMouseEnter={() => {
          if (!prefetched.current) {
            prefetchCarDetails();
            prefetched.current = true;
          }
        }}
      >
        <Card>
          <Box p={2}>
            <Typography display="block" variant="h4" component="h4">
              Additional
            </Typography>
            <Box mt={2}>
              {!showAdditional ? (
                <Button
                  variant="outlined"
                  size="medium"
                  color="primary"
                  onClick={() => {
                    setShowAdditional(true);
                  }}
                >
                  Show
                </Button>
              ) : (
                <CarDetails id={+id} />
              )}
            </Box>
          </Box>
        </Card>
      </Box>
      <Box mt={2}>
        <Card>
          <Box p={2}>
            <Typography display="block" variant="h4" component="h4">
              Jobs
            </Typography>
            <Jobs appointmentId={data.id} />
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default Appointment;
