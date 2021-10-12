import '@testing-library/jest-dom';
import React from 'react';
import { createMemoryHistory } from 'history';
import {
  changeTextFieldByTestId,
  clickByTestId,
  renderComponent,
} from '../../../utils/testing/testing';
import {
  mockAxiosDeleteRequests,
  mockAxiosGetRequests,
  mockAxiosPostRequests,
} from '../../../utils/testing/axiosMock';
import { waitFor } from '@testing-library/react';
import Jobs from '../Jobs';

describe('Appointment.tsx', () => {
  beforeEach(() => {
    mockAxiosGetRequests({
      '/api/job': [],
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the empty list with controls', async () => {
    const history = createMemoryHistory();
    const { queryByTestId } = renderComponent(
      <Jobs appointmentId={1} />,
      history
    );

    expect(queryByTestId('loading-skeleton')).toBeInTheDocument();

    await waitFor(() => {
      expect(queryByTestId('loading-skeleton')).not.toBeInTheDocument();
    });

    expect(queryByTestId('add')).toBeInTheDocument();
    expect(queryByTestId('input')).toBeInTheDocument();
  });

  test('should be able to add and remove elements', async () => {
    const mockedPost = mockAxiosPostRequests({
      '/api/job': {
        name: 'First item',
        appointmentId: 1,
      },
    });

    const mockedDelete = mockAxiosDeleteRequests({
      '/api/job/1': {},
    });

    const history = createMemoryHistory();
    const { queryByTestId, queryByText } = renderComponent(
      <Jobs appointmentId={1} />,
      history
    );

    await waitFor(() => {
      expect(queryByTestId('loading-skeleton')).not.toBeInTheDocument();
    });

    await changeTextFieldByTestId('input', 'First item');

    await clickByTestId('add');

    mockAxiosGetRequests({
      '/api/job': [
        {
          id: 1,
          name: 'First item',
          appointmentId: 1,
        },
      ],
    });

    await waitFor(() => {
      expect(queryByText('First item')).toBeInTheDocument();
    });

    expect(
      mockedPost.mock.calls.some((item) => item[0] === '/api/job')
    ).toBeTruthy();

    await clickByTestId('delete-1');

    mockAxiosGetRequests({
      '/api/job': [],
    });

    await waitFor(() => {
      expect(queryByText('First item')).not.toBeInTheDocument();
    });

    expect(
      mockedDelete.mock.calls.some((item) => item[0] === '/api/job/1')
    ).toBeTruthy();
  });
});
