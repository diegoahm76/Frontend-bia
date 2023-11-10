import { Route, Routes, Navigate } from 'react-router-dom';
import { ReubicacionExpediente } from '../components/ReubicacionExpediente';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const Reubicacion_Expediantes_Routes: React.FC = () => {
    return (
        <Routes>
            <Route path="/Reubicacion_Expedientes" element={< ReubicacionExpediente/>} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

