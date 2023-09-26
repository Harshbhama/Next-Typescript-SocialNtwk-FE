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

export const getStoriesWithLikes = (allStories: Boolean) => {
  return new Promise<any>((resolve, reject) => {
    let queryGenerator =  allStories ? `query{
      getStoryWithLikes{
        id
        title
        description
        like_count
        user_id
        msg
        picture
        liked_by_user_id
      }
    }` : 
    `query{
      getStoryWithLikesById {
        id
        title
        description
        like_count
        picture
        user_id
        msg
        liked_by_user_id
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
      console.log("Likes", result)
    }).catch(err => {
      reject(err)
    });
  })
}
