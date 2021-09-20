import { api } from './api';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';
import { QueryFunctionContext } from 'react-query/types/core/types';
import { AxiosError, AxiosResponse } from 'axios';
import { GetInfinitePagesInterface } from '../interfaces';

type QueryKeyT = [string, object | undefined];

export const fetcher = <T>({
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
  const [url, params] = queryKey;
  return api
    .get<T>(url, { params: { ...params, pageParam } })
    .then((res) => res.data);
};

export const useLoadMore = <T>(url: string | null, params?: object) => {
  const context = useInfiniteQuery<
    GetInfinitePagesInterface<T>,
    Error,
    GetInfinitePagesInterface<T>,
    QueryKeyT
  >(
    [url!, params],
    ({ queryKey, pageParam = 1 }) => fetcher({ queryKey, pageParam }),
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
      getNextPageParam: (lastPage) => {
        return lastPage.nextId ?? false;
      },
    }
  );

  return context;
};

export const usePrefetch = <T>(url: string | null, params?: object) => {
  const queryClient = useQueryClient();

  return () => {
    if (!url) {
      return;
    }

    queryClient.prefetchQuery<T>([url!, params], ({ queryKey }) =>
      // @ts-ignore
      fetcher({ queryKey })
    );
  };
};

export const useFetch = <T>(
  url: string | null,
  params?: object,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  const context = useQuery<T, Error, T, QueryKeyT>(
    [url!, params],
    ({ queryKey }) => fetcher({ queryKey }),
    {
      enabled: !!url,
      ...config,
    }
  );

  return context;
};

export const useDelete = <T>(
  url: string,
  params?: object,
  updater?: (oldData: T, id: string | number) => T
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, string | number>(
    (id) => api.delete(`${url}/${id}`),
    {
      onSuccess: (response, id) => {
        if (response && updater) {
          queryClient.setQueryData<T>([url!, params], (oldData) =>
            updater(oldData!, id)
          );
        }
      },
    }
  );
};

export const usePost = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T
) => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, S>(
    (data) => api.post<S>(url, data),
    {
      onSuccess: (response) => {
        if (response.data && updater) {
          queryClient.setQueryData<T>([url!, params], (oldData) =>
            updater(oldData!, response.data)
          );
        }
      },
    }
  );
};

export const useUpdate = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T
) => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, [S]>(
    ([data]) => api.patch<S>(url, data),
    {
      onSuccess: (response) => {
        if (response.data && updater) {
          queryClient.setQueryData<T>([url!, params], (oldData) => {
            return updater(oldData!, response.data);
          });
        }
      },
    }
  );
};
