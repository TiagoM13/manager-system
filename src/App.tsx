import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';

import { ConfirmDialog, InitializerLoader } from '@/components';
import { Router } from '@/routes';
import { queryClient } from '@/services';
import { QueryClientProvider } from '@tanstack/react-query';

import AuthPage from './pages/auth';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

const App = () => {
  const [ready, setReady] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setReady(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [ready]);

  if (ready) {
    return <InitializerLoader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ConfirmDialog />
        <AuthPage />
        {/* {authenticate && <Router />} */}
        <ToastContainer theme="colored" />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
