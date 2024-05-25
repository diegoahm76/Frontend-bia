import { Route, Routes, Navigate } from 'react-router-dom';
import { DigitalizacionOpas } from '../components/DigitalizacionOpas';
    

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Digitalizacion_opas_Routes: React.FC = () => {
    return (
        <Routes>
            <Route path="/digitalizacion_opas" element={<  DigitalizacionOpas />} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

