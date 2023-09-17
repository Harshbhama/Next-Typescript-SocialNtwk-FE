export const trimText = (text:String, length: number) => {
    return(text.slice(0,length) + '...')
}
export const checkForLoginPage = (path: String) => {
    if(path && path !== '/'){
        return true
    }
}