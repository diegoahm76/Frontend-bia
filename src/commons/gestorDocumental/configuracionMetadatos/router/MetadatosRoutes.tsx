import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import MetadatosScreen from '../screens/MetadatosScreen';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionMetadatosRoutes: React.FC = () => {
    return (

        <Routes>
            <Route path="/configuracion_metadatos" element={<MetadatosScreen />} />

            <Route path="/*" element={<Page404 />} />
        </Routes>

    );
};