import React, { useState } from 'react';
import { Box, Fab, TextField, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAddJob, useDeleteJob, useGetJobs } from '../../api/jobs';

const Jobs = () => {
  const [jobName, setJobName] = useState('');

  const { data, isLoading } = useGetJobs();

  const mutationAdd = useAddJob((oldData, newData) => [...oldData, newData]);
  const mutationDelete = useDeleteJob((oldData, id) => {
    console.log(oldData, id);
    return oldData.filter((item) => item.id !== id);
  });

  const onAdd = () => {
    mutationAdd.mutate({
      name: jobName,
    });
    setJobName('');
  };

  const onDelete = (id: number) => {
    mutationDelete.mutate(id);
  };

  if (!data) {
    return null;
  }

  return (
    <Box>
      {data.map((item) => (
        <Box key={item.id} display="flex" alignItems="center" mt={2}>
          <Box width="100%">
            <Typography>{item.name}</Typography>
          </Box>
          <Box ml={1}>
            <Fab
              color="primary"
              aria-label="delete"
              size="small"
              onClick={() => {
                onDelete(item.id);
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
