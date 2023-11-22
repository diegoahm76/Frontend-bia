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
import { Confi_Encuasta_Routes } from '../confiAlerta/routes/Confi_encuesta';
import { InfoEncuesta } from '../InfoEncuesta/routes/InfoEncuesta';
import { Encuasta_Routes } from '../Encuesta/routes/Encuasta_Routes';

import { ConfiguracionMediosSolicitud_routes } from '../configuracionMediosSolicitud/routes/RutasConfiguracionMediosSolicitud';
import { ExpedientesRoutes } from '../Expedientes/router/ExpedientesRouter';

import { ConfiguracionMetadatosRoutes } from '../configuracionMetadatos/router/MetadatosRoutes';
import { CierreExpedientesRoutes } from '../Expedientes/cierreExpediente/routes/CierreExpedientesRoutes';
import { ArchivoFisicoRoutes } from '../archivoFisico/routes/ArchivoFisicoRoute';
import { ConfiguracionTiposExpedientes_Routes } from '../configuracionTiposExpediente/routes/rutasConfiguracionTiposExpedientes';
import { ConfiTiempoRespuestaRoutes } from '../confiTiemposRespuestaPlazoAccion/routes/ConfiTiempoRespuestaRoute';
import { ReportesDocumentacionRoutes } from '../reportesDocumentacionPermisos/routes/ReportesDocumentosRoutes';
import { Encuasta_Routess } from '../encuestaAsignacion/routes/Encuesta_Asignacion';
import { Encuasta_encuestas_Routes } from '../InternoEncuestas/routes/Interno_Routes';
import { PqrsdfRoutes } from '../PQRSDF/routes/PqrsdfRoutes';
import { CentralDigitalizacionRoutes } from '../CentralDigitalizacion/routes/CentralDigitalizacionRoutes';
// import { ExpedientesRoutes } from '../Expedientes/router/ExpedientesRouter';

const routes = [
  {
    path: 'organigrama/',
    name: 'organigrama',
    component: () => <OrganigramaRoutes />,
  },
  //! dentro de ccd va a estar la ruta de permisos sobre series documentales
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
    path: 'configuracion_datos_basicos',
    name: 'configuracion',
    component: () => <ConfigYDatosBasicosRoutes />,
  },
  {
    path: 'metadatos/',
    name: 'metadatos',
    component: () => <ConfiguracionMetadatosRoutes />,
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
  {
    path: 'configuracionmedio/',
    name: 'configuracionmedio',
    component: () => <ConfiguracionMediosSolicitud_routes />,
  },
  {
    path: 'configuraciontiposexpedientes/',
    name: 'configuraciontiposexpedientes',
    component: () => <ConfiguracionTiposExpedientes_Routes />,
  },
  {
    path: 'encuesta_configuracion/',
    name: 'encuesta_configuracion',
    component: () => <Confi_Encuasta_Routes />,
  },
  {
    path: 'encuesta_datos/',
    name: 'encuesta_datos',
    component: () => <InfoEncuesta />,
  },
  {
    path: 'encuesta/',
    name: 'encuesta',
    component: () => <Encuasta_Routes />,
  },
  {
    path: 'encuesta_asignacion/',
    name: 'encuesta_asignacion',
    component: () => <Encuasta_Routess />,
  },
  {
    path: 'Interno_encuesta/',
    name: 'Interno_encuesta',
    component: () => <Encuasta_encuestas_Routes />,
  },

  {
    path: 'expedientes/',
    name: 'expedientes',
    component: () => <ExpedientesRoutes />,
    // component: () => <CierreExpedientesRoutes />,
  },
  {
    path: 'archivo_fisico/',
    name: 'archivo_fisico',
    component: () => <ArchivoFisicoRoutes />,
  },
  {
    path: 'configuracion_tiempo_respuesta/',
    name: 'configuracion_tiempo_respuesta',
    component: () => <ConfiTiempoRespuestaRoutes />,
  },
  {
    path: 'reportes_documentacion/',
    name: 'reportes_documentacion',
    component: () => <ReportesDocumentacionRoutes />,
  },
  {
    path: 'Pqrsdf/',
    name: 'Pqrsdf',
    component: () => <PqrsdfRoutes />,
  },
  {
    path: 'central_digitalizacion/',
    name: 'central_digitalizacion',
    component: () => <CentralDigitalizacionRoutes />,
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
