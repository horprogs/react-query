import React from 'react';
import { Box, Button, Card, List } from '@mui/material';
import UserItem from '../UserItem/UserItem';
import UserItemSkeleton from '../UserItem/UserItemSkeleton';
import { useGetAppointmentsList } from '../../api/appointments';

const UsersList = () => {
  const {
    data: list,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAppointmentsList();

  return (
    <>
      <Card>
        {isLoading ? (
          <List>
            <Box mb={1}>
              <UserItemSkeleton />
            </Box>
            <Box mb={1}>
              <UserItemSkeleton />
            </Box>
            <Box mb={1}>
              <UserItemSkeleton />
            </Box>
          </List>
        ) : (
          <List>
            {list!.pages.map((page) => (
              <React.Fragment key={page.nextId || 0}>
                {page.data.map((item) => (
                  <UserItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    date={item.appointment_date}
                  />
                ))}
              </React.Fragment>
            ))}
          </List>
        )}
      </Card>
      {hasNextPage && (
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              fetchNextPage();
            }}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load more users'}
          </Button>
        </Box>
      )}
    </>
  );
};

export default UsersList;
