import { apiRoutes } from '../routes';
import { api } from '../utils/api';
import Cookies from 'js-cookie';
import { ProfileInterface } from '../interfaces/auth';

export const getTokenByPassword = (email: string, password: string) =>
  api.post<{ token: string }>(apiRoutes.getTokenByPassword, {
    email,
    password,
  });

export const getProfile = () =>
  api.get<{ user: ProfileInterface }>(apiRoutes.getProfile, {
    headers: { token: Cookies.get('token') },
  });
