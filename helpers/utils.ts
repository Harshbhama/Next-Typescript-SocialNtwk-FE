interface likedObj {
  error: null | String,
  story_id: number
}
import Router from "next/router";
export const trimText = (text: String, length: number) => {
  return (text.slice(0, length) + '...')
}
export const checkForLoginPage = (path: String) => {
  if (path && path !== '/') {
    return true
  }
}
export const logoutMethod = () => {
  localStorage.removeItem("loginDetails");
  localStorage.removeItem("userId");
  Router.push("/");
}
export const onUploadSnap = (ref: any) => {
  ref.current.click()
}
export const getPaginationNumbers = (totalData: number, pageData: number) => {
  return Math.ceil(totalData/pageData);
}