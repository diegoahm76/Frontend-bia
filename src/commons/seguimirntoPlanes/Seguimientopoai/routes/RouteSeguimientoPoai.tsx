/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Route, Routes, Navigate } from 'react-router-dom';
import { Seguimiento } from '../components/Seguimiento';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const RouteSeguimientoPoai: React.FC = () => {
    return (
        <Routes>
            <Route path="/Seguimiento_poai" element={< Seguimiento />} />

            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

