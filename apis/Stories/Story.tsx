import axios from "axios";
import { fetchStories } from "@/store/actions/storiesAction";
export const getStories = () => {
  return new Promise<any>((resolve, reject) => {
    axios({
      url: 'http://localhost:4000/stories/graphql',
      method: 'post',
      withCredentials: true,
      data: {
        query: `
          query{
            getAllStory{
              id
              description
              like_count
              user_id
              msg
            }
          }`
      }
    }).then((result:any) => {
      console.log(result);
      // dispatch(fetchStories(result))
      resolve(result)
    }).catch(err => {
      reject(err)
    });
  })
}
