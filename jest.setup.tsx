import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

jest.mock('axios');

jest.useFakeTimers('modern');

jest.setTimeout(30000);

configure({ defaultHidden: true });
