/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Route, Routes, Navigate } from 'react-router-dom';
import { ConseptoPoai } from '../components/EjeEstrategico';
// import { ConseptoPoai } from '../components/ConseptoPoai';
 

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RouteEjeEstrategico: React.FC = () => {
    return (
        <Routes>
            <Route path="/parametro_rubros" element={< ConseptoPoai />} />

            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

