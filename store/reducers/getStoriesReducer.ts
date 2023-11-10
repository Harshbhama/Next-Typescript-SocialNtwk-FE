import { PayloadAction, createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import { getStoriesWithLikes, uploadStory,uploadInnerStory, getStoryWithId } from '@/apis/Stories/Story'
// First, create the thunk
export const getStoriesByIdThunk = createAsyncThunk(
  'users/getStoriesById',
  async (pageObj: PageObj, thunkAPI) => {
    const response = await getStoriesWithLikes(false, pageObj)
    return response?.data?.data?.getStoryWithLikesById
  }
)
export const getStoriesWithLikesThunk = createAsyncThunk(
  'users/getStoriesWithLikes',
  async (pageObj: PageObj, thunkAPI) => {
    const response = await getStoriesWithLikes(true, pageObj)
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
export const getStoryForIdThunk = createAsyncThunk(
  'users/getStoryForIdThunk',
  async (payload: number, thunkAPI) => {
    const response = await getStoryWithId(payload)
    return response
  }
)
export const uploadInnerStoryThunk = createAsyncThunk(
  'users/uploadInnerStory',
  async (payload: any, thunkAPI) => {
    const response = await uploadInnerStory(payload)
    return response
  }
)
interface PageObj {
  page: number,
  docs: number
}
interface Payload {
  formData: any,
  inputProps: any
}
interface UsersState {
  entities: {}
  idSpecificEntities: {}
  likedData: {} 
  idSpecificStoryData: {}
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  pageData: number
}
const initialState = {
  entities: {},
  idSpecificEntities: {},
  likedData: {},
  loading: 'idle',
  idSpecificStoryData: {},
  pageData: 6
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
    builder.addCase(getStoryForIdThunk.pending, (state, action) => {
      state.loading = 'pending'  
    })
    builder.addCase(getStoryForIdThunk.fulfilled, (state, action) => {
      state.loading = 'idle'  
      state.idSpecificStoryData = action.payload.data.data?.getStoryById?.[0]
    })
    builder.addCase(uploadInnerStoryThunk.pending, (state, action) => {
      state.loading = 'pending'  
    })
    builder.addCase(uploadInnerStoryThunk.fulfilled, (state, action) => {
      state.loading = 'idle'  
      // state.idSpecificStoryData = action.payload.data.data?.getStoryById?.[0]
    })
  },
})
export default usersSlice.reducer
