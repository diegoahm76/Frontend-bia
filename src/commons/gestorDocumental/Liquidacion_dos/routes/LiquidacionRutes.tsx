/* eslint-disable @typescript-eslint/naming-convention */
import { Routes, Route } from 'react-router-dom';
import { ProcesoLiquidacionScreen } from '../screens/BandejaEntradaLiquidacion';
import { Page404 } from '../../../../screens/404';
import { PreciosProvider } from '../context/PersonalContext';
import { LiquidacionPlantilla } from '../components/plantillaHtml/Liquidacion';


export const LiquidacionRutesPago: React.FC = () => {
  return (
    <PreciosProvider>
      <Routes>
        <Route path="/activacion" element={<ProcesoLiquidacionScreen/>} />
        <Route path="/plantilla" element={<LiquidacionPlantilla/>} />

        <Route path="/*" element={<Page404 />} />
        {/* Puedes agregar más rutas según tus necesidades */}
      </Routes>
    </PreciosProvider>
  );
};

