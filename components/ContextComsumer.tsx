import React, {useContext, useEffect} from "react";
import { TestContext } from "./ContextApi";


const ContextConsumer = () => {
  const test: any = useContext(TestContext);

  useEffect(() => {
    test?.dispatch({type: "ADD"})
  },[])
  return(
   <>
    {test?.state?.age}
   </>
  )
}
export default ContextConsumer;