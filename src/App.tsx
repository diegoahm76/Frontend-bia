/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
// import { Offline , Online  } from 'react-detect-offline';
import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';

import 'react-toastify/dist/ReactToastify.css';
import './css/App.css';
// import { OfflineScreen } from './utils/OffLineScreen/OffLineScreen';

export const App = () => {
  return (
    <>
      <AppTheme>
        <AppRouter />
      </AppTheme>
      {/*  <Online>
      <AppTheme>
        <AppRouter />
      </AppTheme>
      </Online>
     <Offline>
        <OfflineScreen />
      </Offline> */}
    </>
  );
};
