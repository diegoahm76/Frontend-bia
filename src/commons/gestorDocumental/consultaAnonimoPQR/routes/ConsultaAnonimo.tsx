import { Route, Routes, Navigate } from 'react-router-dom';
import { ConsultaAnonimoPQR } from '../components/ConsultaAnonimoPQR';
  

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Consulta_AnonimoPQR_Routes: React.FC = () => {
    return (
        <Routes>
            <Route path="/Consulta_AnonimoPQR" element={<  ConsultaAnonimoPQR />} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

