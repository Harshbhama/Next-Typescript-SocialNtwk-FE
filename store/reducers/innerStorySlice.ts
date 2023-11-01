import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface InnerStory {
  innerStory: Boolean
}
const innerStorySlice = createSlice({
  name: 'users/innerStoryBtn',
  initialState: { innerStory: false } as InnerStory,
  reducers: {
    toggleInnerStoryBtn(state, action: PayloadAction<Boolean>) {
      state.innerStory = action.payload
    },
  },
})
export const { toggleInnerStoryBtn } = innerStorySlice.actions
export default innerStorySlice.reducer