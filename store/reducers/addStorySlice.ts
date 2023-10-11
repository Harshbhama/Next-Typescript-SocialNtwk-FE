import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AddStory {
  addStory: Boolean
}
const addStorySlice = createSlice({
  name: 'users/setSideBarIndex',
  initialState: { addStory: false } as AddStory,
  reducers: {
    addStoryTrigger(state, action: PayloadAction<Boolean>) {
      state.addStory = action.payload
    },
  },
})
export const { addStoryTrigger } = addStorySlice.actions
export default addStorySlice.reducer