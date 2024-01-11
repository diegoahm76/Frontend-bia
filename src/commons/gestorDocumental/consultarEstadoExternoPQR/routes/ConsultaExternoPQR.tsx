import { Route, Routes, Navigate } from 'react-router-dom';
import { ConsultaExternoPQR } from '../components/ConsultaExternoPQR';
   

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Consulta_ExternoPQR_Routes: React.FC = () => {
    return (
        <Routes>
            <Route path="/ConsultaExternoPQR" element={<  ConsultaExternoPQR />} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

