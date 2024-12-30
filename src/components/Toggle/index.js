import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import classNames from 'classnames';
import styles from './styles.module.css';

import { isTouchDevice } from './../../utils/env';

export default class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      hover: false,
      offset: 0,
    };

    this.setOffset = this.setOffset.bind(this);
    this.resetOffset = this.resetOffset.bind(this);
  }

  resetOffset() {
    this.setState({
      dragging: false,
      hover: false,
      offset: 0,
    });

    this.props.handleRelease();
  }

  setOffset(e, ui) {
    this.setState({
      dragging: true,
      offset: this.state.offset + (ui.x - ui.lastX),
    });
  }

  onToggle(hover) {
    if (this.state.dragging || this.props.disabled) {
      return;
    }

    this.setState({
      hover,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { url, handleOffset, handleToggle, active } = this.props;
    const { hover, offset } = this.state;

    if (prevState.offset !== offset) {
      handleOffset(offset);
    }

    if (prevState.hover !== hover) {
      handleToggle(!active, url);
    }
  }

  render() {
    const { label, active, disabled, url } = this.props;
    const position = this.state.offset ? null : { x: 0, y: 0 };

    const className = classNames(styles.toggle, 'toggle inline-block', {
      [styles.toggleHover]: active,
      [styles.transitionTransform]: !disabled,
    });

    const labelContent = label
      .split('')
      .map((letter, i) => (
        <span
          key={i}
          className="inline-block"
          style={{ animationDelay: `${i * 50}ms` }}
          dangerouslySetInnerHTML={{ __html: letter.replace(' ', '&nbsp;') }}
        />
      ));

    const content = (
      <span className="inline-block">
        <span className={className}>{labelContent}</span>
      </span>
    );

    const isTouch = isTouchDevice();
    const isExternal = url.match(/^http/);

    return isExternal ? (
      <a href={url} target="_blank" rel="noopener noreferrer" className={classNames(styles.link, styles.transitionTransform)}>
        {label}
      </a>
    ) : (
      <div
        role="button"
        tabIndex={0}
        style={active ? { zIndex: 12 } : {  }}
        onMouseEnter={() => {
          this.onToggle(true);
        }}
        onMouseLeave={() => {
          this.onToggle(false);
        }}
        onClick={() => this.onToggle(!this.state.hover)}
        onKeyPress={(e) => e.key === 'Enter' && this.onToggle(!this.state.hover)}
        className="relative inline-block"
      >
        {isTouch ? (
          content
        ) : (
          <Draggable
            onDrag={this.setOffset}
            onStop={this.resetOffset}
            position={position}
          >
            {content}
          </Draggable>
        )}
      </div>
    );
  }
}

Toggle.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  handleToggle: PropTypes.func,
  handleOffset: PropTypes.func,
  handleRelease: PropTypes.func,
};
