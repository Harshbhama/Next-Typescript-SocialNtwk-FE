
import axios from "axios";

interface Body {
  email: String,
  password: String,
  name: String
}

export const LoginApi = (body:Body, checkForLogin: String) => {
  axios.defaults.withCredentials = true;
  let email = body?.email;
  let password = body?.password;
  let name = body?.name;
  return new Promise((resolve, reject) => {
     let dataQuery = checkForLogin === "login" ? {
        query: `
        mutation{
          loginUser(email: "${email}", password: "${password}"){
            error
            msg
            token
            user_id
          }
        }`
      }: {
        query: `
        mutation{
          createUser(email: "${email}", name: "${name}", password: "${password}") {
            error
            msg
            token
          }
        }`
      }
    axios({ 
      url: 'http://localhost:4000/login/graphql',
      method: 'post',
      data: dataQuery
    }).then((result) => {
      resolve(result)
    }).catch(err => {
      reject(err)
    });
  })
}

export const LogoutApi = () => {
  return new Promise((resolve, reject) => {
    let queryGenerator =
    `mutation{
      logoutUser{
        error
        msg
      }
   }`
    axios({ 
      url: 'http://localhost:4000/login/graphql',
      method: 'post',
      data: {
        query: queryGenerator
      }
    }).then((result) => {
      resolve(result)
    }).catch(err => {
      reject(err)
    });
  })
}
