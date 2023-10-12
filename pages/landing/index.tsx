import React, {memo, useCallback, useEffect, useState} from "react"
import {  useSelector } from "react-redux";
import  { getStoriesByIdThunk, getStoriesWithLikesThunk } from "@/store/reducers/getStoriesReducer";
import store from "@/store/store";
import { StoriesCard } from "@/components/Card";
import styles from "../../styles/landing.module.scss";
import LinearIndeterminate from "@/components/LinearBar";
// import { AddStoryForm } from "@/components/addSto";
import { AddStoryForm } from "@/components/AddStoryForm";
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
interface AddStoryReducer {
  addStoryReducer: {
    addStory: Boolean
  }
}

const Landing  = () => {
  const [stories, setStory] = useState<{data?: any}>({});
  const likedData = useSelector((state: State) => state.getStoriesReducer);
  const selectedBar = useSelector((state: SelectedSideBar) => state.sideBarSlice);
  const addStoryCheck = useSelector((state: AddStoryReducer) => state.addStoryReducer.addStory);
  useEffect(() => {
    store.dispatch(getStoriesWithLikesThunk()).then(res => setStory(res.payload));
  },[])
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
  },[selectedBar.selected, addStoryCheck])
  useEffect(() => {
    // if(stories === null){
    //   logoutMethod();
    //   setStory({});
    // }
  },[stories])  
  console.log("story",stories)
  return(
    <>
     {likedData.loading === 'pending' && <LinearIndeterminate />}
     {(!addStoryCheck) ? <div className={`grid gap-4 grid-cols-2 2xl:grid-cols-3 ${styles.landingCardsContainer}`}>
      {
        Array.isArray(stories) && stories.map((story, index) => {
          return(
            <StoriesCard story={story} fetchData = {fetchData}/>
          )
        })
      }
     </div>
      :
      <AddStoryForm /> 
    }
    </>
  )
}
export default memo(Landing);