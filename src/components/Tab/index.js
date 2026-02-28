import React from 'react';
import PropTypes from 'prop-types';

const Tab = ({ width = 1 }) => (
  <span>
    {Array(width)
      .fill('')
      .map((tab, i) => (
        <span key={i}>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      ))}
  </span>
);

Tab.propTypes = {
  width: PropTypes.number,
};

export default Tab;
