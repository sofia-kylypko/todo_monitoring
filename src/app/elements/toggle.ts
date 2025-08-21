import { createSlice } from '@reduxjs/toolkit'

interface Toggle {
  rotation: number
  visible: boolean
}

const initialState: Toggle = {
  rotation: 0,
  visible: true,
}

const uiSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleSection: (state) => {
      state.rotation += 180
      state.visible = !state.visible
    },
  },
})

export const { toggleSection } = uiSlice.actions
export default uiSlice.reducer