import { PayloadAction, createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import { deleteInnerStory, likedInnerStory, unlikeInnerStory } from '@/apis/Stories/InnerStory'
interface InnerStory {
  innerStory: Boolean
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}
export const deleteInnerStoryThunk = createAsyncThunk(
  'users/deleteInnerStory',
  async (payload: any, thunkAPI) => {
    const response = await deleteInnerStory(payload)
    return response
  }
)
export const likeInnerStoryThunk = createAsyncThunk(
  'users/likeInnerStory',
  async (payload: any, thunkAPI) => {
    const response = await likedInnerStory(payload)
    return response
  }
)
export const unlikeInnerStoryThunk = createAsyncThunk(
  'users/unlikeInnerStory',
  async (payload: any, thunkAPI) => {
    const response = await unlikeInnerStory(payload)
    return response
  }
)
const innerStorySlice = createSlice({
  name: 'users/innerStoryBtn',
  initialState: { innerStory: false,  loading: 'idle' } as InnerStory,
  reducers: {
    toggleInnerStoryBtn(state, action: PayloadAction<Boolean>) {
      state.innerStory = action.payload
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(deleteInnerStoryThunk.fulfilled, (state, action) => {
      console.log(action.payload)
      state.loading = 'idle'
    })
    builder.addCase(deleteInnerStoryThunk.pending, (state, action) => {
      console.log(action.payload)
      state.loading = 'pending'
    })
    builder.addCase(likeInnerStoryThunk.fulfilled, (state, action) => {
      console.log(action.payload)
      state.loading = 'idle'
    })
    builder.addCase(likeInnerStoryThunk.pending, (state, action) => {
      console.log(action.payload)
      state.loading = 'pending'
    })
    builder.addCase(unlikeInnerStoryThunk.fulfilled, (state, action) => {
      console.log(action.payload)
      state.loading = 'idle'
    })
    builder.addCase(unlikeInnerStoryThunk.pending, (state, action) => {
      console.log(action.payload)
      state.loading = 'pending'
    })
  },
})
export const { toggleInnerStoryBtn } = innerStorySlice.actions
export default innerStorySlice.reducer