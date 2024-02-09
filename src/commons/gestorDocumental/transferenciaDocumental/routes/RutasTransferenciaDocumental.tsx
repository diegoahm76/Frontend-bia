/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { PantallaPrincipalTansferenciaDocumental } from '../screens/PantallaPrincipalTansferenciaDocumental';
import { StepperProvider } from '../context/ContextControlSteper';


export const RutasTransferenciaDocumental: React.FC = () => {
    return (
        <StepperProvider>
            <Routes>
                <Route path="/principal" element={<PantallaPrincipalTansferenciaDocumental />} />


                <Route path="/*" element={<Page404 />} />
                {/* Puedes agregar más rutas según tus necesidades */}
            </Routes>
        </StepperProvider>

    );
};


