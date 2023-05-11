import { Route, Routes, Navigate } from 'react-router-dom';
import { AdministracionCamasGerminacionScreen  } from '../screens/AdministracionCamasGerminacionScreen';
import { TipificacionBienesScreen  } from '../screens/TipificacionBienesScreen';
import { TiposMezclaScreen } from '../screens/TiposMezclaScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="administrar_camas_germinacion/:id?" element={<AdministracionCamasGerminacionScreen/>} />
      <Route path="tipificacion_bienes" element={<TipificacionBienesScreen/>} />
      <Route path="tipos_mezcla" element={<TiposMezclaScreen/>} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
