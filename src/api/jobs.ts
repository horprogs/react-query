import { useDelete, useFetch, usePost } from '../utils/reactQuery';
import { JobInterface } from '../interfaces/appointments';
import { pathToUrl } from '../utils/router';
import { apiRoutes } from '../routes';

export const useGetJobs = () =>
  useFetch<JobInterface[]>(pathToUrl(apiRoutes.job));

export const useAddJob = (
  updater: (oldData: JobInterface[], newData: JobInterface) => JobInterface[]
) =>
  usePost<JobInterface[], JobInterface>(
    pathToUrl(apiRoutes.job),
    undefined,
    updater
  );

export const useDeleteJob = (
  updater: (
    oldData: JobInterface[],
    deletedId: string | number
  ) => JobInterface[]
) => useDelete<JobInterface[]>(pathToUrl(apiRoutes.job), undefined, updater);
