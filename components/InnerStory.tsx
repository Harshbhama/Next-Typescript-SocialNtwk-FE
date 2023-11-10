import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toggleInnerStoryBtn } from "@/store/reducers/innerStorySlice";
import store from "@/store/store";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { FileUpload } from "./FileUpload";
import { uploadInnerStoryThunk } from "@/store/reducers/getStoriesReducer";
import { getStoryForIdThunk } from "@/store/reducers/getStoriesReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteInnerStoryThunk } from "@/store/reducers/innerStorySlice";
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
      user_id: string
    }
  }
}
const InnerStory = () => {
  const idSpecificStoryData = useSelector((state: InnerStory) => state.getStoriesReducer.idSpecificStoryData);
  console.log("idSpecificStoryData",idSpecificStoryData)
  let currentUserId = localStorage.getItem("userId");
  const onUploadFile = (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    if(!file){
      alert("PLease upload file")
    }
    let data = {
      formData: formData ,
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
    console.log(index)
   
    store.dispatch(deleteInnerStoryThunk(idSpecificStoryData?.inner_id[index])).then(async res => {
      store.dispatch(await getStoryForIdThunk(idSpecificStoryData?.id)) 
    })
    console.log(idSpecificStoryData?.inner_id[index])
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
        <FileUpload fileProps={{ name: "Upload More Snaps !", className: "w-1/4" }}  setFile={onUploadFile} key={idSpecificStoryData?.inner_picture?.length}/>
      </div>}
      <div className="grid grid-cols-3 gap-[40px] pt-7">
        {!!idSpecificStoryData?.inner_picture?.length && idSpecificStoryData?.inner_picture?.[0] && idSpecificStoryData?.inner_picture?.map((val: any, index: number) => {
          return (
            <div key ={index} className="relative">
              {/* <i className="fa-solid fa-trash-can"></i> */}
              {/* <FontAwesomeIcon icon="fa-solid fa-trash-can" /> */}

              <FontAwesomeIcon icon={faTrash} className="fas fa-check !absolute right-5 top-6 cursor-pointer text-[20px] text-gray-700"
                onClick = {() => onDeletePic(index)} ></FontAwesomeIcon>
              {/* <Button className="!absolute right-0" onClick = {() => onDeletePic(index)}>Delete</Button> */}
              <Image
                key={index}
                src={val}
                width={500}
                height={100}
                alt={"alt"}
                className="rounded-[30px]"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default InnerStory;
