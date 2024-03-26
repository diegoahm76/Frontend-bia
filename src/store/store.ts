import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

import { layout_slice } from './layoutSlice';
import { auth_slice } from '../commons/auth/store/authSlice';
import { seguridad_slice } from '../commons/seguridad/store/seguridadSlice';
import { nursery_slice } from '../commons/conservacion/gestorVivero/store/slice/viveroSlice';
import { material_vegetal_slice } from '../commons/conservacion/materialVegetal/store/slice/materialvegetalSlice';
import { configuracion_slice } from '../commons/conservacion/configuracion/store/slice/configuracionSlice';
import { distribucion_slice } from '../commons/conservacion/distribucion/store/slice/distribucionSlice';
import { produccion_slice } from '../commons/conservacion/produccion/store/slice/produccionSlice';
import { bien_slice } from '../commons/almacen/gestionDeInventario/catalogoBienes/store/slices/indexCatalogodeBienes';
import { cv_computo_slice } from '../commons/almacen/gestionDeInventario/gestionHojaDeVida/hojaDeVidaComputo/store/slices/indexCvComputo';
import { organigrama_slice } from '../commons/gestorDocumental/organigrama/store/slices/organigramSlice';
import { ccd_slice } from '../commons/gestorDocumental/ccd/store/slices/ccdSlice';
import { series_slice } from '../commons/gestorDocumental/ccd/store/slices/seriesSlice';
import { subseries_slice } from '../commons/gestorDocumental/ccd/store/slices/subseriesSlice';
import { assignments_slice } from '../commons/gestorDocumental/ccd/store/slices/assignmentsSlice';
import {
  marcas_slice,
  porcentajes_slice,
  medida_slice,
} from '../commons/almacen/configuracion/store/slice/MarcaMedidaPorcentajeSlice';
import { despacho_slice } from '../commons/almacen/registroSolicitudesAlmacen/despacho/store/slices/indexDespacho';
import { cv_others_slice } from '../commons/almacen/gestionDeInventario/gestionHojaDeVida/hojaDeVidaOtrosActivos/store/slices/indexCvOtrosActivos';
import { solicitud_consumo_slice } from '../commons/almacen/registroSolicitudesAlmacen/solicitudBienConsumo/store/slices/indexSolicitudBienesConsumo';
import { facilidades_slice } from '../commons/recaudo/facilidadPago/slices/FacilidadesSlice';
import { solicitud_facilidad_slice } from '../commons/recaudo/facilidadPago/slices/SolicitudSlice';
import { reportes_recaudo_slice } from '../commons/recaudo/reportes/slices/ReportesSlice';
import { seriesAndSubseriesSlice } from '../commons/gestorDocumental/ccd/componentes/CatalogoSeriesYSubseries/slice/CatalogoSeriesYSubseriesSlice';
import { solicitud_vivero_slice } from '../commons/conservacion/solicitudMaterial/store/slices/indexSolicitud';
import { finished_ccd_slice } from '../commons/gestorDocumental/trd/toolkit/CCDResources/slices/CCDResourcesSlice';
import { trd_slice } from './../commons/gestorDocumental/trd/toolkit/TRDResources/slice/TRDResourcesSlice';
import { entrega_slice } from '../commons/almacen/gestionDeInventario/movimientos/store/slice/indexEntrega';
import { instrumentos_slice } from '../commons/recursoHidrico/Instrumentos/toolkit/slice/instrumentosSlice';
import { TCASlice } from '../commons/gestorDocumental/tca/toolkit/TCAResources/slice/TcaSlice';
import { lideres_slice } from '../commons/Transversales/modules/corporativo/screens/LideresXUnidadOrg/toolkit/LideresSlices/LideresSlice';
import { uni_a_uni_slice } from '../commons/Transversales/modules/procesos/screens/Unidad_A_Unidad/toolkit/slice/Uni_A_UniSlice';
import { u_x_e_slice } from '../commons/Transversales/modules/procesos/screens/Unidad_Por_Entidad/toolkit/UxE_slice/UxE_slice';
import { deposito_slice } from '../commons/gestorDocumental/deposito/store/slice/indexDeposito';
import { resolucion_facilidad_slice } from '../commons/recaudo/facilidadPago/slices/ResolucionSlice';
import { plan_pagos_slice } from '../commons/recaudo/facilidadPago/slices/PlanPagosSlice';
import { alerta_slice } from '../commons/recaudo/alertas/store/slice/indexAlertas';
import { PsdSlice } from '../commons/gestorDocumental/permisosSeriesDoc/toolkit/slice/PSDSlice';
import { metadatos_slice } from '../commons/gestorDocumental/configuracionMetadatos/store/slice/indexMetadatos';

