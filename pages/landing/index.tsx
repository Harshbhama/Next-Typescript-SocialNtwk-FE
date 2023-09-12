import React, {memo, useEffect, useState} from "react"
import { getStories } from "@/apis/Stories/Story"
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { increment, incrementByAmount } from "@/store/counterSlice";
import { addTodo } from "@/store/reducers/todoSlice";
import { getStoriesThunk } from "@/store/reducers/getStoriesReducer";
import { increamentTest } from "@/store/reducers/getStoriesReducer";
import store from "@/store/store";
const Landing  = () => {
  const [stories, setStory] = useState<{data?: any}>({});
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log("selector", selector);
  useEffect(() => {
    // dispatch(increment())
    // dispatch(increment())
    // dispatch(incrementByAmount(10))
    // dispatch(addTodo({id: '123', text: 'asd'}))
    // dispatch(addTodo({id: '123', text: 'aasdasd'}))
    let k = store.dispatch(getStoriesThunk()).then(res => setStory(res.payload));
      
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
      <button onClick={() => dispatch(increamentTest())}>Test</button>
    </>
  )
}
export default memo(Landing);