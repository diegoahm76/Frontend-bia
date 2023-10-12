import { Route, Routes, Navigate } from 'react-router-dom';
import { ConfiguracionMediosSolicitudScreem } from '../screens/ConfiguracionMediosSolicitudScreem';
import { ModalBusquedaMediosSolicitudProvider } from '../context/pasarDatosEditar';




// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionMediosSolicitud_routes: React.FC = () => {
  return (
    <ModalBusquedaMediosSolicitudProvider>
    <Routes>
      <Route path="/*" element={<ConfiguracionMediosSolicitudScreem/>} />
    
    </Routes>
    </ModalBusquedaMediosSolicitudProvider>
  );
};
  
