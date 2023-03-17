import { Route, Routes, Navigate } from 'react-router-dom';
import { CambioEtapaScreen  } from '../screens/CambioEtapaScreen';
import { MortalidadPlantasScreen  } from '../screens/MortalidadPlantasScreen';
import { PreparacionMezclaScreen  } from '../screens/PreparacionMezclaScreen';
import { RegistroIncidenciaScreen  } from '../screens/RegistroIncidenciaScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProduccionRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="preparacion-mezcla" element={<PreparacionMezclaScreen/>} />
      <Route path="cambio-etapa" element={<CambioEtapaScreen/>} />
      <Route path="incidencia-material-vegetal" element={<RegistroIncidenciaScreen/>} />
      <Route path="mortalidad-plantas" element={<MortalidadPlantasScreen/>} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
