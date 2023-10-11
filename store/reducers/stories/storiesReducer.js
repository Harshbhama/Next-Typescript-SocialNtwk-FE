import * as types from "../../types/storieTypes";
const initialState = {
  stories: {}
}

export const storiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_STORIES:
      let stories = Object.assign(state.stories, { ...action.payload });
      return {
        ...state,
        ...stories
      }
    default:
      return state;
  }
}
