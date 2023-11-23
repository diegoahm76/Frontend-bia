import { Route, Routes } from 'react-router-dom';
import { CuencaScreen } from '../Screen/CuencaScreen';
import { Page404 } from '../../../../screens/404';
import { ODSScreen } from '../Screen/ODSScreenScreen';
import { TipoEjeScreen } from '../Screen/TipoEjeScreen';
import { EntidadesScreen } from '../Screen/EntidadesScreen';
import { MedidasScreen } from '../Screen/MedidasScreen';
import { TiposScreen } from '../Screen/TiposScreen';
import { SectorScreen } from '../Screen/SectorScreen';
import { ModalidadesScreen } from '../Screen/ModalidadesScreen';
import { UbicaionesScreen } from '../Screen/UbicaionesScreen';
import { FuentesRecursosPAAScreen } from '../Screen/FuentesRecursosPAAScreen';
import { IntervalosScreen } from '../Screen/IntervalosScreen';
import { EstadosVFScreen } from '../Screen/EstadosVFScreen';
import { CodigosUNSPSCScreen } from '../Screen/CodigosUNSPSCScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionesBasicasRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="cuencas/*" element={<CuencaScreen />} />
      <Route path="ods/*" element={<ODSScreen />} />
      <Route path="tipo_eje/*" element={<TipoEjeScreen />} />
      <Route path="entidades/*" element={<EntidadesScreen />} />
      <Route path="medidas/*" element={<MedidasScreen />} />
      <Route path="tipos/*" element={<TiposScreen />} />
      <Route path="sector/*" element={<SectorScreen />} />
      <Route path="modalidades/" element={<ModalidadesScreen />} />
      <Route path="ubicaciones/*" element={<UbicaionesScreen />} />
      <Route path="fuentes_fiananciacion_paa/*" element={<FuentesRecursosPAAScreen />} />
      <Route path="intervalos/*" element={<IntervalosScreen />} />
      <Route path="estados_vf/*" element={<EstadosVFScreen />} />
      <Route path="codigos_unspsc/*" element={<CodigosUNSPSCScreen />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
