import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '@reduxStore/configureStore';

const store = configureStore();

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}
export default MyApp;
