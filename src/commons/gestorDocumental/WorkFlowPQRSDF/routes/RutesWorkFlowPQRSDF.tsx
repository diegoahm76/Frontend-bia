import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { ConsultarWorkFlow } from '../screens/ConsultarWorkFlow';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RutesWorkFlowPQRSDF = (): ReactElement => {
  return (
      <Routes>
        <Route
          path="/*"
          element={<ConsultarWorkFlow/>}
        />
        {/* <Route path="/*" element={<Page404 />} /> */}
      </Routes>
  );
};