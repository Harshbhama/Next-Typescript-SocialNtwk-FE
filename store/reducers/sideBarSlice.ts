import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface SelectedSideBar {
  selected: String
}
const sideBarSlice = createSlice({
  name: 'users/setSideBarIndex',
  initialState: { selected: '' } as SelectedSideBar,
  reducers: {
    changeSelectedSideBar(state, action: PayloadAction<String>) {
      state.selected = action.payload
    },
  },
})
export const { changeSelectedSideBar } = sideBarSlice.actions
export default sideBarSlice.reducer