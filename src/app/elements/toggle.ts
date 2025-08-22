import { createSlice } from '@reduxjs/toolkit'

// constructor
interface Toggle {
  rotation: number
  visible: boolean
}

// initialise object
const initialState: Toggle = {
  rotation: 0,
  visible: true,
}

// create actions of object and their functionality
const uiSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    // action creator
    toggleSection: (state) => {
      state.rotation += 180
      state.visible = !state.visible
    },
  },
})

// extract actions from a reducer
export const { toggleSection } = uiSlice.actions
// export reducer
export default uiSlice.reducer