import React, {createContext, useReducer} from "react";
import ContextConsumer from "./ContextComsumer";
export const TestContext = createContext({});


const reducer = (state: any, action: any) => {
 if(action.type == 'ADD'){
  return {
    age: state.age + 1
  }
 }else{
  return null
 }
}

const ContextApi = () => {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
  return(
    <>
      <TestContext.Provider value={{
        state: state,
        dispatch: dispatch
      }}>
        <ContextConsumer />
      </TestContext.Provider>
    </>
  )

}
export default ContextApi;