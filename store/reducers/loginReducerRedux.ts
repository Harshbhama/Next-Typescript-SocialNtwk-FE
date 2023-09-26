import { PayloadAction, createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import { getStories } from '@/apis/Stories/Story'
import { LoginApi } from '@/apis/Login/LoginApi'
// First, create the thunk
export const getLoginThunk = createAsyncThunk(
    'login',
    async (body: BodyInterface, thunkAPI) => {
        const response = await LoginApi(body, body.checkForLogin)
        //console.log("response in loginApi thunk", response)
        return response
    }
)
interface UsersState {
    userLoginDetails: {}
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

interface BodyInterface {
    email: String,
    password: String,
    name: String,
    checkForLogin: String
}

const initialState = {
    userLoginDetails: {},
    loading: 'idle',
} as UsersState
export const increamentTest = createAction<UsersState>('increamentTest')

// Then, handle actions in your reducers:
const loginSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getLoginThunk.fulfilled, (state, action: any) => {
            // Add user to the state array
            console.log(action)
            localStorage.setItem("userId", action.payload.data.data.loginUser.user_id);
            state.userLoginDetails = action.payload.data.data.loginUser.user_id
            state.loading = 'idle'
        })
        builder.addCase(getLoginThunk.pending, (state, action) => {
            //console.log("In pending state")
            state.loading = 'pending'
        })
        // builder.addCase(increamentTest, (state, action) => {
        //   state.userLoginDetails={"ddd": 'ffff'}
        // })
    },
})
export default loginSlice.reducer
