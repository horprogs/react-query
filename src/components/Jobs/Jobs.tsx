import React, { useState } from 'react';
import { Box, Fab, TextField, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAddJob, useDeleteJob, useGetJobs } from '../../api/jobs';
import Skeleton from '@mui/material/Skeleton';
import { pushNotification } from '../../utils/notifications';

interface Props {
  appointmentId: number;
}

const Jobs = ({ appointmentId }: Props) => {
  const [jobName, setJobName] = useState('');

  const { data, isLoading } = useGetJobs();

  const mutationAdd = useAddJob((oldData, newData) => [...oldData, newData]);
  const mutationDelete = useDeleteJob((oldData, id) =>
    oldData.filter((item) => item.id !== id)
  );

  const onAdd = async () => {
    try {
      await mutationAdd.mutateAsync({
        name: jobName,
        appointmentId,
      });
      setJobName('');
    } catch (e) {
      pushNotification(`Cannot add the job: ${jobName}`);
    }
  };

  const onDelete = async (id: number) => {
    try {
      await mutationDelete.mutateAsync(id);
    } catch (e) {
      pushNotification(`Cannot delete the job`);
    }
  };

  if (isLoading) {
    return (
      <Box mt={2}>
        <Box mb={2}>
          <Skeleton animation="wave" variant="rectangular" height={15} />
        </Box>
        <Box mb={2}>
          <Skeleton animation="wave" variant="rectangular" height={15} />
        </Box>
      </Box>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Box>
      {data.map((item, idx) => (
        <Box key={item.id || idx} display="flex" alignItems="center" mt={2}>
          <Box width="100%">
            <Typography>{item.name}</Typography>
          </Box>
          <Box ml={1}>
            <Fab
              color="primary"
              aria-label="delete"
              size="small"
              onClick={() => {
                onDelete(item.id!);
              }}
            >
              <DeleteIcon />
            </Fab>
          </Box>
        </Box>
      ))}
      <Box display="flex" alignItems="center" mt={2}>
        <TextField
          label="Outlined"
          variant="outlined"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
          fullWidth
          disabled={mutationAdd.isLoading}
        />
        <Box ml={1} position="relative">
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              onAdd();
            }}
            size="small"
            disabled={mutationAdd.isLoading || !jobName}
          >
            <AddIcon />
          </Fab>
          {mutationAdd.isLoading && (
            <CircularProgress
              size={50}
              sx={{
                position: 'absolute',
                top: -5,
                left: -5,
                zIndex: 1,
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Jobs;
