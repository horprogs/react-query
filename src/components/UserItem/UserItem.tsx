import React from 'react';
import upperFirst from 'lodash/upperFirst';
import { format } from 'date-fns';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { pathToUrl } from '../../utils/router';
import { pageRoutes } from '../../routes';

type Props = {
  id: number;
  name: string;
  date: string;
};

const UserItem = ({ name, date, id }: Props) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar></Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={upperFirst(name)}
        secondary={format(new Date(date), 'd MMM yyyy')}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end">
          <Link to={pathToUrl(pageRoutes.appointment, { id })}>
            <InsertInvitationIcon />
          </Link>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default UserItem;
