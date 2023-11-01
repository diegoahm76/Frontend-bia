import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../../screens/404';
import CierreExpedientesScreen from '../screen/CierreExpedientesScreen';
import { UserProvider } from '../../../deposito/Estantes/context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CierreExpedientesRoutes: React.FC = () => {
    return (
        <UserProvider>

            <Routes>
                {/* <Route path="/cierre_expedientes" element={<CierreExpedientesScreen />} /> */}
                <Route path="/cierre_expedientes" element={<CierreExpedientesScreen />} />

                <Route path="/*" element={<Page404 />} />
            </Routes>
        </UserProvider>

    );
};