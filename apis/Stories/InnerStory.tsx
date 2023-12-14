import axios from "axios";
interface PageObj {
  page: number,
  docs: number
}
export const deleteInnerStory = (payload: any) => {
    return new Promise<any>((resolve, reject) => {
      let queryGenerator =  
      `mutation{
        deleteStory(inner_story_id: ${payload}){
            msg
        }
      }`
      axios({
        url: 'http://localhost:4000/inner_story/graphql',
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
interface LikeUnlikePayload {
  liked_inner_story_id: number
  liked_by_user_inner_story: number
}
export const likedInnerStory = ({liked_inner_story_id, liked_by_user_inner_story}: LikeUnlikePayload) => {
  return new Promise<any>((resolve, reject) => {
    let queryGenerator =  
    `mutation{
      likeInnerStoryResolver(liked_inner_story_id: ${liked_inner_story_id}, liked_by_user_inner_story: ${liked_by_user_inner_story}){
        msg
        error
     }
    }`
    axios({
      url: 'http://localhost:4000/inner_story/graphql',
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

export const unlikeInnerStory = ({liked_inner_story_id, liked_by_user_inner_story}: LikeUnlikePayload) => {
 
  return new Promise<any>((resolve, reject) => {
    let queryGenerator =  
    `mutation{
      unlikeInnerStoryResolver(liked_inner_story_id: ${liked_inner_story_id}, liked_by_user_inner_story: ${liked_by_user_inner_story}){
        msg
        error
      }
    }`
    axios({
      url: 'http://localhost:4000/inner_story/graphql',
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
