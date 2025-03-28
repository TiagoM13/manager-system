import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

import { ConfirmDialog, InitializerLoader } from '@/components';
import { ReactQueryProvider } from '@/provider/query-client';
import { Router } from '@/routes';
import { userObservable } from '@/shared/utils';

import { useUserRoleObservable, useUserStatusObservable } from './shared/hooks';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.locale('pt-br');

const App = () => {
  const [ready, setReady] = React.useState(false);

  useUserRoleObservable();
  useUserStatusObservable();

  React.useEffect(() => {
    const checkUserUpdates = async () => {
      await userObservable();
    };

    const intervalId = setInterval(checkUserUpdates, 1800000); // 3min
    setReady(true);

    return () => clearInterval(intervalId);
  }, [ready]);

  if (!ready) {
    return <InitializerLoader />;
  }

  return (
    <ReactQueryProvider>
      <BrowserRouter>
        <ConfirmDialog />
        <Router />
        <ToastContainer theme="colored" />
      </BrowserRouter>
    </ReactQueryProvider>
  );
};

export default App;
