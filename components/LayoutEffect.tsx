import React, { useEffect, useLayoutEffect, useState } from "react";

const LayoutEffect = () => {
  const [stateEffect, setState] = useState(false);
  const [stateUseEffect, setUseEffectState] = useState(false);
  useEffect(() => {
    //console.log("In useEffect")
    setState(true);

  },[])
  useLayoutEffect(() => {
    //console.log("In use Layout Effect")
    setUseEffectState(true);
  
  },[])
  //console.log("stateEffect", stateEffect);
  //console.log("stateUseEffect", stateUseEffect);

  return(
    <>
      Layout effect
    </>
  )
}
export default LayoutEffect;