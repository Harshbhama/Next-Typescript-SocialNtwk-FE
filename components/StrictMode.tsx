import React from "react";

interface ArrayInterface {
  arr: (number|string)[]
}

const StrictMode  = ({arr}: ArrayInterface) => {
  let temp = [...arr];
  // if we declare as temp = arr , it will show as error, due to Strict Mode, because component re renders in strict mode.
  temp.push('4');
  return(
    <div>
      <ul>
        {temp.map((val) => {
          return(
            <li>{val}</li>
          )
        })}
      </ul>
    </div>
  )
}
export default StrictMode;