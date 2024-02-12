import { Route, Routes, Navigate } from 'react-router-dom';
import { ConsultaEstadoPQR } from '../components/ConsultaEstadoPQR';
  

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Consulta_estadoPQR_Routes: React.FC = () => {
    return (
        <Routes>
            <Route path="/consulta_estado_solicitudes_usuario_interno" element={<  ConsultaEstadoPQR />} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

