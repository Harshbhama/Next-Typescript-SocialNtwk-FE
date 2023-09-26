import React from "react";
import { ComplexNavbar } from "@/components/Navbar/navbar";
import { DefaultSidebar } from "@/components/Sidebar/sideBar";
import { useRouter } from 'next/router'
import { checkForLoginPage } from "@/helpers/utils";
export const Layout = ({children}: any) => {
  //console.log("In Layout")
  const {
    asPath,        // the value: "/question/how-do-you-get-the-current-url-in-nextjs/"
    pathname,   // the value: "/question/[slug]"
  } = useRouter();

  const MemoizedSidebar = React.memo(DefaultSidebar)
   return(
    <>
      <ComplexNavbar />
      {checkForLoginPage(asPath) ? <MemoizedSidebar children={children}/> : <div>{children}</div>}
      <div>Footer</div>
    </>
   ) 
}