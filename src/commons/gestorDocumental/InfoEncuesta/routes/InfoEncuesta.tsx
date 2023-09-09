import { Route, Routes, Navigate } from 'react-router-dom';
 import { Datos } from '../components/Datos';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const InfoEncuesta: React.FC = () => {
    return (
        <Routes>
            <Route path="/datos" element={< Datos />} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

