'use client';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Gif = ({ src, className }) => { 
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
    </span>
  );
};

Gif.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export const CloudGif = (props) => (
  <Gif {...props} src="/img/cloud.gif" />
);

export const AiGif = (props) => (
  <Gif {...props} src="/img/ai.gif" />
);

export const WeirdGif = (props) => (
  <Gif {...props} src="/img/future.gif" />
);

export const TechnologyGif = (props) => (
  <Gif {...props} src="/img/technology.gif" />
);

export default Gif;
