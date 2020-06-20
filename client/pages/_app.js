import App from 'next/app';
import React from 'react';
import NextNProgress from '@components/layouts/NextNProgress';

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
      <>
        <NextNProgress />
        <Component {...pageProps} />
      </>
    );
  }
}
export default MyApp;
