import axios, { AxiosInstance } from 'axios';
import { MockedFunction } from 'ts-jest/dist/utils/testing';

const getMockedData = (
  originalUrl: string,
  mockData: { [url: string]: any },
  type: string
) => {
  const foundUrl = Object.keys(mockData).find((url) =>
    originalUrl.match(new RegExp(`${url}$`))
  );

  if (!foundUrl) {
    return Promise.reject(
      new Error(`Called unmocked api ${type} ${originalUrl}`)
    );
  }

  if (mockData[foundUrl] instanceof Error) {
    return Promise.reject(mockData[foundUrl]);
  }

  return Promise.resolve({ data: mockData[foundUrl] });
};

export const mockAxiosGetRequests = <T extends any>(mockData: {
  [url: string]: T;
}): MockedFunction<AxiosInstance> => {
  // @ts-ignore
  return axios.get.mockImplementation((originalUrl) =>
    getMockedData(originalUrl, mockData, 'GET')
  );
};

export const mockAxiosPostRequests = <T extends any>(mockData: {
  [url: string]: T;
}): MockedFunction<AxiosInstance['post']> => {
  // @ts-ignore
  return axios.post.mockImplementation((originalUrl) =>
    getMockedData(originalUrl, mockData, 'POST')
  );
};

export const mockAxiosPatchRequests = <T extends any>(mockData: {
  [url: string]: T;
}): MockedFunction<AxiosInstance['patch']> => {
  // @ts-ignore
  return axios.patch.mockImplementation((originalUrl) =>
    getMockedData(originalUrl, mockData, 'PATCH')
  );
};

export const mockAxiosPutRequests = <T extends any>(mockData: {
  [url: string]: T;
}): MockedFunction<AxiosInstance['put']> => {
  // @ts-ignore
  return axios.put.mockImplementation((originalUrl) =>
    getMockedData(originalUrl, mockData, 'PUT')
  );
};

export const mockAxiosDeleteRequests = <T extends any>(mockData: {
  [url: string]: T;
}): MockedFunction<AxiosInstance['delete']> => {
  // @ts-ignore
  return axios.delete.mockImplementation((originalUrl) =>
    getMockedData(originalUrl, mockData, 'DELETE')
  );
};
