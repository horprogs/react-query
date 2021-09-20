import MockAdapter from 'axios-mock-adapter';
import { match, pathToRegexp } from 'path-to-regexp';
import axios, { AxiosRequestConfig } from 'axios';
import { apiRoutes } from '../routes';
import {
  appointments,
  carDetailsMock,
  insuranceDetailsMock,
  jobsMocks,
} from '../fixtures/appointments';
import { services } from '../fixtures/services';

const ADMIN_TOKEN = 'admintoken';
const MODERATOR_TOKEN = 'moderatortoken';
const COUNT = 5;

const PROFILES = [
  {
    token: ADMIN_TOKEN,
    profile: {
      name: 'Admin',
    },
  },
  {
    token: MODERATOR_TOKEN,
    profile: {
      name: 'Moderator',
    },
  },
];
const getUser = (config: AxiosRequestConfig) =>
  PROFILES.find((item) => item.token === config.headers.token)?.profile;

const clone = (data: any) => JSON.parse(JSON.stringify(data));
const exclude = [/assets\//];

axios.interceptors.request.use((config) => {
  if (!exclude.find((pattern) => pattern.test(config.url!))) {
    console.groupCollapsed(`=> ${config.method?.toUpperCase()} ${config.url}`);
    console.dir(clone(config));
    console.groupEnd();
  }

  return config;
});

axios.interceptors.response.use((response) => {
  if (!exclude.find((pattern) => pattern.test(response?.config?.url!))) {
    console.groupCollapsed(
      `<= ${response?.config?.method?.toUpperCase()} ${response.config.url}`
    );
    console.dir(clone(response));
    console.groupEnd();
  }

  return response;
});

export const initializeMockAdapter = () => {
  const mock = new MockAdapter(axios, { delayResponse: 1 });

  mock.onGet(apiRoutes.getUserList).reply((config) => {
    if (!getUser(config)) {
      return [403];
    }

    const { pageParam } = config.params;

    const nextId =
      appointments.length > pageParam * COUNT ? pageParam + 1 : undefined;

    return [
      200,
      {
        nextId,
        data: appointments.slice((pageParam - 1) * COUNT, pageParam * COUNT),
      },
    ];
  });

  mock.onPost(apiRoutes.getTokenByPassword).reply((config) => {
    const { email, password } = JSON.parse(config.data);

    if (email === 'admin@test.com' && password === 'root') {
      return [200, { token: ADMIN_TOKEN }];
    }

    if (email === 'moderator@test.com' && password === 'root') {
      return [200, { token: MODERATOR_TOKEN }];
    }

    return [403];
  });

  mock.onGet(apiRoutes.getProfile).reply((config) => {
    const user = getUser(config);

    if (!user) {
      return [403];
    }

    return [
      200,
      {
        user,
      },
    ];
  });

  mock.onGet(pathToRegexp(apiRoutes.appointment)).reply((config) => {
    if (!getUser(config)) {
      return [403];
    }

    const result = match<{ id: string }>(apiRoutes.appointment, {
      decode: decodeURIComponent,
    })(config.url!);

    if (result === false) {
      return [403];
    }

    const { id } = result.params;

    return [200, appointments.find((item) => item.id === +id)];
  });

  mock.onPatch(pathToRegexp(apiRoutes.appointment)).reply((config) => {
    const user = getUser(config);

    if (!user) {
      return [403];
    }

    const body = JSON.parse(config.data);

    const idx = appointments.findIndex((item) => item.id === body.id);

    appointments[idx] = {
      ...appointments[idx],
      ...body,
      history: [
        ...appointments[idx].history,
        {
          date: new Date(),
          comment: `Changed by ${user.name}`,
        },
      ],
    };

    return [200, appointments[idx]];
  });

  mock.onGet(apiRoutes.getServices).reply(() => {
    return [200, services];
  });

  mock.onGet(apiRoutes.getInsurance).reply(() => {
    return [200, insuranceDetailsMock];
  });

  mock.onGet(pathToRegexp(apiRoutes.getCarDetail)).reply((config) => {
    if (!getUser(config)) {
      return [403];
    }

    const result = match<{ id: string }>(apiRoutes.getCarDetail, {
      decode: decodeURIComponent,
    })(config.url!);

    if (result === false) {
      return [403];
    }

    const { id } = result.params;

    return [200, carDetailsMock.find((item) => item.id === +id)];
  });

  mock.onGet(pathToRegexp(apiRoutes.job)).reply((config) => {
    if (!getUser(config)) {
      return [403];
    }

    const result = match<{ id: string }>(apiRoutes.job, {
      decode: decodeURIComponent,
    })(config.url!);

    if (result === false) {
      return [403];
    }

    const { id } = result.params;

    return [200, []];
  });

  mock.onPost(pathToRegexp(apiRoutes.job)).reply((config) => {
    const user = getUser(config);

    if (!user) {
      return [403];
    }

    const body = {
      ...JSON.parse(config.data),
      id: Math.floor(Math.random() * 10000000),
    };
    jobsMocks.push(body);

    return [200, body];
  });

  mock.onDelete(pathToRegexp(apiRoutes.job)).reply((config) => {
    const user = getUser(config);

    if (!user) {
      return [403];
    }

    const result = match<{ id: string }>(apiRoutes.job, {
      decode: decodeURIComponent,
    })(config.url!);

    if (result === false) {
      return [403];
    }

    const { id } = result.params;

    const idx = jobsMocks.findIndex((item) => item.id === +id);

    const [body] = jobsMocks.splice(idx, 1);

    console.log(body);

    return [200, body];
  });
};
