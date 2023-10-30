import { Route, Routes, Navigate } from 'react-router-dom';
import { AsigancionEncuesta } from '../components/AsigancionEncuesta';
 

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Encuasta_Routess: React.FC = () => {
    return (
        <Routes>
            <Route path="/encuesta" element={<  AsigancionEncuesta />} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

