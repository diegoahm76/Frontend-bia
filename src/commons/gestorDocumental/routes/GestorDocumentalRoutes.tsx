/* eslint-disable no-unused-vars */
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
import { Confi_Encuasta_Routes } from '../confiAlerta/routes/Confi_encuesta';
import { InfoEncuesta } from '../InfoEncuesta/routes/InfoEncuesta';
import { Encuasta_Routes as Encuesta } from '../Encuesta/routes/Encuasta_Routes';
import { ConfiguracionMediosSolicitud_routes } from '../configuracionMediosSolicitud/routes/RutasConfiguracionMediosSolicitud';
import { ExpedientesRoutes } from '../Expedientes/router/ExpedientesRouter';
import { Reubicacion_Expediantes_Routes } from '../ReubicacionExpediente/routes/Reubicacion_Routes';
import { ConfiguracionMetadatosRoutes } from '../configuracionMetadatos/router/MetadatosRoutes';
import { ArchivoFisicoRoutes } from '../archivoFisico/routes/ArchivoFisicoRoute';
import { ConfiguracionTiposExpedientes_Routes } from '../configuracionTiposExpediente/routes/rutasConfiguracionTiposExpedientes';
import { ConfiTiempoRespuestaRoutes } from '../confiTiemposRespuestaPlazoAccion/routes/ConfiTiempoRespuestaRoute';
import { ReportesDocumentacionRoutes } from '../reportesDocumentacionPermisos/routes/ReportesDocumentosRoutes';
import { Encuasta_Routess as EncuestaRoutes } from '../encuestaAsignacion/routes/Encuesta_Asignacion';
import { Encuasta_encuestas_Routes } from '../InternoEncuestas/routes/Interno_Routes';
import { PqrsdfRoutes } from '../PQRSDF/routes/PqrsdfRoutes';
import { CentralDigitalizacionRoutes } from '../CentralDigitalizacion/routes/CentralDigitalizacionRoutes';
import { PanelVentanillaRoutes } from '../panelDeVentanilla/routes/PanelVentanilla.routes';
import { SolicitudesOtrosRoutes } from '../solicitudesOtros/routes/SolicitudesOtrosRoute';
import { TramitesServiciosRouter } from '../TramitesOServicios/router/TramitesServiciosRouter';
import { ComplementoPqrsdfRoutes } from '../complementoPQRSDF/routes/ComplementoPqrsdfRoutes';
import { BandejaTareasRoutes } from '../bandejaDeTareas/routes/BandejaTareas.routes';
import { RutesWorkFlowPQRSDF } from '../WorkFlowPQRSDF/routes/RutesWorkFlowPQRSDF';
import { Consulta_Solicitud_Routes } from '../consultaSolicitud/routes/ConsultaSolicitud';
import { Consulta_ExternoPQR_Routes } from '../consultarEstadoExternoPQR/routes/ConsultaExternoPQR';
import { Consulta_AnonimoPQR_Routes } from '../consultaAnonimoPQR/routes/ConsultaAnonimo';
import { Consulta_Otros_Routes } from '../consltaOtros/routes/ConsiltaOtros';
import { Consulta_OtrosExterno_Routes } from '../consltaOtrosExterno/routes/ConsultarOtrosEterno';
import { DeleteDocumental_Routes } from '../eliminacionDocumental/routes/DeleteDocuemtal_Routes';
import { Radicado_Email_Routes } from '../radicadoEmail/routes/RadicadoEmail';
import { ConsecutivoConfi } from '../configuracionConsecutivo/routes/ConsecutivoConfi';
import { RutesIndicadores } from '../IndicadorsPQRSDFG/routes/RutesIndicadores';
import { RutasCentralDigitalizacionOtros } from '../centraldigitalizacionOtros/routes/RutasCentralDigitalizacionOtros';
import { RutasTransferenciaDocumental } from '../transferenciaDocumental/routes/RutasTransferenciaDocumental';
import { ConsultaEstadoSolicitudes } from '../consulltaEstadoSolicitudes/routes/ConsultaEstadoSolicitudes.routes';
import { Digitalizacion_opas_Routes } from '../digitalizacionOpas/routes/OpasRutes';
import { Ejemplo } from './components/Ejemplo';
import { RutesTramitesServicos } from '../TramitesServicios/routes/RutasTramitesServicos';
import { ReporGenGestorMainScreen } from '../ReportesGeneralesGestorDocumental/screen/ReporGenGestorMainScreen';
import { ChartDataProvider } from '../ReportesGeneralesGestorDocumental/context/DataChartContext';
import { ReportIndicadoresPqrsdf } from '../ReportesIndicadoresPqrsdf/screen/ReportIndicadoresPqrsdf';
import { ChartDataProviderPQRSDF } from '../ReportesIndicadoresPqrsdf/context/DataChartContext';
import { LiquidacionRutesPago } from '../Liquidacion_dos/routes/LiquidacionRutes';

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
    component: () => <Encuesta />,
  },

  {
    path: 'Reubicacion_Expedientes/',
    name: 'Reubicacion_Expedientes',
    component: () => <Reubicacion_Expediantes_Routes />,
  },
  {
    path: 'encuesta_asignacion/',
    name: 'encuesta_asignacion',
    component: () => <EncuestaRoutes />,
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
    path: 'panel_ventanilla/',
    name: 'panel_ventanilla/',
    component: () => <PanelVentanillaRoutes />,
  },
  {
    path: 'bandeja_tareas/',
    name: 'bandeja_tareas/',
    component: () => <BandejaTareasRoutes />,
  },
  {
    path: 'central_digitalizacion/',
    name: 'central_digitalizacion',
    component: () => <CentralDigitalizacionRoutes />,
  },
  {
    path: 'busqueda/',
    name: 'busqueda',
    component: () => <RutesWorkFlowPQRSDF />,
  },
  {
    path: 'juridica/',
    name: 'juridica',
    component: () => <RutesTramitesServicos />,
  },
  {
    path: 'indicadores_pqrsdf/',
    name: 'indicadores_pqrsdf',
    component: () => <RutesIndicadores />,
  },
  {
    path: 'solicitudes_otros/',
    name: 'solicitudes_otros',
    component: () => <SolicitudesOtrosRoutes />,
  },
  {
    path: 'tramites',
    name: 'tramites',
    component: () => <TramitesServiciosRouter />,
  },
  {
    path: 'digitalizacion_opas/',
    name: 'digitalizacion_opas',
    component: () => <Digitalizacion_opas_Routes />,
  },

  {
    path: 'Pqrsdf/complementos/',
    name: 'complementos_pqrsdf',
    component: () => <ComplementoPqrsdfRoutes />,
  },
  {
    path: 'radicado_email/',
    name: 'radicado_email',
    component: () => <Radicado_Email_Routes />,
  },
  {
    path: 'consecutivo_configuracion/',
    name: 'consecutivo_configuracion',
    component: () => <ConsecutivoConfi />,
  },

  {
    path: 'Reportes_PQRSDF/',
    name: 'Reportes_PQRSDF',
    component: () => <Consulta_Solicitud_Routes />,
  },
  {
    path: 'Consulta_AnonimoPQR/',
    name: 'Consulta_AnonimoPQR',
    component: () => <Consulta_AnonimoPQR_Routes />,
  },
  {
    path: 'consulta_estado/',
    name: 'consulta_estado',
    component: () => <ConsultaEstadoSolicitudes />,
  },
  {
    path: 'ConsultaExternoPQR/',
    name: 'ConsultaExternoPQR',
    component: () => <Consulta_ExternoPQR_Routes />,
  },

  {
    path: 'ConsultaOtros/',
    name: 'ConsultaOtros',
    component: () => <Consulta_Otros_Routes />,
  },
  {
    path: 'ConsultaOtrosExterno/',
    name: 'ConsultaOtrosExterno',
    component: () => <Consulta_OtrosExterno_Routes />,
  },

  {
    path: 'Eliminacion_Documental/',
    name: 'Eliminacion_Documental',
    component: () => <DeleteDocumental_Routes />,
  },
  {
    path: 'central_digitalizacion_otros/',
    name: 'central_digitalizacion_otros',
    component: () => <RutasCentralDigitalizacionOtros />,
  },
  {
    path: 'transferencia_documental/',
    name: 'transferencia_documental',
    component: () => <RutasTransferenciaDocumental />,
  },
  {
    path: 'ejemploResponsive/',
    name: 'ejemploResponsive',
    component: () => <Ejemplo />,
  },

  // ? reportes generales del gestor documental
  {
    path: 'reportes_generales_gestor_documental/',
    name: 'reportes_generales_gestor_documental',
    component: () => (
      <ChartDataProvider>
        <ReporGenGestorMainScreen />
      </ChartDataProvider>
    ),
  },
  {
    path: 'reportes_pqrsdf_gestor_documental/',
    name: 'reportes_pqrsdf_gestor_documental',
    component: () => (
      <ChartDataProviderPQRSDF>
        <ReportIndicadoresPqrsdf />
      </ChartDataProviderPQRSDF>
    ),
  },
  {
    path: 'liquidacionnn/',
    name: 'liquidacionnn',
    component: () => <LiquidacionRutesPago />,
  },
];



// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestorDocumentalRoutes: React.FC = () => {
  return (
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
  );
};
