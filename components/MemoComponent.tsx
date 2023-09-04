import React, { useEffect, memo } from "react";
const MemoComponent = () => {
  console.log("In memo component");
  useEffect(() => {
    console.log("In memo component useEffect");
  },[])
 
  return(
    <div>Memo</div>
  )
}

function moviePropsAreEqual(prevProps: any, nextProps: any) {
 console.log(prevProps)
 console.log(nextProps)
 return true
}
export default memo(MemoComponent, moviePropsAreEqual);