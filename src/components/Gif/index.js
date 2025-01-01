'use client';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';

const Gif = ({ src, className, children }) => { 
  return (
    <span className={classNames(
      className,
      'component gif fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
    )}>
      <img
        src={src}
        alt="Animated GIF"
        className="gif-image"
      />
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
    <Helmet title="☁️" />
  </Gif>
);

export const AiGif = (props) => (
  <Gif {...props} src="/img/ai.gif">
    <Helmet title="✨" />
  </Gif>
);

export const WeirdGif = (props) => (
  <Gif {...props} src="/img/future.gif">
    <Helmet title="🔮" />
  </Gif>
);

export const TechnologyGif = (props) => (
  <Gif {...props} src="/img/technology.gif">
    <Helmet title="💻" />
  </Gif>
);

export default Gif;
