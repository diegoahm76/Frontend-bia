import { Route, Routes, Navigate } from 'react-router-dom';
import { Encuesta } from '../components/Encuesta';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const Encuasta_Routes: React.FC = () => {
    return (
        <Routes>
            <Route path="/encuesta" element={< Encuesta />} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

