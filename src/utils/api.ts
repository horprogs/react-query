import axios from 'axios';
import Cookies from 'js-cookie';

export const api = {
  get: <T>(url: string, params?: object) =>
    axios.get<T>(url, {
      headers: {
        token: Cookies.get('token'),
      },
      ...params,
    }),
  post: <T>(url: string, data: any) =>
    axios.post<T>(url, data, {
      headers: {
        token: Cookies.get('token'),
      },
    }),
  patch: <T>(url: string, data: any) =>
    axios.patch<T>(url, data, {
      headers: {
        token: Cookies.get('token'),
      },
    }),
  delete: <T>(url: string) =>
    axios.delete<T>(url, {
      headers: {
        token: Cookies.get('token'),
      },
    }),
};
