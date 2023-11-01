import { Route, Routes, Navigate } from 'react-router-dom';
import { PantallaPrincipalConfiguracoinTiposExpediente } from '../screen/pantallaPrincipalTiposExpedientes';





// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionTiposExpedientes_Routes: React.FC = () => {
  return (

    <Routes>
      <Route path="/configuraciontiposexpedientes" element={<PantallaPrincipalConfiguracoinTiposExpediente/>} />
  
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  
  );
};

