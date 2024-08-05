/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Route, Routes, Navigate } from 'react-router-dom';
import { ConsultaPoai } from '../components/ConsultaPoai';
 
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RouteConsulta: React.FC = () => {
    return (
        <Routes>
            <Route path="/consulta_poai" element={< ConsultaPoai />} />

            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

