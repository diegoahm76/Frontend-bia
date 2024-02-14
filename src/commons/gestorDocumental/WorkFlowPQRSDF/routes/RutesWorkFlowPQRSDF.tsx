import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { ConsultarWorkFlow } from '../screens/ConsultarWorkFlow';
import { ConsultarRadicadosTable } from '../components/BusquedaAvanzadaRadicado/screens/BusquedaAvanzada';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RutesWorkFlowPQRSDF = (): ReactElement => {
  return (
      <Routes>
        <Route
          path="/wordflow"
          element={<ConsultarWorkFlow/>}
        />
           <Route
          path="/consultar_radicados"
          element={<ConsultarRadicadosTable/>}
        />
        {/* <Route path="/*" element={<Page404 />} /> */}
      </Routes>
  );
};