import React, {useEffect, useRef, useState} from "react";
import {
  Button,
	Input,
  Textarea
} from "@material-tailwind/react";
import variables from "../styles/form.module.scss"
import { FileUpload } from "./FileUpload";
export const AddStoryForm = () => {
  const ref = useRef(null);
  const [file, setFile] = useState<any>("");
  const [inputProps, setInput] = useState({
    description: "",
    title: ""
  })
  const onSubmit = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    console.log("formData",formData)
    console.log("inputProps",inputProps)
    if(!file){
      alert("PLease upload file")
    }
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