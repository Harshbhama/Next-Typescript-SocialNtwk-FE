import App from "next/app";
import React from "react";
import {Provider} from 'react-redux';
import {createWrapper} from 'next-redux-wrapper'
import store from "@/store/store";
import { Layout } from "../components/layout";
import '@/styles/globals.css';
import help from "@/helpers/help";
class MyApp extends App{
  
  render(){
    // help()
    const {Component, pageProps} = this.props;
    return(
      <Provider store={store}>
          <Layout> <Component {...pageProps}></Component></Layout>
      </Provider>

    )
  }
}

const makestore = () => store;
const wrapper = createWrapper(makestore)

export default wrapper.withRedux(MyApp);