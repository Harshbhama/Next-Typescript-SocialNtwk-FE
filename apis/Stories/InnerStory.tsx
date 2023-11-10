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