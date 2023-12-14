import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toggleInnerStoryBtn, likeInnerStoryThunk, unlikeInnerStoryThunk } from "@/store/reducers/innerStorySlice";
import store from "@/store/store";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { FileUpload } from "./FileUpload";
import { uploadInnerStoryThunk } from "@/store/reducers/getStoriesReducer";
import { getStoryForIdThunk } from "@/store/reducers/getStoriesReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteInnerStoryThunk } from "@/store/reducers/innerStorySlice";
import { IconButton,
} from "@material-tailwind/react";
interface LikedArr { 
  liked_by_users: (number)[],
  liked_inner_story_id: number
}
interface InnerStory {
  getStoriesReducer: {
    idSpecificStoryData: {
      id: number,
      description: string,
      inner_id: [number],
      inner_picture: [string],
      liked_by_user_inner_story: [number],
      msg: string,
      picture: string,
      title: string,
      user_id: string,
      liked_arr: [LikedArr]
    }
  }
}
const InnerStory = () => {
  const idSpecificStoryData = useSelector((state: InnerStory) => state.getStoriesReducer.idSpecificStoryData);
  let currentUserId: any = localStorage.getItem("userId");
  console.log("idSpecificStoryData",idSpecificStoryData)
  const onUploadFile = (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    if (!file) {
      alert("PLease upload file")
    }
    let data = {
      formData: formData,
      storyId: idSpecificStoryData?.id
    }
    store.dispatch(uploadInnerStoryThunk(data)).then(async (res) => {
      console.log(res);
      store.dispatch(await getStoryForIdThunk(idSpecificStoryData?.id))
    }).catch(err => {
      console.log(err);
    })
  }
  const onDeletePic = (index: number): void => {
    store.dispatch(deleteInnerStoryThunk(idSpecificStoryData?.inner_id[index])).then(async res => {
      store.dispatch(await getStoryForIdThunk(idSpecificStoryData?.id))
    })
  }
  const likeUnlikeStoryMethod = (condition: string, inner_id: number) => {
    if(condition === "like"){
      store.dispatch(likeInnerStoryThunk({liked_inner_story_id: inner_id, liked_by_user_inner_story: Number(currentUserId)})).then(async res => {
        store.dispatch(await getStoryForIdThunk(idSpecificStoryData?.id))
      }).catch(err => {
        console.log(err)
      })
    }else{
      store.dispatch(unlikeInnerStoryThunk({liked_inner_story_id: inner_id, liked_by_user_inner_story: Number(currentUserId)})).then(async res => {
        store.dispatch(await getStoryForIdThunk(idSpecificStoryData?.id))
      }).catch(err => {
        console.log(err)
      })
    }
  }
  return (
    <div className="pt-[20px] flex flex-col pl-[20px] relative">
      <div className="absolute right-[100px]">
        <Button size="lg" fullWidth={true}
          onClick={() => store.dispatch(toggleInnerStoryBtn(false))}
          className="w-[100px]"
        >
          Back
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-[50px] items-center">
        <Image
          src={idSpecificStoryData.picture}
          width={400}
          height={100}
          alt="ui/ux review check"
          className="rounded-[30px]"
          placeholder="blur"
          blurDataURL="https://cdn.pixabay.com/photo/2016/12/27/22/31/converse-1935027_1280.jpg"
        />
        <div>
          <h3 className="pb-[30px]">{idSpecificStoryData?.title}</h3>
          <p>{idSpecificStoryData?.description}</p>
        </div>
      </div>
      {idSpecificStoryData?.user_id == currentUserId && <div className="flex flex-row gap-3 items-center pt-7">
        <FileUpload fileProps={{ name: "Upload More Snaps !", className: "w-1/4" }} setFile={onUploadFile} key={idSpecificStoryData?.inner_picture?.length} />
      </div>}
      <div className="grid grid-cols-3 gap-[40px] pt-7">
        {!!idSpecificStoryData?.inner_picture?.length && idSpecificStoryData?.inner_picture?.[0] && idSpecificStoryData?.inner_picture?.map((val: any, index: number) => {
          return (
            <div key={index} className="relative">
              <FontAwesomeIcon icon={faTrash} className="fas fa-check !absolute right-5 top-6 cursor-pointer text-[20px] text-gray-700"
                onClick={() => onDeletePic(index)} ></FontAwesomeIcon>
              <Image
                key={index}
                src={val}
                width={500}
                height={100}
                alt={"alt"}
                className="rounded-[30px]"
              />
              <div className="flex items-center gap-[5px] absolute top-[28px] left-[70px] text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`-mt-0.5 h-5 w-5 text-yellow-700`}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>{idSpecificStoryData?.liked_arr[index]?.liked_by_users ? idSpecificStoryData?.liked_arr[index]?.liked_by_users?.length: "0"}</p>
              </div>
              <IconButton
                size="sm"
                color="red"
                variant="text"
                className="!absolute rounded-full left-[20px] top-[24px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={idSpecificStoryData?.liked_arr[index]?.liked_by_users?.includes(parseInt(currentUserId)) ? "currentColor": "#f8f8fe"}
                  onClick={idSpecificStoryData?.liked_arr[index]?.liked_by_users?.includes(parseInt(currentUserId)) ? () => likeUnlikeStoryMethod("unlike",  idSpecificStoryData?.inner_id[index]):() => likeUnlikeStoryMethod("like",idSpecificStoryData?.inner_id[index])  }
                  className="h-6 w-6"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </IconButton>

            </div>
          )
        })}
      </div>
    </div>
  )
}
export default InnerStory;
