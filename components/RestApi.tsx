import React, { useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
const RestApi = () => {
  useEffect(() => {
    let obj = {
      email: "harsh_xyz@test.com",
      password: "harsh_xyz@test.com"
    }
    axios({ 
      url: 'http://localhost:4000/authentication/login',
      method: 'post',
      data: obj
    }).then((result) => {
      console.log(result)
    });
  },[])
  return(
    <>Graphql call</>
  )
}
export default RestApi;