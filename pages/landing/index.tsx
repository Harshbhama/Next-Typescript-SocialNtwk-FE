import React, {memo, useEffect, useState} from "react"
import { getStories } from "@/apis/Stories/Story"
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { increment, incrementByAmount } from "@/store/counterSlice";
import { addTodo } from "@/store/reducers/todoSlice";
import getStoriesReducer, { getStoriesThunk, getStoriesByIdThunk } from "@/store/reducers/getStoriesReducer";
import { increamentTest } from "@/store/reducers/getStoriesReducer";
import store from "@/store/store";
import { StoriesCard } from "@/components/Card";
interface State {
  getStoriesReducer: {
    loading: String,
    data: {
      data: {
        getAllStory: []
      }
    }
  }
}
interface SelectedSideBar {
  sideBarSlice: {
    selected: String
  }
} 
const Landing  = () => {
  const [stories, setStory] = useState<{data?: any}>({});
  const selector = useSelector((state: State) => state.getStoriesReducer);
  const selectedBar = useSelector((state: SelectedSideBar) => state.sideBarSlice);
  console.log("selectedBar",selectedBar)
  useEffect(() => {
    store.dispatch(getStoriesThunk()).then(res => setStory(res.payload?.data?.data?.getAllStory));
  },[])
  useEffect(() => {
    if(selectedBar.selected === 'My Feed'){
      store.dispatch(getStoriesByIdThunk()).then(res => setStory(res.payload?.data?.data?.getAllStory));
    }else{
      store.dispatch(getStoriesThunk()).then(res => setStory(res.payload?.data?.data?.getAllStory));
    }
  },[selectedBar.selected])
  useEffect(() => {
    if(stories === null){
      localStorage.removeItem("loginDetails");
      Router.push("/");
      setStory({});
    }
    console.log("stories", stories)
  },[stories])  
  console.log(selector)
  return(
    <>
     {selector.loading === 'pending' && <div>Loading</div>}
     <div className="grid gap-4 grid-cols-2">
      {
        Array.isArray(stories) && stories.map((story, index) => {
          return(
            <StoriesCard story={story}/>
          )
        })
      }
     </div>
    
    </>
  )
}
export default memo(Landing);