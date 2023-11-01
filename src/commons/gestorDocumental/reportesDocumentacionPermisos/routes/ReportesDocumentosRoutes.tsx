import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProvider } from '../../deposito/Estantes/context/context';
import ReportesDocumentacionScreen from '../screen/ReporteDocumentacion';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ReportesDocumentacionRoutes = (): ReactElement => {
    return (
        <UserProvider>
            <Routes>
                <Route
                    path="/*"
                    element={<ReportesDocumentacionScreen />}
                />

                <Route path="/*" element={<Page404 />} />
            </Routes>
        </UserProvider>
    );
};
