import { configureStore } from '@reduxjs/toolkit'
import { auth_slice } from '../commons/auth/store/authSlice'
import { sidebar_slice } from './layoutSlice'
import {organigrama_slice} from '../commons/gestorDocumental/organigrama/store/slices/organigramSlice';


export const store = configureStore({
  reducer: { 
    auth: auth_slice.reducer,
    sidebar: sidebar_slice.reducer,
    organigram: organigrama_slice.reducer,
   },
})