import { configureStore } from '@reduxjs/toolkit';

import { organigrama_slice } from './slices/organigramSlice';
// import CCDReducer from "./slices/CCD/indexCCD";
// import seriesReducer from "./slices/series/indexSeries";
// import subSeriesReducer from "./slices/subSeries/indexSubSeries";

const store = configureStore({
  reducer: {
    organigram: organigrama_slice.reducer,
    // CCD: CCDReducer,
    // series: seriesReducer,
    // subSeries: subSeriesReducer,
  },
});

// eslint-disable-next-line no-restricted-syntax
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
