import * as types from "../types/storieTypes";
export const fetchStories = (data: any) => async (dispatch: any) => {
  //console.log("fetchStories data", data)
  dispatch({
    type: types.GET_STORIES,
    payload: data
  })
}
