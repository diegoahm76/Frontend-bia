import { Route, Routes, Navigate } from 'react-router-dom';
import { ConsecutivoConfiguracion } from '../components/ConsecutivoConfiguracion';
 

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsecutivoConfi: React.FC = () => {
    return (
        <Routes>
            <Route path="/consecutivo_configuracion" element={< ConsecutivoConfiguracion />} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

