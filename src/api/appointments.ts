import {
  useFetch,
  useLoadMore,
  usePrefetch,
  useUpdate,
} from '../utils/reactQuery';
import { apiRoutes } from '../routes';
import {
  AppointmentInterface,
  CarDetailInterface,
  InsuranceDetailsInterface,
} from '../interfaces/appointments';
import { pathToUrl } from '../utils/router';

export const useGetAppointmentsList = () =>
  useLoadMore<AppointmentInterface[]>(apiRoutes.getUserList);

export const useGetAppointment = (id: number) =>
  useFetch<AppointmentInterface>(pathToUrl(apiRoutes.appointment, { id }));

export const usePatchAppointment = (
  id: number,
  updater: (
    oldData: AppointmentInterface,
    newData: AppointmentInterface
  ) => AppointmentInterface
) =>
  useUpdate<AppointmentInterface, AppointmentInterface>(
    pathToUrl(apiRoutes.appointment, { id }),
    undefined,
    updater
  );

export const useGetCarDetail = (id: number | null) =>
  useFetch<CarDetailInterface>(pathToUrl(apiRoutes.getCarDetail, { id }));

export const useGetInsurance = (id: number | null) =>
  useFetch<InsuranceDetailsInterface>(id ? apiRoutes.getInsurance : null);

export const usePrefetchCarDetails = (id: number | null) =>
  usePrefetch<InsuranceDetailsInterface>(
    id ? pathToUrl(apiRoutes.getCarDetail, { id }) : null
  );
