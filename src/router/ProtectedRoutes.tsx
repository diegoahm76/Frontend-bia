import { Navigate, Route, Routes } from 'react-router-dom';
import { HomeRoutes } from '../commons/home/routes/HomeRoutes';
import { SeguridadRoutes } from '../commons/seguridad/routers/SeguridadRoutes';
import { GestorDocumentalRoutes } from '../commons/gestorDocumental/routes/GestorDocumentalRoutes';
import { MainLayout } from '../layouts/MainLayout';
import { AlmacenRoutes } from '../commons/almacen/routes/AlmacenRoutes';
import { ConservacionRoutes } from '../commons/conservacion/routes/ConservacionRoutes';
import { RecaudoRoutes } from '../commons/recaudo/routes/RecaudoRoutes';
import { RecursoHidricoRoutes } from '../commons/recursoHidrico/routers/RecursoHidricoRoutes';
import { UserRoutes } from '../commons/seguridad/routers/UserRoutes';
import { useEffect } from 'react';

// * changes
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../commons/auth/interfaces';
import { TransversalRoutes } from '../commons/Transversales/routes/TransversalRoutes';
import { AlertasProvider } from '../commons/Transversales/modules/Alertas/context/AlertasContext';
import { ModalAndLoadingProvider } from '../context/GeneralContext';
import { SeguimientoPlanesRoutes } from '../commons/seguimirntoPlanes/routes/SeguimientoPlanesRoutes';

//* changes
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProtectedRoutes: React.FC = () => {
  //* changes

  const { permisos: permisos_store } = useSelector(
    (state: AuthSlice) => state.auth
  );

  useEffect(() => {
    // //  console.log('')('permisos_store', permisos_store);
  }, [permisos_store]);

  const allowed_routes = permisos_store.map(
    (permission) => permission.subsistema
  );
  // //  console.log('')('allowedRoutes', allowed_routes);

  //* changes

  return (
    <ModalAndLoadingProvider>
      <AlertasProvider>
        <Routes>
          <Route path="/*" element={<MainLayout />}>
            {/* ---------------- Dashboard ---------------- */}
            <Route path="home/*" element={<HomeRoutes />} />
            {/* ---------------- Seguridad ---------------- */}
            {allowed_routes.includes('SEGU') ? (
              <Route path="seguridad/*" element={<SeguridadRoutes />} />
            ) : null}
            {/* ---------------- Gestor documental ---------------- */}
           {allowed_routes.includes('GEST') ? (
              <Route
                path="gestor_documental/*"
                element={<GestorDocumentalRoutes />}
              />
            ) : null}
            {/* ---------------- Almacen ---------------- */}
            {allowed_routes.includes('ALMA') ? (
              <Route path="almacen/*" element={<AlmacenRoutes />} />
            ) : null}
            {/* ---------------- Conservación ---------------- */}
            {allowed_routes.includes('CONS') ? (
              <Route path="conservacion/*" element={<ConservacionRoutes />} />
            ) : null}
            {/* ---------------- Recurso Hidrico ---------------- */}
            {allowed_routes.includes('RECU') ? (
              <Route
                path="recurso_hidrico/*"
                element={<RecursoHidricoRoutes />}
              />
            ) : null}

            {/* ---------------- Recaudo ---------------- */}
            {allowed_routes.includes('RECA') ? (
              <Route path="recaudo/*" element={<RecaudoRoutes />} />
            ) : null}
            {/* ---------------- Transversal ---------------- */}
            {allowed_routes.includes('TRSV') ? (
              <Route path="transversal/*" element={<TransversalRoutes />} />
            ) : null}
            {/* ---------------- Transversal ---------------- */}
            {allowed_routes.includes('PLAN') ? (
              <Route path="planes/*" element={<SeguimientoPlanesRoutes />} />
            ) : null}
            {/* Usuarios */}

            {/* new transversales */}

            <Route path="usuario/*" element={<UserRoutes />} />

            <Route path="*" element={<Navigate to="/app/home" />} />
          </Route>
        </Routes>
      </AlertasProvider>
    </ModalAndLoadingProvider>
  );
};
