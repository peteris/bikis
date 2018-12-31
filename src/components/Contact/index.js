import React from 'react';
import PropTypes from 'prop-types';

import DistortedTextContainer from './../../containers/DistortedTextContainer';
import { verticalText } from './../../utils/format';

const Contact = ({ className, children }) => (
  <div className={className}>
    <DistortedTextContainer
      id="contact"
      className="caps medium-text text-sayhello center inline-block lh2"
      turbulence={0.001}
      content={verticalText('Say Hello')}
    />
    <br />
    <div className="mt3 font-alternative inline-block lh3 h4">{children}</div>
  </div>
);

Contact.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Contact;
