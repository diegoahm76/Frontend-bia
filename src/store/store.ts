import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import { layout_slice } from './layoutSlice';
import { auth_slice } from '../commons/auth/store/authSlice';
import { organigrama_slice } from '../commons/gestorDocumental/organigrama/store/slices/organigramSlice';
import { ccd_slice } from '../commons/gestorDocumental/ccd/store/slices/ccdSlice';
import { series_slice } from '../commons/gestorDocumental/ccd/store/slices/seriesSlice';
import { subseries_slice } from '../commons/gestorDocumental/ccd/store/slices/subseriesSlice';
import { assignments_slice } from '../commons/gestorDocumental/ccd/store/slices/assignmentsSlice';
import { bien_form } from '../commons/almacen/entradaysalidaArticulos/slices/indexCatalogodeBienes';  

const persist_config = {
  key: 'macarenia_app',
  storage,
  whitelist: ['auth', 'layout']
};

const app_reducers = combineReducers({
  auth: auth_slice.reducer,
  layout: layout_slice.reducer,
  organigram: organigrama_slice.reducer,
  ccd: ccd_slice.reducer,
  series: series_slice.reducer,
  subseries: subseries_slice.reducer,
  assignments: assignments_slice.reducer,
  bien: bien_form.reducer,

});

const persist_reducer = persistReducer(persist_config, app_reducers);

export const store = configureStore({
  middleware: [thunk],
  reducer: persist_reducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
