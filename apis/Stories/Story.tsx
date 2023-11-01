import axios from "axios";
interface PageObj {
  page: number,
  docs: number
}
export const getStoriesWithLikes = (allStories: Boolean, pageObj: PageObj) => {
  return new Promise<any>((resolve, reject) => {
    let queryGenerator =  allStories ? `query{
      getStoryWithLikes {
        id
        title
        description
        like_count
        picture
        user_id
        msg
        liked_by_user
        liked_count
        num_rows
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
        liked_by_user
        liked_count
        num_rows
      }
    }`
    axios({
      url: 'http://localhost:4000/stories/graphql',
      method: 'post',
      withCredentials: true,
      data: {
        query: queryGenerator
      },
      params: pageObj
    }).then((result: any) => {
      resolve(result)
    }).catch(err => {
      reject(err)
    });
  })
}

export const uploadStory = (payload: any) => {
  return new Promise<any>((resolve, reject) => {
    axios({
      url: 'http://localhost:4000/upload/uploadStory',
      method: 'post',
      data: payload.formData,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        inputData: JSON.stringify(payload.inputProps)
      },
    }).then((result: any) => {
      resolve(result)
    }).catch(err => {
      reject(err)
    });
  })
}
export const getStoryWithId = (payload: any) => {
  return new Promise<any>((resolve, reject) => {
    let queryGenerator =  
    `mutation{
      getStoryById(id: ${payload}){
        id
        description
        picture
        user_id
        msg
        inner_id
        inner_picture
        liked_by_user_inner_story
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