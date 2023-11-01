import React from "react";
import { useSelector } from "react-redux";
const InnerStory = () => {
  const idSpecificStoryData = useSelector((state: any) => state.getStoriesReducer.idSpecificStoryData);
  console.log("idSpecificStoryData",idSpecificStoryData)
  return(
    <>
    <i class="fa fa-arrow-left" aria-hidden="true"></i>
    Here
    </>
  )
}
export default InnerStory;
