import { PayloadAction, createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import { getStories, getStoriesWithLikes } from '@/apis/Stories/Story'
// First, create the thunk
export const getStoriesThunk = createAsyncThunk(
  'users/getStories',
  async (thunkAPI) => {
    const response = await getStories(true)
    return response?.data?.data?.getAllStory
  }
)
export const getStoriesByIdThunk = createAsyncThunk(
  'users/getStoriesById',
  async (thunkAPI) => {
    const response = await getStoriesWithLikes(false)
    return response?.data?.data?.getStoryWithLikesById
  }
)
export const getStoriesWithLikesThunk = createAsyncThunk(
  'users/getStoriesWithLikes',
  async (thunkAPI) => {
    const response = await getStoriesWithLikes(true)
    return response?.data?.data?.getStoryWithLikes
  }
)
interface UsersState {
  entities: {}
  idSpecificEntities: {}
  likedData: {} 
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
  entities: {},
  idSpecificEntities: {},
  likedData: {},
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
      state.entities = action.payload?.payload?.data?.data?.getAllStory
      state.loading = 'idle'
    })
    builder.addCase(getStoriesThunk.pending, (state, action) => {
        //console.log("In pending state")
        state.loading = 'pending'
    })
    builder.addCase(getStoriesByIdThunk.fulfilled, (state, action) => {
      //console.log("action id",action)
      state.idSpecificEntities = action.payload
      state.loading = 'idle'
    })
    builder.addCase(getStoriesByIdThunk.pending, (state, action) => {
      //console.log("In pending state")
      state.loading = 'pending'
    })
    builder.addCase(getStoriesWithLikesThunk.fulfilled, (state, action) => {
      //console.log("action", action)
      state.likedData = action.payload
      state.loading = 'idle'
    })
    builder.addCase(getStoriesWithLikesThunk.pending, (state, action) => {
      //console.log("In pending state")
      state.loading = 'pending'
    })
    builder.addCase(increamentTest, (state, action) => {
      state.entities={"ddd": 'ffff'}
    })
    
  },
})
export default usersSlice.reducer
