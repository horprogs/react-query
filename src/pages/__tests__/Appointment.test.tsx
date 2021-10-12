import '@testing-library/jest-dom';
import React from 'react';
import { createMemoryHistory } from 'history';
import { renderComponent } from '../../utils/testing/testing';
import { mockAxiosGetRequests } from '../../utils/testing/axiosMock';
import { waitFor } from '@testing-library/react';
import Appointment from '../Appointment';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as object),
  useParams: jest.fn().mockReturnValue({ id: 1 }),
}));

describe('Appointment.tsx', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    mockAxiosGetRequests({
      '/api/appointment/1': {
        id: 1,
        name: 'Hector Mckeown',
        appointment_date: '2021-08-25T17:52:48.132Z',
        services: [1, 2],
        address: 'London',
        vehicle: 'FR14ERF',
        comment: 'Car does not work correctly',
        history: [],
        hasInsurance: true,
      },
      '/api/job': [],
      '/api/getServices': [
        {
          id: 1,
          name: 'Replace a cambelt',
        },
        {
          id: 2,
          name: 'Replace oil and filter',
        },
        {
          id: 3,
          name: 'Replace front brake pads and discs',
        },
        {
          id: 4,
          name: 'Replace rare brake pads and discs',
        },
      ],
      '/api/getInsurance/1': {
        allCovered: true,
      },
    });
  });

  test('should render the main page', async () => {
    const mocked = mockAxiosGetRequests({
      '/api/appointment/1': {
        id: 1,
        name: 'Hector Mckeown',
        appointment_date: '2021-08-25T17:52:48.132Z',
        services: [1, 2],
        address: 'London',
        vehicle: 'FR14ERF',
        comment: 'Car does not work correctly',
        history: [],
        hasInsurance: true,
      },
      '/api/job': [],
      '/api/getServices': [
        {
          id: 1,
          name: 'Replace a cambelt',
        },
        {
          id: 2,
          name: 'Replace oil and filter',
        },
        {
          id: 3,
          name: 'Replace front brake pads and discs',
        },
        {
          id: 4,
          name: 'Replace rare brake pads and discs',
        },
      ],
      '/api/getInsurance/1': {
        allCovered: true,
      },
    });
    const history = createMemoryHistory();
    const { getByText, queryByTestId } = renderComponent(
      <Appointment />,
      history
    );

    expect(queryByTestId('appointment-skeleton')).toBeInTheDocument();

    await waitFor(() => {
      expect(queryByTestId('appointment-skeleton')).not.toBeInTheDocument();
    });

    expect(getByText('Hector Mckeown')).toBeInTheDocument();
    expect(getByText('Replace a cambelt')).toBeInTheDocument();
    expect(getByText('Replace oil and filter')).toBeInTheDocument();
    expect(getByText('Replace front brake pads and discs')).toBeInTheDocument();
    expect(queryByTestId('DoneAllIcon')).toBeInTheDocument();
    expect(
      mocked.mock.calls.some((item) => item[0] === '/api/getInsurance/1')
    ).toBeTruthy();
  });

  test('should not call and render Insurance flag', async () => {
    const mocked = mockAxiosGetRequests({
      '/api/appointment/1': {
        id: 1,
        name: 'Hector Mckeown',
        appointment_date: '2021-08-25T17:52:48.132Z',
        services: [1, 2],
        address: 'London',
        vehicle: 'FR14ERF',
        comment: 'Car does not work correctly',
        history: [],
        hasInsurance: false,
      },
      '/api/getServices': [],
      '/api/job': [],
    });
    const history = createMemoryHistory();
    const { queryByTestId } = renderComponent(<Appointment />, history);

    await waitFor(() => {
      expect(queryByTestId('appointment-skeleton')).not.toBeInTheDocument();
    });

    expect(queryByTestId('DoneAllIcon')).not.toBeInTheDocument();

    expect(
      mocked.mock.calls.some((item) => item[0] === '/api/getInsurance/1')
    ).toBeFalsy();
  });
});
