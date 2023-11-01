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
import likedReducer from './reducers/likedReducer'
import addStorySlice from './reducers/addStorySlice'
import innerStorySlice from './reducers/innerStorySlice'
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
        sideBarSlice: sideBarSlice,
        likedReducer: likedReducer,
        addStoryReducer: addStorySlice,
        innerStoryReducer: innerStorySlice
    }
  })

export default store;