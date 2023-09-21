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
        console.log(result.data.data.getLikedStoryByUserId)
        let data: liked[] = result.data.data.getLikedStoryByUserId
      resolve(data)
    }).catch(err => {
      reject(err)
    });
  })
}