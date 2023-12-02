import React, { memo, useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { getStoriesByIdThunk, getStoriesWithLikesThunk } from "@/store/reducers/getStoriesReducer";
import store from "@/store/store";
import { StoriesCard } from "@/components/Card";
import styles from "../../styles/landing.module.scss";
import LinearIndeterminate from "@/components/LinearBar";
import { AddStoryForm } from "@/components/AddStoryForm";
import { DefaultPagination } from "@/components/Pagination";
import { getPaginationNumbers } from "@/helpers/utils";
import { getStoryForIdThunk } from "@/store/reducers/getStoriesReducer";
import InnerStory from "@/components/InnerStory";
import { toggleInnerStoryBtn } from "@/store/reducers/innerStorySlice";
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
const Landing = () => {
  const [stories, setStory] = useState<{ data?: any }>({});
  const [totalData, setPagination] = useState<number>(0);
  const [activePage, setActive] = React.useState(1);
  const likedData = useSelector((state: State) => state.getStoriesReducer);
  const selectedBar = useSelector((state: SelectedSideBar) => state.sideBarSlice);
  const addStoryCheck = useSelector((state: AddStoryReducer) => state.addStoryReducer.addStory);
  const pageData = useSelector((state: any) => state.getStoriesReducer.pageData)
  const innerStory = useSelector((state: any) => state.innerStoryReducer.innerStory)
  const pageNumbers = getPaginationNumbers(totalData, pageData);
  const fetchData = (): void => {
    let pageObj = {
      docs: pageData,
      page: activePage
    }
    if (selectedBar.selected === 'My Feed') {
      store.dispatch(getStoriesByIdThunk(pageObj)).then((res) => {
        setStory(res.payload)
        setPagination(!!res?.payload?.length ? parseInt(res.payload?.[0]?.num_rows): 0)
      });
    } else {
      store.dispatch(getStoriesWithLikesThunk(pageObj)).then((res) => {
        setStory(res.payload)
        setPagination(!!res?.payload?.length ? parseInt(res.payload?.[0]?.num_rows): 0)
      });
    }
  }
  const onCardClick = async (id: number) => {
    store.dispatch(await getStoryForIdThunk(id))
    store.dispatch(toggleInnerStoryBtn(true))
    // toggleInnerStory(true);
  }
  useEffect(() => {
    fetchData()
  }, [selectedBar.selected, addStoryCheck, activePage])
  useEffect(() => {
    setActive(1);
  },[selectedBar.selected])
  return (
    <>
      {likedData.loading === 'pending' && <LinearIndeterminate />}
      {(!addStoryCheck && !innerStory) ?
        <div className={`${styles.landingCardsContainer}`}>
          <DefaultPagination totalData={totalData} pageNumbers={pageNumbers} active={activePage} setActive={setActive}/>
          <div className={`grid gap-4 grid-cols-2 2xl:grid-cols-3 pb-10 `}>
            {
              Array.isArray(stories) && stories.map((story, index) => {
                return (
                  <StoriesCard story={story} fetchData={fetchData} onCardClick={onCardClick}/>
                )
              })
            }
          </div>
          
        </div>
        :
        innerStory ? <InnerStory /> :
        <AddStoryForm />
      }
    </>
  )
}
export default memo(Landing);