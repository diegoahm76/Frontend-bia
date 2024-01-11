import { Route, Routes, Navigate } from 'react-router-dom';
 import { ConsultaSolucitud } from '../components/ConsultaSolicitud';
 

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Consulta_Solicitud_Routes: React.FC = () => {
    return (
        <Routes>
            <Route path="/Reportes_PQRSDF" element={<  ConsultaSolucitud />} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

