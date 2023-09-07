import React, {memo, useEffect, useState} from "react"
import { getStories } from "@/apis/Stories/Story"
import Router from "next/router";
const Landing  = () => {
  const [stories, setStory] = useState<{data?: any}>({});
  useEffect(() => {
    getStories().then(res => {
      setStory(res)
    })
  },[])
  useEffect(() => {
    if(Array.isArray(stories?.data?.errors)){
      localStorage.removeItem("loginDetails");
      Router.push("/");
      setStory({});
    }
  },[stories])
  return(
    <>
      Landing Page
    </>
  )
}
export default memo(Landing);