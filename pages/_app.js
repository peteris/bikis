import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { Provider } from 'react-redux';
import FontFaceObserver from 'fontfaceobserver';

import { isSafari, isIE } from '../src/utils/env';
import createStore from '../src/store';
import AppContainer from '../src/components/App';
import HomePageContainer from '../src/containers/HomePageContainer';

// Global styles
import 'normalize.css/normalize.css';
import 'basscss/css/basscss.min.css';
import 'basscss-responsive-margin/css/responsive-margin.css';
import 'basscss-responsive-padding/css/responsive-padding.css';
import '../src/styles/globals.css';

const store = createStore(typeof window !== 'undefined' ? window.__data : {});

export default function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({
    fontsLoaded: false,
    svgFilters: true,
    animate: false,
  });

  const router = useRouter();

  useEffect(() => {
    const fontObserver = new FontFaceObserver('Vollkorn');

    fontObserver.load().then(
      () => {
        setState((prev) => ({
          ...prev,
          svgFilters: !(isSafari() || isIE()),
          fontsLoaded: true,
          animate: true,
        }));
        setTimeout(() => setState((prev) => ({ ...prev, animate: false })), 500);
      },
      () => setState((prev) => ({ ...prev, fontsLoaded: false })),
    );

    // Track page views
    const handleRouteChange = (url) => {
      if (typeof window !== 'undefined' && 'ga' in window) {
        window.ga('send', 'pageview', url);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  const { svgFilters, fontsLoaded, animate } = state;

  const className = classNames('body', {
    'no-svgfilters': !svgFilters,
    'no-webfonts': !fontsLoaded,
    'js-fonts-loaded': fontsLoaded,
    'animate-in': animate,
  });

  return (
    <Provider store={store}>
      <div className={className}>
        <AppContainer>
          <HomePageContainer>
            <Component {...pageProps} />
          </HomePageContainer>
        </AppContainer>
      </div>
    </Provider>
  );
}

export const metadata = {
  title: 'Peteris',
  description: 'Peteris',
  icons: {
    icon: '/favicon.ico',
  },
};
