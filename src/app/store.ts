import { configureStore } from '@reduxjs/toolkit'
import toggleReducer from './elements/toggle'
import listReducer from './elements/list'

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    list: listReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch