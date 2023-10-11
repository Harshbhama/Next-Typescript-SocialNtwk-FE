import React, { useEffect, useState } from "react";
const RefComponent1 = () => {
  const [state, setState] = useState(0);
  let inputReference: any = React.useRef(null);

  useEffect(() => {
   
      inputReference.current.focus()
    // ref.current.input.onFocus=true
  },[])
  return(
    <>
      <input ref={inputReference}/>
    </>
  )
}
export default RefComponent1;