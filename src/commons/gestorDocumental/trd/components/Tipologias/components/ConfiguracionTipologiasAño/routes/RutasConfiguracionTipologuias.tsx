import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ConfiguracionTipologuiaAño } from '../screens/ConfiguracionTipologuiaAño';
import { AñoConfiguracionAñoSiguiente } from '../components/ConfiguracionAñoSigueinte/screens/configuracionAñoSicuiente';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const RutasConfiguracionTipologuias = (): ReactElement => {
  return (

      <Routes>
        <Route path="tipologuia_actual" element={<ConfiguracionTipologuiaAño />} />
        <Route path="tipologuia_siguiente" element={<AñoConfiguracionAñoSiguiente/>} />
        {/* <Route path="consulta" element={<ConsultaAñosAnteriores/>} /> */}
      </Routes>
  
  );
};
