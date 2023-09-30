import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { ArchivoFisicoScreen } from '../screen/ArchivoFisicoScreen';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const ArchivoFisicoRoutes: React.FC = () => {
    return (

        <Routes>
            <Route path="/" element={<ArchivoFisicoScreen />} />

            <Route path="*" element={<Page404 />} />
        </Routes>

    );
};