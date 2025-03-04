import { configureStore } from '@reduxjs/toolkit'
import userAuthReducer from './Slice/userAuthSlice'

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer
  },
})

export default store;