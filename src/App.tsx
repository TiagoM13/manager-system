import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';

import { Sidebar } from '@/components';
import { routes as Router } from '@/routes';

import { InitializerLoader } from './components/initializer-loader';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

const App = () => {
  const [ready, setReady] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setReady(false);
    }, 3000);
  }, [ready]);

  if (ready) {
    return <InitializerLoader />;
  }

  return (
    <BrowserRouter>
      <div className="bg-slate-100 h-screen flex relative">
        <Sidebar />

        <div className="w-full flex-1 p-6 overflow-auto">
          <Router />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
