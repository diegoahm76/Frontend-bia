import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { BodegasScreen } from '../screens/BodegasScreen';
import { MarcasScreen } from '../screens/MarcasScreen';
import { PorcentajesIvaScreen } from '../screens/PorcentajesIvaScreen';
import { UnidadesMedidaScreen } from '../screens/UnidadesMedidaScreen';
;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionDatosBasicosRoutes: React.FC = () => {
    return (

        <Routes>
            <Route path="bodegas" element={<BodegasScreen />} />
            <Route path="datos_basicos/*">
                <Route path="marcas" element={<MarcasScreen />} />
                <Route path="porcentajes_iva" element={<PorcentajesIvaScreen />} />
                <Route path="unidades_medida" element={<UnidadesMedidaScreen />} />
            </Route>
            <Route path="/*" element={<Page404 />} />
        </Routes>
    );
};
