import React, {memo, useEffect, useState} from "react"
import { getStories } from "@/apis/Stories/Story"
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";

const Landing  = () => {
  const [stories, setStory] = useState<{data?: any}>({});
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log("selector", selector);
  useEffect(() => {
    dispatch(getStories()).then(res => {
      console.log(res)
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