import { bodegas_slice } from '../commons/almacen/configuracion/store/slice/BodegaSlice';
import { deudores_slice } from '../commons/recaudo/facilidadPago/slices/DeudoresSlice';
import { cve_vehicle_slice } from '../commons/almacen/gestionDeInventario/gestionHojaDeVida/hojaDeVidaVehiculo/store/slices/indexCvVehiculo';
import { ctrlAccesoExpSlice } from '../commons/gestorDocumental/controlAccesExped/toolkit/slice/CtrlAccesoExpSlice';
import { HomologacionesSlice } from '../commons/gestorDocumental/actividadesPreviasCambioCCD/modules/homologacionDeSeccionesPersistentes/toolkit/slice/HomologacionesSeriesSlice';
import { obligaciones_slice } from '../commons/recaudo/facilidadPago/slices/ObligacionesSlice';
import { cierre_expedientes_slice } from '../commons/gestorDocumental/Expedientes/cierreExpediente/store/slice/indexCierreExpedientes';
import { archivo_fisico_slice } from '../commons/gestorDocumental/archivoFisico/store/slice/indexArchivoFisico';
import { configuracion_tiempo_respuesta_slice } from '../commons/gestorDocumental/confiTiemposRespuestaPlazoAccion/store/slice/indexConfiTiemposRespPlazoAccion';
import { AsigUniRespSlice } from '../commons/gestorDocumental/actividadesPreviasCambioCCD/modules/asignacionUnidadesResponsables/toolkit/slice/types/AsignacionUniResp';
import { reportes_documentacion_slice } from '../commons/gestorDocumental/reportesDocumentacionPermisos/store/slice/indexReporteDocumentacion';
import { DelOfiResSlice } from '../commons/gestorDocumental/actividadesPreviasCambioCCD/modules/delegacionDeOficinasResponsables/toolkit/slice/DelOfiResSlice';
import { pqrsdf_slice } from '../commons/gestorDocumental/PQRSDF/store/slice/pqrsdfSlice';
import { central_digitalizacion_slice } from '../commons/gestorDocumental/CentralDigitalizacion/store/slice/centralDigitalizacionSlice';
import { planes_slice } from '../commons/seguimirntoPlanes/store/slice/indexPlanes';
import { PanelVentanillaSlice } from '../commons/gestorDocumental/panelDeVentanilla/toolkit/store/PanelVentanillaStore';
import { AsignacionUsuarioSlice } from '../commons/gestorDocumental/panelDeVentanilla/module/entrega99/toolkit/slice/AsignacionUsuarioSlice';
import { complemento_pqrsdf_slice } from "../commons/gestorDocumental/complementoPQRSDF/store/slice/complementoPqrsdfSlice";
import { BandejaTareasSlice } from '../commons/gestorDocumental/bandejaDeTareas/toolkit/store/BandejaDeTareasStore';
import { RequerimientoUsarioSlice } from '../commons/gestorDocumental/bandejaDeTareas/modules/requerimientosUsuario/toolkit/slice/RequerimientoUsarioSlice';
import { ResSolicitudUsarioSlice } from '../commons/gestorDocumental/PQRSDF/componentes/respuestaSolicitudUsuario/toolkit/slice/ResSolicitudUsarioSlice';
import { RequerimientoUsarioOpasSlice } from '../commons/gestorDocumental/bandejaDeTareas/modules/OPAS/requerimientosUsuarioOpas/toolkit/slice/RequerimientoUsarioOpasSlice';
import { ReportesGeneralesGestorSlice } from '../commons/gestorDocumental/ReportesGeneralesGestorDocumental/toolkit/ReportesGeneralesGestorSlice';
import { notificaciones_slice } from '../commons/Transversales/modules/notificaciones/store/slice/notificacionesSlice';
import { ResRequerimientoOpaSlice } from '../commons/gestorDocumental/TramitesOServicios/respuestaRequerimientoOpa/toolkit/slice/ResRequerimientoOpaSlice';


const persist_config = {
  key: 'macarenia_app',
  storage: storageSession,
  whitelist: ['auth', 'layout'],
};

