import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// connect dispatch function
export const useAppDispatch = () => useDispatch<AppDispatch>()
// connect functionality to connect to redux state
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector