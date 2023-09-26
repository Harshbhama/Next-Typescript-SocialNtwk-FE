import React, {memo, useCallback, useEffect, useState} from "react"
import { getStories } from "@/apis/Stories/Story"
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { increment, incrementByAmount } from "@/store/counterSlice";
import { addTodo } from "@/store/reducers/todoSlice";
import getStoriesReducer, { getStoriesThunk, getStoriesByIdThunk, getStoriesWithLikesThunk } from "@/store/reducers/getStoriesReducer";
import { increamentTest } from "@/store/reducers/getStoriesReducer";
import store from "@/store/store";
import { StoriesCard } from "@/components/Card";
import LinearIndeterminate from "@/components/LinearBar";
import { getLikedThunk } from "@/store/reducers/likedReducer";

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
interface likedObj {
  error: null | String,
  story_id: number
}
interface LikedInt {
  likedReducer: {
    liked: likedObj[]
  }
}

const Landing  = () => {
  const [stories, setStory] = useState<{data?: any}>({});
  const likedData = useSelector((state: State) => state.getStoriesReducer);
  const selectedBar = useSelector((state: SelectedSideBar) => state.sideBarSlice);
  useEffect(() => {
    store.dispatch(getStoriesWithLikesThunk()).then(res => setStory(res.payload));
    store.dispatch(getLikedThunk());
  },[])
  // const test = useCallback(() => {

  // },[])
  const fetchData = (): void => {
    if(selectedBar.selected === 'My Feed'){
      store.dispatch(getStoriesByIdThunk()).then((res) => {
        setStory(res.payload)
      });
    }else{
      store.dispatch(getStoriesWithLikesThunk()).then((res) => {
        setStory(res.payload)
      });
    }
  }
  useEffect(() => {
    fetchData()
  },[selectedBar.selected])
  useEffect(() => {
    if(stories === null){
      localStorage.removeItem("loginDetails");
      localStorage.removeItem("userId");
      Router.push("/");
      setStory({});
    }
  },[stories])  
  return(
    <>
     {likedData.loading === 'pending' && <LinearIndeterminate />}
     <div className="grid gap-4 grid-cols-2">
      {
        Array.isArray(stories) && stories.map((story, index) => {
          return(
            <StoriesCard story={story} fetchData = {fetchData}/>
          )
        })
      }
     </div>
    
    </>
  )
}
export default memo(Landing);