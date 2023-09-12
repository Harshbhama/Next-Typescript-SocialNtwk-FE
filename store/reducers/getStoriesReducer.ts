import { PayloadAction, createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import { getStories } from '@/apis/Stories/Story'
// First, create the thunk
export const getStoriesThunk = createAsyncThunk(
  'users/fetchByIdStatus',
  async (thunkAPI) => {
    const response = await getStories()
    return response
  }
)
interface UsersState {
  entities: {}
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
  entities: {},
  loading: 'idle',
}  as UsersState
export const increamentTest = createAction<UsersState>('increamentTest')

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getStoriesThunk.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities = action.payload
      state.loading = 'idle'
    })
    builder.addCase(getStoriesThunk.pending, (state, action) => {
        console.log("In pending state")
        state.loading = 'pending'
    })
    builder.addCase(increamentTest, (state, action) => {
      state.entities={"ddd": 'ffff'}
    })
  },
})
export default usersSlice.reducer
