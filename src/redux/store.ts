import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    immutableCheck: true,
    serializableCheck: true,
    thunk: true,
  }),
})
