import { PayloadAction, createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import { getStoriesWithLikes, uploadStory } from '@/apis/Stories/Story'
// First, create the thunk
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
export const uploadStoryThunk = createAsyncThunk(
  'users/uploadStory',
  async (payload: Payload, thunkAPI) => {
    const response = await uploadStory(payload)
    return response
  }
)
interface Payload {
  formData: any,
  inputProps: any
}
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
    builder.addCase(uploadStoryThunk.fulfilled, (state: any, action: PayloadAction<any>) => {
      state.loading = 'idle'
    })
    builder.addCase(uploadStoryThunk.pending, (state: any, action: PayloadAction<any>) => {
      state.loading = 'pending'
    })
    
  },
})
export default usersSlice.reducer
