import { Route, Routes, Navigate } from 'react-router-dom';
import { ConsultaOtros } from '../components/consultaOtros';
     

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Consulta_Otros_Routes: React.FC = () => {
    return (
        <Routes>
            <Route path="/ConsultaOtros" element={<ConsultaOtros/>} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