const app_reducers = combineReducers({
  auth: auth_slice.reducer,
  layout: layout_slice.reducer,
  organigram: organigrama_slice.reducer,
  ccd: ccd_slice.reducer,
  series: series_slice.reducer,
  subseries: subseries_slice.reducer,
  assignments: assignments_slice.reducer,
  nursery: nursery_slice.reducer,
  seguridad: seguridad_slice.reducer,
  marca: marcas_slice.reducer,
  porcentaje: porcentajes_slice.reducer,
  medida: medida_slice.reducer,
  bien: bien_slice.reducer,
  configuracion: configuracion_slice.reducer,
  produccion: produccion_slice.reducer,
  cv: cv_computo_slice.reducer,
  material_vegetal: material_vegetal_slice.reducer,
  distribucion: distribucion_slice.reducer,
  bodegas: bodegas_slice.reducer,
  despacho: despacho_slice.reducer,
  cvo: cv_others_slice.reducer,
  cve: cve_vehicle_slice.reducer,
  solic_consumo: solicitud_consumo_slice.reducer,
  obligaciones: obligaciones_slice.reducer,
  deudores: deudores_slice.reducer,
  facilidades: facilidades_slice.reducer,
  solicitud_facilidad: solicitud_facilidad_slice.reducer,
  resolucion_facilidad: resolucion_facilidad_slice.reducer,
  plan_pagos: plan_pagos_slice.reducer,
  solicitud_vivero: solicitud_vivero_slice.reducer,
  reportes_recaudo: reportes_recaudo_slice.reducer,
  slice_series_and_subseries: seriesAndSubseriesSlice.reducer,
  // ? trd slices open
  finished_ccd_slice: finished_ccd_slice.reducer,
  trd_slice: trd_slice.reducer,
  // ? trd slices close
  // ! tca slices open
  tca_slice: TCASlice.reducer,
  // ! tca slices close
  // ? lideres slices open
  lideres_slice: lideres_slice.reducer,
  // ? lideres slices close
  // * recurso hidrico slices open
  instrumentos_slice: instrumentos_slice.reducer,
  // * recurso hidrico slices close
  entrega_otros: entrega_slice.reducer,
  deposito: deposito_slice.reducer,
  // ! entrega de unidad a unidad
  uni_a_uni_slice: uni_a_uni_slice.reducer,

  // ! traslados masivos unidad por entidad
  u_x_e_slice: u_x_e_slice.reducer,
  // ! traslados masivos unidad por entidad
  alerta: alerta_slice.reducer,
  //* psd - permisos por serie documenta
  PsdSlice: PsdSlice.reducer,
  // * psd - permisos por serie documenta
  metadatos: metadatos_slice.reducer,
  // ! control acceso expedientes
  ctrlAccesoExpSlice: ctrlAccesoExpSlice.reducer,
  // ! control acceso expedientes
  // ? homologación de series del ccd
  HomologacionesSlice: HomologacionesSlice.reducer,
  // ? homologación de series del ccd
  // expedientes: expedientes_slice.reducer,
  cierre_expedientes: cierre_expedientes_slice.reducer,
  archivo_fisico: archivo_fisico_slice.reducer,
  confi_tiempo_respuesta: configuracion_tiempo_respuesta_slice.reducer,
  //* asignacion de unidades responsables
  AsigUniRespSlice: AsigUniRespSlice.reducer,
  //* asignacion de unidades responsables
  reportes_documentacion: reportes_documentacion_slice.reducer,
  // ? Delegacion oficinas responsables del ccd
  DelOfiResSlice: DelOfiResSlice.reducer,
  // ? panel de ventanilla slice
  PanelVentanillaSlice: PanelVentanillaSlice.reducer,
  // pqrsdf
  pqrsdf_slice: pqrsdf_slice.reducer,
  // ! SEGUIMIENTO A PLANES
  // ? planes
  planes: planes_slice.reducer,
  central_digitalizacion_slice: central_digitalizacion_slice.reducer,
  //* solicitud PQRSDF a usuario reducer
  AsignacionUsuarioSlice: AsignacionUsuarioSlice.reducer,
  //* solicitud PQRSDF a usuario reducer
  complemento_pqrsdf_slice: complemento_pqrsdf_slice.reducer,
  //* bandeja de tareas slice
  BandejaTareasSlice: BandejaTareasSlice.reducer,
  // * cierre bandeja de tareas slice
  // ? requerimiento al usuario slice
  RequerimientoUsarioSlice: RequerimientoUsarioSlice.reducer,
  // ? requerimiento al usuario slice

  //* respuesta solciitud usuario
  ResSolicitudUsarioSlice: ResSolicitudUsarioSlice.reducer,
  //* respuesta solciitud usuario
  //* requerimiento al usuario opas
  RequerimientoUsarioOpasSlice: RequerimientoUsarioOpasSlice.reducer,
  // ? reportes generales gestor slice
  ReportesGeneralesGestorSlice: ReportesGeneralesGestorSlice.reducer,
  ResRequerimientoOpaSlice: ResRequerimientoOpaSlice.reducer,
  notificaciones_slice: notificaciones_slice.reducer,
});

const persist_reducer = persistReducer(persist_config, app_reducers);

export const store = configureStore({
  middleware: [thunk],
  reducer: persist_reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
