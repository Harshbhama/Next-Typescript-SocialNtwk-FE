

import { useEffect, useLayoutEffect, useState } from "react";
import variables from "../styles/login.module.scss";
import { LoginForm } from "@/components/LoginForm";
import Router from "next/router";
export default function Home() {
  const [login, setStorage] = useState(false);
  const [mount, setMount] = useState(false);
  useLayoutEffect(() => {
    if(localStorage.getItem("loginDetails")){
      Router.push('/landing')
    }else{
      setMount(true);
    }
  },[login])
  return (
    <div className={`container  ${variables.loginPage}`}>
      {mount && <LoginForm setStorage={setStorage}/>}
      {/* <div className="columns-1 md:columns-2">
        <p>First</p>
        <p>Second</p>
      </div> */}
    </div>
  )
}
