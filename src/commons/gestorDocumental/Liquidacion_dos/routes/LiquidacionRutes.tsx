/* eslint-disable @typescript-eslint/naming-convention */

import { Routes, Route } from 'react-router-dom';
import { ProcesoLiquidacionScreen } from '../screens/BandejaEntradaLiquidacion';
import { Page404 } from '../../../../screens/404';
import { PreciosProvider } from '../context/PersonalContext'; // Importa el proveedor de contexto para los precios
import { BuscarPagosIniciados } from '../screens/BuscarPagosIniciados';
import { DocumentoPagoLiquidacion } from '../components/Documento&Pago/Documento&Pago';
import { FinalizaeLiquidacion } from '../screens/FinalizaeLiquidacion';
import { ReferenciasPagosHistorial } from '../screens/ReferenciasPagosHistorial';

// Componente que define las rutas relacionadas con los pagos de liquidación
export const LiquidacionRutesPago: React.FC = () => {
  return (
    // Proveedor de contexto que envuelve las rutas para proporcionar el contexto de precios a los componentes hijos
    <PreciosProvider>
      <Routes>
        {/* Rutas para cada pantalla relacionada con los pagos de liquidación */}
        <Route path="/activacion" element={<ProcesoLiquidacionScreen />} /> {/* Ruta para la pantalla de activación */}
        <Route path="/pagos_iniciados" element={<BuscarPagosIniciados />} /> {/* Ruta para la pantalla de búsqueda de pagos iniciados */}
        <Route path="/documneto" element={<DocumentoPagoLiquidacion />} /> {/* Ruta para la pantalla de documento y pago */}
        <Route path="/finalizar_liquidacion" element={<FinalizaeLiquidacion />} /> {/* Ruta para la pantalla de finalización de liquidación */}
        <Route path="/referencias_pagos" element={<ReferenciasPagosHistorial />} /> {/* Ruta para la pantalla de historial de referencias de pagos */}

        {/* Ruta por defecto para mostrar la página 404 cuando ninguna otra ruta coincide */}
        <Route path="/*" element={<Page404 />} />
        {/* Puedes agregar más rutas según tus necesidades */}
      </Routes>
    </PreciosProvider>
  );
};
