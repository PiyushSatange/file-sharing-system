import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer  from '../Redux/Slice/authenticationSlice'

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer
  },
})