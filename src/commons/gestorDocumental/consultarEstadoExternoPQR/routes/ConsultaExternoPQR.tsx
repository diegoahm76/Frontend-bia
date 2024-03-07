import { Route, Routes, Navigate } from 'react-router-dom';
import { ConsultaExternoPQR } from '../components/ConsultaExternoPQR';
import { ConsultaExterno } from '../components/ConsultaExterno';
   

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Consulta_ExternoPQR_Routes: React.FC = () => {
    return (
        <Routes>
            <Route path="/ConsultaExternoPQR" element={<  ConsultaExterno />} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>

);
};

