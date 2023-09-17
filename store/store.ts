import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "./reducers"
import { configureStore } from '@reduxjs/toolkit'
import getStoriesReducer from './reducers/getStoriesReducer'
import counterSlice from './counterSlice'
import todoSlice from './reducers/todoSlice'
import { useDispatch } from 'react-redux'
import loginReducerRedux from './reducers/loginReducerRedux'
import sideBarSlice from './reducers/sideBarSlice'
const initialState = {}

const middleware = [thunk];

// const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
        getStoriesReducer: getStoriesReducer,
        counterSlice: counterSlice,
        todoSlice: todoSlice,
        loginReducerRedux: loginReducerRedux,
        sideBarSlice: sideBarSlice
    }
  })

export default store;