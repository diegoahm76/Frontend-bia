import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../../screens/404';
import { CargoScreen } from '../Screen/CargosScreen';
import { EstadoCivilScreen } from '../Screen/EstadoCivilScreen';
import { TiposDocumentoScreen } from '../Screen/TiposDocScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionesBasicasRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="cargos" element={<CargoScreen />} />
            <Route path="estado_civil" element={<EstadoCivilScreen />} />
            <Route path="tipos_documento" element={<TiposDocumentoScreen />} />
            <Route path="/*" element={<Page404 />} />
        </Routes>
    );
};
