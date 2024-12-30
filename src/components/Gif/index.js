'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';

const Gif = ({ src, className }) => {
  const router = useRouter();
  
  return (
    <span className={classNames(
      className,
      'fixed w-full h-full flex items-center justify-center inset-0'
    )}>
      <img
        src={src}
        className="w-auto h-auto max-w-full max-h-full opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => router.push('/')}
        alt="Animated GIF"
      />
      <span className="absolute inset-0" />
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
