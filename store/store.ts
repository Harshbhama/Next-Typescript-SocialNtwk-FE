import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "./reducers"
import { configureStore } from '@reduxjs/toolkit'
const initialState = {}

const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

// const store = configureStore({
//     // Automatically calls `combineReducers`
//     reducer: rootReducer
//   })

export default store;