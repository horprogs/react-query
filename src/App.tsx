import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import UserList from './components/UserList/UserList';
import Auth from './pages/Auth';
import { pageRoutes } from './routes';
import { getProfile } from './api/auth';
import { AppBar, Box, Toolbar } from '@mui/material';
import { ProfileInterface } from './interfaces/auth';
import Appointment from './pages/Appointment';

function App() {
  const [user, setUser] = useState<ProfileInterface>();
  const history = useHistory();
  const location = useLocation();

  const fetchProfile = async () => {
    try {
      const resp = await getProfile();
      if (resp.data.user) {
        setUser(resp.data.user);
      }
    } catch (e) {
      history.replace(pageRoutes.auth);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [location.pathname]);

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box display="flex" justifyContent="flex-end" width="100%">
            <Box display="flex" justifyContent="flex-end">
              {user ? `User: ${user.name}` : 'Unauthorized'}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box width={500} m="auto" mt={2}>
        <Switch>
          <Route path={pageRoutes.main} exact>
            <UserList />
          </Route>
          <Route path={pageRoutes.auth} exact>
            <Auth />
          </Route>
          <Route path={pageRoutes.appointment} exact>
            <Appointment />
          </Route>
        </Switch>
      </Box>
    </>
  );
}

export default App;
