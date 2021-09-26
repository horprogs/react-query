import React from 'react';
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const UserItemSkeleton = () => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Skeleton animation="wave" variant="circular" height={50} width={50} />
      </ListItemAvatar>
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={15}
        width="60%"
      />
      <ListItemSecondaryAction>
        <IconButton edge="end">
          <Skeleton
            animation="wave"
            variant="rectangular"
            height={15}
            width={50}
          />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default UserItemSkeleton;
