import React, { useRef, useState } from 'react';
import { Box, Button, Card, CircularProgress, Typography } from '@mui/material';
import {
  useGetAppointment,
  useGetInsurance,
  usePatchAppointment,
  usePrefetchCarDetails,
} from '../api/appointments';
import { useParams } from 'react-router-dom';
import ServicesCheck from '../components/ServicesCheck';
import Skeleton from '@mui/material/Skeleton';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CarDetails from '../components/CarDetails/CarDetails';
import Jobs from '../components/Jobs/Jobs';

const Appointment = () => {
  const prefetched = useRef<boolean>();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isFetching } = useGetAppointment(+id);
  const { data: insurance } = useGetInsurance(data?.hasInsurance ? +id : null);
  const mutation = usePatchAppointment(+id, (oldData, newData) => {
    return newData;
  });
  const [showAdditional, setShowAdditional] = useState(false);
  const prefetchCarDetails = usePrefetchCarDetails(+id);

  const onChangeServices = () => {};

  const onSubmit = () => {
    mutation.mutate([data!]);
  };

  if (isLoading) {
    return <CircularProgress />;
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
            <ServicesCheck
              checked={data.services}
              onChange={onChangeServices}
            />
          </Box>
        </Box>
      </Card>
      <Box mt={2}>
        <Card>
          <Box p={2}>
            <Typography display="block" variant="h4" component="h4">
              History
            </Typography>
            {isFetching ? (
              <>
                <Box pt={2}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height={15}
                  />
                </Box>
                <Box pt={2}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height={15}
                  />
                </Box>
                <Box pt={2}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height={15}
                  />
                </Box>
              </>
            ) : (
              data!.history.map((item) => (
                <Typography variant="body1" key={item.date}>
                  Date: {item.date} <br />
                  Comment: {item.comment}
                </Typography>
              ))
            )}
            {!data.history.length && !isFetching && (
              <Box mt={2}>
                <span>Nothing found</span>
              </Box>
            )}

            <Box mt={3}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={onSubmit}
                disabled={!data || mutation.isLoading}
              >
                Save
              </Button>
            </Box>
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
            <Jobs />
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default Appointment;
