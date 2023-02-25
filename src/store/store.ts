import { configureStore } from '@reduxjs/toolkit'
import { auth_slice } from '../commons/auth/store/authSlice'
import { sidebar_slice } from './layoutSlice'

export const store = configureStore({
  reducer: { 
    auth: auth_slice.reducer,
    sidebar: sidebar_slice.reducer
   },
})