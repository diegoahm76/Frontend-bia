import { Route, Routes, Navigate } from 'react-router-dom';
import { Series } from '../components/Series';
 

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RouteArchibo: React.FC = () => {
    return (
        <Routes>
            <Route path="" element={< Series />} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

