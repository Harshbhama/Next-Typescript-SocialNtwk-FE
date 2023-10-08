import React, {useEffect, useRef, useState} from "react";
import {
  Button,
	Input,
  Textarea
} from "@material-tailwind/react";
import variables from "../styles/form.module.scss"
import { FileUpload } from "./FileUpload";
import { uploadStoryThunk } from "@/store/reducers/getStoriesReducer";
import { addStoryTrigger } from "@/store/reducers/addStorySlice";
import store from "@/store/store";
export const AddStoryForm = () => {
  const [file, setFile] = useState<any>("");
  const [inputProps, setInput] = useState({
    description: "",
    title: ""
  })
  const onSubmit = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    if(!file){
      alert("PLease upload file")
    }
    let data = {
      formData: formData ,
      inputProps: inputProps
    }
    store.dispatch(uploadStoryThunk(data)).then(res => {
      if(res?.payload?.data?.error === false){
          // alert("File uploaded successfully");
          store.dispatch(addStoryTrigger(false));
      }else{
        alert("Some error while uploading")
      }
    })
  }
  return(
    <div>
      <form className="mt-8 mb-2">
				<div className={`mb-4 ${variables.formTag}`}>
            <Input size="lg" label="Title" crossOrigin="" containerProps={{ className: variables.description }}
             onChange={(e) => setInput({
              ...inputProps, title: e.target.value
            })}
            /> 
            <Textarea label="Description" 
            onChange={(e) => setInput({
              ...inputProps, description: e.target.value
            })}
            />
            <div className="flex flex-row justify-between">
              <FileUpload fileProps={{name: "Upload Snap !", className: "w-2/4"}} setFile={setFile}/>
              <Button onClick={onSubmit}> Submit</Button>
            </div>
            {file && <p>{file.name}</p>}
				</div>
			</form>
    </div>
  )
}