import { Route, Routes } from 'react-router-dom';
import { OrganigramaRoutes } from '../organigrama/routes/OrganigramaRoutes';
import { CcdRoutes } from '../ccd/routes/CcdRoutes';
import { TrdRoutes } from '../trd/routes/TrdRoutes';
import { TcaRoutes } from '../tca/routes/TcaRoutes';
import { VentanillaRoutes } from '../ventanilla/routes/VentanillaRoutes';
import { Page404 } from '../../../screens/404';
import { DepositosRoutes } from '../deposito/router/DepositosRoutes';

import { ConfigYDatosBasicosRoutes } from '../configYdatosBasicos/ConfigYDatosBasicosRoutes';
import DialogCcdActual from '../organigrama/componentes/DialogElegirCcdActual/DialogElegirCcdActual';

import { Alertas_gestor_Routes } from '../alertasgestor/routes/AlertasRoutes';
import { PQR_Configuracion_Routes } from '../configuracionTiposQQR/routes/rutasConfiguracionTiposPQR';
import { AdministracionPlantillaDocumentos_Routes } from '../administracionPlantillaDocumentos/routes/rutasAdimistracionPlantillaDocumentos';
// import { Suspense } from 'react';
// import { Loader } from '../../../utils/Loader/Loader';

const routes = [
  {
    path: 'organigrama/',
    name: 'organigrama',
    component: () => <OrganigramaRoutes />,
  },
  {
    path: 'ccd/',
    name: 'ccd',
    component: () => <CcdRoutes />,
  },
  {
    path: 'trd/',
    name: 'trd',
    component: () => <TrdRoutes />,
  },
  {
    path: 'tca/',
    name: 'tca',
    component: () => <TcaRoutes />,
  },
  // ? trasladar a configuracion y datos basicos
  {
    path: 'archivo/',
    name: 'archivo',
    component: () => <DepositosRoutes />,
  },
  {
    path: 'ventanilla_unica/',
    name: 'ventanilla_unica',
    component: () => <VentanillaRoutes />,
  },

  //! rutas de configuracion y datos básicos
  {
    path: 'configuracion_datos_basicos/',
    name: 'configuracion',
    component: () => <ConfigYDatosBasicosRoutes />,
  },
  {
    path: 'activacion_instrumentos_archivisticos',
    name: 'activacion_instrumentos_archivisticos',
    component: () => <DialogCcdActual />,
  },
  {
    path: 'alertas_gestor/',
    name: 'alertas_gestor',
    component: () => <Alertas_gestor_Routes />,
  },
  {
    path: 'configuracion_pqr/',
    name: 'configuracion_pqr',
    component: () => <PQR_Configuracion_Routes />,
  },
  {
    path: 'plantilladocumentos/',
    name: 'plantilladocumentos',
    component: () => <AdministracionPlantillaDocumentos_Routes />,
  },
];


// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestorDocumentalRoutes: React.FC = () => {
  return (
    // <Suspense fallback={<Loader />}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={`${route.path}/${route.path === '/' ? '' : '*'}`}
            element={route.component()}
          />
        ))}
        <Route path="/*" element={<Page404 />} />
      </Routes>
    // </Suspense>
  );
};