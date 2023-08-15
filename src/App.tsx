/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
// import { Offline , Online  } from 'react-detect-offline';
import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './css/App.css';
import { OfflineScreen } from './utils/OffLineScreen/OffLineScreen';
import { useNetworkState } from '@uidotdev/usehooks';

export const App = () => {
  const network = useNetworkState();

  const [net, setNet] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNet(network.online);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {net ? (
        <AppTheme>
          <AppRouter />
        </AppTheme>
      ) : (
        <OfflineScreen />
      )}
    </>
  );
};
