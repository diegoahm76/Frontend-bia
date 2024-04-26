/* eslint-disable @typescript-eslint/naming-convention */
import { Routes, Route } from 'react-router-dom';
import { ProcesoLiquidacionScreen } from '../screens/BandejaEntradaLiquidacion';
import { Page404 } from '../../../../screens/404';
import { PreciosProvider } from '../context/PersonalContext';
import { BuscarPagosIniciados } from '../screens/BuscarPagosIniciados';
import { DocumentoPagoLiquidacion } from '../components/Documento&Pago/Documento&Pago';


export const LiquidacionRutesPago: React.FC = () => {
  return (
    <PreciosProvider>
      <Routes>
        <Route path="/activacion" element={<ProcesoLiquidacionScreen/>} />
        <Route path="/pagos_iniciados" element={<BuscarPagosIniciados/>} />
        <Route path="/documneto" element={<DocumentoPagoLiquidacion/>} />


        <Route path="/*" element={<Page404 />} />
        {/* Puedes agregar más rutas según tus necesidades */}
      </Routes>
    </PreciosProvider>
  );
};

