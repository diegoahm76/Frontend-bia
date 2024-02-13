import { Route, Routes, Navigate } from 'react-router-dom';
import { ConsultaEstadoSolicitudesScreen } from '../screen/ConsultaEstadoSolicitudes';

  

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultaEstadoSolicitudes: React.FC = () => {
    return (
        <Routes>
            <Route path="/consulta_estado_solicitudes_usuario_interno" element={<  ConsultaEstadoSolicitudesScreen />} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

