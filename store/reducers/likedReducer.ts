import { PayloadAction, createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import { getLikedStoriesForUser } from '@/apis/Liked/Liked'
// First, create the thunk
export const getLikedThunk = createAsyncThunk(
  'liked/getLiked',
  async (thunkAPI) => {
    const response = await getLikedStoriesForUser()
    return response
  }
)
interface UsersState {
  liked: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    liked: [],
  loading: 'idle',
}  as UsersState
export const increamentTest = createAction<UsersState>('increamentTest')

// Then, handle actions in your reducers:
const likedReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getLikedThunk.fulfilled, (state, action: PayloadAction<any>) => {
      // Add user to the state array
      console.log("action.payload for liked data", action.payload)
      state.liked = action.payload
      state.loading = 'idle'
    })
    builder.addCase(getLikedThunk.pending, (state, action) => {
        state.loading = 'pending'
    })

  },
})
export default likedReducer.reducer
