import { Route, Routes, Navigate } from 'react-router-dom';
import { EncuestaInterno } from '../components/InternoEncuesta';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const Encuasta_encuestas_Routes: React.FC = () => {
    return (
        <Routes>
            <Route path="/Interno_encuesta" element={< EncuestaInterno />} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

