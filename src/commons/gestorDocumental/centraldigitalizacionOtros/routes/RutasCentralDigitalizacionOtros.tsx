/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { PantallaPrincipalCentralDigitalizacion } from '../screens/PantallaPrincipalCentralDigitalizacion';
import { CentralDigitalizacionProvider } from '../context/ContextCentralDigitalizacion';
import { PantallaDigitalizacion } from '../screens/PantallaDigitalizacion';
import { PantallaHistoricoSolicitudes } from '../screens/PantallaHistoricoSolicitudes';

export const RutasCentralDigitalizacionOtros: React.FC = () => {
    return (
        <CentralDigitalizacionProvider>
            <Routes>
                <Route path="/principal" element={<PantallaPrincipalCentralDigitalizacion />} />
                <Route path="/digitalizacion/:id" element={<PantallaDigitalizacion />} />
                <Route path="/Historico" element={<PantallaHistoricoSolicitudes />} />

                <Route path="/*" element={<Page404 />} />
                {/* Puedes agregar más rutas según tus necesidades */}
            </Routes>
        </CentralDigitalizacionProvider>
    );
};

 
