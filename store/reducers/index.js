import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer.js";
import { postReducer } from "./postReducer";
import { storiesReducer } from "./stories/storiesReducer.js";
import counterSlice from "../counterSlice.ts";
import todoSlice from "./todoSlice.ts";
import getStoriesReducer from "./getStoriesReducer.ts";
import loginReducerRedux from "./loginReducerRedux.js";
export default combineReducers({
    counterSlice: counterSlice,
    todoSlice: todoSlice,
    getStoriesReducer: getStoriesReducer,
    loginReducerRedux: loginReducerRedux
})