import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';
import { initializeMockAdapter } from './utils/mockApi';
import { ToastContainer } from 'react-toastify';

initializeMockAdapter();

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
