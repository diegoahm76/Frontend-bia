import { Route, Routes, Navigate } from 'react-router-dom';
import { DeleteDocumental } from '../components/DeleteDocumental';
 

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DeleteDocumental_Routes: React.FC = () => {
    return (
        <Routes>
            <Route path="/Eliminacion_Documental" element={<DeleteDocumental/>} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

