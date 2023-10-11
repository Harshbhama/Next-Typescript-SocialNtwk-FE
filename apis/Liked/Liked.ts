import axios from "axios";
interface liked {
    story_id: number
}
export const getLikedStoriesForUser = () => {
  return new Promise<any>((resolve, reject) => {
    let queryGenerator =
      `query{
        getLikedStoryByUserId{
         error
         story_id
       }
     }`
    axios({
      url: 'http://localhost:4000/liked/graphql',
      method: 'post',
      withCredentials: true,
      data: {
        query: queryGenerator
      }
    }).then((result: any) => {
        //console.log(result.data.data.getLikedStoryByUserId)
        let data: liked[] = result.data.data.getLikedStoryByUserId
      resolve(data)
    }).catch(err => {
      reject(err)
    });
  })
}
export const makeUnLike = (story_id: number, like: Boolean = false) => {
  return new Promise<any>((resolve, reject) => {
    let queryGenerator = (!like) ? 
      `mutation{
        unLike(story_id: ${story_id}){
          error
          msg
        }
      }` : 
      `mutation{
        makeLike(story_id: ${story_id}){
        error
        msg
        }
      }`
    axios({
      url: 'http://localhost:4000/liked/graphql',
      method: 'post',
      withCredentials: true,
      data: {
        query: queryGenerator
      }
    }).then((result: any) => {
      resolve(true)
    }).catch(err => {
      // reject(err)
      reject(false)
    });
  })
}
