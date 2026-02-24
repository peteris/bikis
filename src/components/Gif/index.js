import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Head from 'next/head';

const Gif = ({ src, className, children }) => {
  return (
    <span
      className={classNames(
        className,
        'component gif fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
      )}
    >
      <img src={src} alt="Animated GIF" className="gif-image" />
      <span className="bg absolute inset-0" />
      {children}
    </span>
  );
};

Gif.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export const CloudGif = (props) => (
  <Gif {...props} src="/img/cloud.gif">
    <Head><title>☁️</title></Head>
  </Gif>
);

export const AiGif = (props) => (
  <Gif {...props} src="/img/ai.gif">
    <Head><title>✨</title></Head>
  </Gif>
);

export const WeirdGif = (props) => (
  <Gif {...props} src="/img/future.gif">
    <Head><title>🔮</title></Head>
  </Gif>
);

export const TechnologyGif = (props) => (
  <Gif {...props} src="/img/technology.gif">
    <Head><title>💻</title></Head>
  </Gif>
);

export default Gif;
