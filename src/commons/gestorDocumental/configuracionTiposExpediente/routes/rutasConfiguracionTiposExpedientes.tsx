import { Route, Routes, Navigate } from 'react-router-dom';
import { ConfiguracionTernañosiguiente } from '../components/configuracionTernañosiguiente/ConfiguracionTernañoSiguiente';
import { ConfiguracionTerna } from '../components/comfiguracionTerna/ConfiguracionTerna';





// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionTiposExpedientes_Routes: React.FC = () => {
  return (

    <Routes>
      <Route path="/configuraciontiposexpedientes" element={<ConfiguracionTerna/>} />
      <Route path="/configuraciontiposexpedientesañosiguiente" element={     <ConfiguracionTernañosiguiente />} />

      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  
  );
};

