import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { AdministracionCamasGerminacionScreen  } from '../screens/AdministracionCamasGerminacionScreen';
import { TipificacionBienesScreen  } from '../screens/TipificacionBienesScreen';
import { TiposMezclaScreen } from '../screens/TiposMezclaScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="administrar-camas-germinacion" element={<AdministracionCamasGerminacionScreen/>} />
      <Route path="tipificacion-bienes" element={<TipificacionBienesScreen/>} />
      <Route path="tipos-mezcla" element={<TiposMezclaScreen/>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
