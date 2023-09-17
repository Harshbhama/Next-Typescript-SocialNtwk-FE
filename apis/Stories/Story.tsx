import axios from "axios";
import { fetchStories } from "@/store/actions/storiesAction";
export const getStories = (allStories: Boolean) => {
  return new Promise<any>((resolve, reject) => {
    let queryGenerator = allStories ?
      `query{
          getAllStory{
            id
            description
            like_count
            user_id
            picture
            msg
            title
          }
        }`
      :
      `query{
      getAllStoryById{
        id
        description
        like_count
        user_id
        picture
        msg
        title
      }
    }`
    axios({
      url: 'http://localhost:4000/stories/graphql',
      method: 'post',
      withCredentials: true,
      data: {
        query: queryGenerator
      }
    }).then((result: any) => {
      resolve(result)
    }).catch(err => {
      reject(err)
    });
  })
}