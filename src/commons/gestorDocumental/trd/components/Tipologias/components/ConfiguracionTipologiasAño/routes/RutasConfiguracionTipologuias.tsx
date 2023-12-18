import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ConfiguracionTipologuiaAño } from '../screens/ConfiguracionTipologuiaAño';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const RutasConfiguracionTipologuias = (): ReactElement => {
  return (

      <Routes>
        <Route path="configuracion" element={<ConfiguracionTipologuiaAño />} />
        {/* <Route path="consulta" element={<ConsultaAñosAnteriores/>} /> */}
      </Routes>
  
  );
};
