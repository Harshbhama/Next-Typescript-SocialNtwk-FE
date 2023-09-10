import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer.js";
import { postReducer } from "./postReducer";
import { storiesReducer } from "./stories/storiesReducer.js";
export default combineReducers({
    post: postReducer,
    login: loginReducer,
    stories: storiesReducer
})