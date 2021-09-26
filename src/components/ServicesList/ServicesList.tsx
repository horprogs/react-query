import React from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormLabel,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from 'react-query';
import ServicesCheck from './ServicesCheck';

type Props = {
  checked: number[];
  onChange: (value: number[]) => void;
};

const ServicesList = ({ checked, onChange }: Props) => {
  return (
    <FormControl component="fieldset" fullWidth>
      <FormLabel component="legend">Services</FormLabel>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <Box width="100%" mt={2}>
                <Alert severity="error">
                  <AlertTitle>
                    <strong>Error!</strong>
                  </AlertTitle>
                  {error.message}
                </Alert>

                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => resetErrorBoundary()}
                  >
                    Try again
                  </Button>
                </Box>
              </Box>
            )}
            onReset={reset}
          >
            {' '}
            <React.Suspense
              fallback={
                <Box width="100%">
                  <Box mb={1}>
                    <Skeleton variant="text" animation="wave" />
                  </Box>
                  <Box mb={1}>
                    <Skeleton variant="text" animation="wave" />
                  </Box>
                  <Box mb={1}>
                    <Skeleton variant="text" animation="wave" />
                  </Box>
                </Box>
              }
            >
              <ServicesCheck checked={checked} onChange={onChange} />
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </FormControl>
  );
};

export default ServicesList;
