import React from 'react';
import PropTypes from 'prop-types';

const Tab = ({ width }) => (
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

Tab.defaultProps = {
  width: 1,
};

export default Tab;
