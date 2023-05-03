import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import { layout_slice } from "./layoutSlice";
import { auth_slice } from "../commons/auth/store/authSlice";
import { seguridad_slice } from "../commons/seguridad/store/seguridadSlice";
import { nursery_slice } from "../commons/conservacion/gestorVivero/store/slice/viveroSlice";
import { material_vegetal_slice } from "../commons/conservacion/materialVegetal/store/slice/materialvegetalSlice";
import { configuracion_slice } from "../commons/conservacion/configuracion/store/slice/configuracionSlice";
import { produccion_slice } from "../commons/conservacion/produccion/store/slice/produccionSlice";
import { bien_slice } from "../commons/almacen/gestionDeInventario/catalogoBienes/store/slices/indexCatalogodeBienes";
import { cv_computo_slice } from "../commons/almacen/gestionDeInventario/gestionHojaDeVida/hojaDeVidaComputo/store/slices/indexCvComputo";
import { organigrama_slice } from "../commons/gestorDocumental/organigrama/store/slices/organigramSlice";
import { ccd_slice } from "../commons/gestorDocumental/ccd/store/slices/ccdSlice";
import { series_slice } from "../commons/gestorDocumental/ccd/store/slices/seriesSlice";
import { subseries_slice } from "../commons/gestorDocumental/ccd/store/slices/subseriesSlice";
import { assignments_slice } from "../commons/gestorDocumental/ccd/store/slices/assignmentsSlice";
import {
  marcas_slice,
  porcentajes_slice,
  medida_slice,
} from "../commons/almacen/configuracion/store/slice/MarcaMedidaPorcentajeSlice";
import { bodegas_slice } from "../commons/almacen/configuracion/store/slice/BodegaSlice";
import { cv_others_slice } from "../commons/almacen/gestionDeInventario/gestionHojaDeVida/hojaDeVidaOtrosActivos/store/slices/indexCvOtrosActivos";
import { cve_vehicle_slice } from "../commons/almacen/gestionDeInventario/gestionHojaDeVida/hojaDeVidaVehiculo/store/slices/indexCvVehiculo";
import { solicitud_consumo_slice } from "../commons/almacen/registroSolicitudesAlmacen/solicitudBienConsumo/store/slices/indexSolicitudBienesConsumo";

const persist_config = {
  key: "macarenia_app",
  storage,
  whitelist: ["auth", "layout"],
};

const app_reducers = combineReducers({
  auth: auth_slice.reducer,
  seguridad: seguridad_slice.reducer,
  layout: layout_slice.reducer,
  organigram: organigrama_slice.reducer,
  ccd: ccd_slice.reducer,
  series: series_slice.reducer,
  subseries: subseries_slice.reducer,
  assignments: assignments_slice.reducer,
  nursery: nursery_slice.reducer,
  marca: marcas_slice.reducer,
  porcentaje: porcentajes_slice.reducer,
  medida: medida_slice.reducer,
  bien: bien_slice.reducer,
  configuracion: configuracion_slice.reducer,
  produccion: produccion_slice.reducer,
  cv: cv_computo_slice.reducer,
  material_vegetal: material_vegetal_slice.reducer,
  bodegas: bodegas_slice.reducer,
  cvo: cv_others_slice.reducer,
  cve: cve_vehicle_slice.reducer,
  solic_consumo: solicitud_consumo_slice.reducer,
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
