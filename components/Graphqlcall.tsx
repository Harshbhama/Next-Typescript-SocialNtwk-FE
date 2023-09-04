import React, { useEffect } from "react";
import axios from "axios";
const Graphqlcall = () => {
  useEffect(() => {
    axios({ 
      url: 'http://localhost:4000/login/graphql',
      method: 'post',
      data: {
        query: `
        mutation{
          loginUser(email: "graphql6@xyz", password: "12345"){
            error
            msg
            token
            user_id
          }
        }`
      }
    }).then((result) => {
      console.log(result)
    });
  },[])
  return(
    <>Graphql call</>
  )
}
export default Graphqlcall;