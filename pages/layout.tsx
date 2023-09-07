import React from "react";
import { ComplexNavbar } from "@/components/Navbar/navbar";
export const Layout = ({children}: any) => {
  console.log("In Layout")
   return(
    <>
      <ComplexNavbar />
      {children}
      <div>Footer</div>
    </>
   ) 
}