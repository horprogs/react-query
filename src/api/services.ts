import { useFetch } from '../utils/reactQuery';
import {
  AppointmentInterface,
  ServiceInterface,
} from '../interfaces/appointments';
import { apiRoutes } from '../routes';

export const useGetServices = () =>
  useFetch<ServiceInterface[]>(apiRoutes.getServices);
