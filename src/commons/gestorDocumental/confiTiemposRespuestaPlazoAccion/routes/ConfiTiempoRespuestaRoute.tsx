import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import ConfiguracionTiemposRespScreen from '../screen/ConfTiemposRespPlazoAccionScreen';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiTiempoRespuestaRoutes: React.FC = () => {
    return (

        <Routes>
            <Route path="/" element={<ConfiguracionTiemposRespScreen />} />

            <Route path="*" element={<Page404 />} />
        </Routes>

    );
};