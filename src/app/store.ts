import { configureStore } from '@reduxjs/toolkit'
import toggleReducer from './elements/toggle'
import listReducer from './elements/list'

export const store = configureStore({
  reducer: {
    // reducers = elements in redux store
    toggle: toggleReducer,
    list: listReducer
  },
})

// connections
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch