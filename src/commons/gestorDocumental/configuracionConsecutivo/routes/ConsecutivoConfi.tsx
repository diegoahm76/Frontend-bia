/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Route, Routes, Navigate } from 'react-router-dom';
import { ConsecutivoConfiguracion } from '../components/ConsecutivoConfiguracion';
import { Creacion } from '../components/Creacion';
import { HistoricoConsecutivo } from '../components/HistoricoConsecutivo';
 

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsecutivoConfi: React.FC = () => {
    return (
        <Routes>
            <Route path="/consecutivo_configuracion" element={< Creacion />} />
            <Route path="/consecutivo_historial" element={< HistoricoConsecutivo />} />

            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

