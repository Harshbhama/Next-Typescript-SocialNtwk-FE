import React, { useEffect, useState } from "react";
import ErrorBoundaries from "@/components/ErrorBoundary";
import StrictMode from "@/components/StrictMode";
import MemoComponent from "@/components/MemoComponent";
import RefComponent1 from "@/components/RefComponent1";
import LayoutEffect from "@/components/LayoutEffect";
import ContextApi from "@/components/ContextApi";
import Graphqlcall from "@/components/Graphqlcall";
import RestApi from "@/components/RestApi";
const Test = (props: any) => {
  const [state, setState] = useState(0);

  return (
    <div>
      <ErrorBoundaries fallback={<p>Here...</p>}>
        <div>Helllo</div>
        <StrictMode arr={['1','2','3']} />
        <button onClick={() => setState(state => state +1)}>Click</button>
        {state}
        <MemoComponent />
        <RefComponent1 />
        <LayoutEffect />
        <ContextApi />
        <Graphqlcall />
        <RestApi />
      </ErrorBoundaries>
    </div>
  )
}
export default Test;