import React from "react";
class ErrorBoundaries extends React.Component<any, {hasError: Boolean}>{
  constructor(props: any){
    super(props);
    this.state = {hasError: false}
  }
  static getDerivedStateFromError(error: any){
    return {hasError: true}
    // Used here for the fallback UI
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log("error", error)
    console.log("errorInfo", errorInfo)
    // Used here for the logging systems
  }

  render() {
    if(this.state.hasError){
      return this.props.fallback;
    }else{
      return this.props.children;
    }
  }
}
export default ErrorBoundaries;