import { configureStore } from '@reduxjs/toolkit'
import { auth_slice } from '../commons/auth/store/authSlice'

export const store = configureStore({
  reducer: { 
    auth: auth_slice.reducer
   },
})