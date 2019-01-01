import React from 'react';
import Router from 'next/router';
import App, { Container } from 'next/app';
import classNames from 'classnames';
import { Provider } from 'react-redux';

import { isSafari, isIE } from './../src/utils/env';
import configureStore from './../src/store';
import AppContainer from './../src/components/App';
import HomePageContainer from './../src/containers/HomePageContainer';

const store = configureStore(
  typeof window !== 'undefined' ? window.__data : {}
);

export default class MyApp extends App {
  state = {
    fontsLoaded: false,
    svgFilters: true,
    animate: false,
  };

  componentDidMount() {
    const FontFaceObserver = require('fontfaceobserver');
    const fontObserver = new FontFaceObserver('Vollkorn', {});

    fontObserver.check().then(
      () => {
        this.setState({
          svgFilters: !(isSafari() || isIE()),
          fontsLoaded: true,
          animate: true,
        });
        setTimeout(() => this.setState({ animate: false }), 500);
      },
      () => this.setState({ fontsLoaded: false })
    );

    Router.onRouteChangeComplete = (url) => {
      // Track event
      typeof window !== 'undefined' &&
        'ga' in window &&
        window.ga('send', 'pageview', url);
    };
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    const { svgFilters, fontsLoaded, animate } = this.state;

    const className = classNames('body', {
      'no-svgfilters': !svgFilters,
      'no-webfonts': !fontsLoaded,
      'js-fonts-loaded': fontsLoaded,
      'animate-in': animate,
    });

    return (
      <Container>
        <div className={className}>
          <Provider store={store}>
            <AppContainer>
              <HomePageContainer>
                <Component {...pageProps} />
              </HomePageContainer>
            </AppContainer>
          </Provider>
        </div>
      </Container>
    );
  }
}
