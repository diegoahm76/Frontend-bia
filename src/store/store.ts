import { configureStore, 
  // combineReducers, 
  // type Reducer, type AnyAction 
} from '@reduxjs/toolkit'
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import storageSession from 'redux-persist/lib/storage/session';
// // import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
// import thunk  from "redux-thunk";

import { layout_slice } from './layoutSlice'
import { auth_slice } from '../commons/auth/store/authSlice'
import { organigrama_slice } from '../commons/gestorDocumental/organigrama/store/slices/organigramSlice';
import { ccd_slice } from '../commons/gestorDocumental/ccd/store/slices/ccdSlice';
import { series_slice } from '../commons/gestorDocumental/ccd/store/slices/seriesSlice';
import { subseries_slice } from '../commons/gestorDocumental/ccd/store/slices/subseriesSlice';
import { assignments_slice } from '../commons/gestorDocumental/ccd/store/slices/assignmentsSlice';
// import type {  PersistedState } from 'redux-persist/es/types';
// import type {  PersistPartial } from 'redux-persist/es/persistReducer';
// import { type IUserInfo } from '../commons/auth/interfaces/authModels';
// import { type IOrganigram } from '../commons/gestorDocumental/organigrama/interfaces/organigrama';
// import { type IAssignments, type ICCD, type ISeries, type ISubSeries } from '../commons/gestorDocumental/ccd/interfaces/ccd';
// import { general_transform } from './transforms2';
  
  // const persist_config = {
  //   key: 'root',
  //   storage,
  //   // transforms: [general_transform],
  //   // stateReconciler: autoMergeLevel1,
  //   whitelist: ['auth','layout'],
  //   blacklist: ['organigram', 'ccd','series', 'subseries', 'assignments'],
  // }

  // const auth_persist_config= {
  //   key: 'auth',
  //   storage: storageSession
  // }

  // const root_reducer= combineReducers({
  //   auth: persistReducer(auth_persist_config, auth_slice.reducer),
  //   layout: layout_slice.reducer,
  //   organigram: organigrama_slice.reducer,
  //   ccd: ccd_slice.reducer, 
  //   series: series_slice.reducer,
  //   subseries: subseries_slice.reducer,
  //   assignments: assignments_slice.reducer
  // });


  // const persisted_reducer = persistReducer(persist_config, root_reducer)

  export const store = configureStore({
    // reducer: persisted_reducer,
    // middleware: [thunk],
    reducer: {
      auth: auth_slice.reducer,
      layout: layout_slice.reducer,
      organigram: organigrama_slice.reducer,
      ccd: ccd_slice.reducer, 
      series: series_slice.reducer,
      subseries: subseries_slice.reducer,
      assignments: assignments_slice.reducer
    }
    
  });

// eslint-disable-next-line no-restricted-syntax
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;