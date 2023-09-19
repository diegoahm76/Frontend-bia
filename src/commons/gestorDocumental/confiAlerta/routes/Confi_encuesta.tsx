import { Route, Routes, Navigate } from 'react-router-dom';
import { Encabezado } from '../components/Encabezado';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const Confi_Encuasta_Routes: React.FC = () => {
    return (
        <Routes>
            <Route path="/nueva_encuesta" element={< Encabezado />} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

