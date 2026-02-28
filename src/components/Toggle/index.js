import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


export default class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  onToggle(hover) {
    if (this.props.disabled) {
      return;
    }

    this.setState({ hover });
  }

  componentDidUpdate(prevProps, prevState) {
    const { url, handleToggle, active } = this.props;
    const { hover } = this.state;

    if (prevState.hover !== hover) {
      handleToggle(!active, url);
    }
  }

  render() {
    const { label, active, disabled, url } = this.props;

    const className = classNames('toggle inline-block', {
      'toggle-hover': active,
      'transition-transform': !disabled,
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

    const isExternal = url.match(/^http/);

    return isExternal ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames('link transition-transform')}
      >
        {label}
      </a>
    ) : (
      <div
        role="button"
        tabIndex={0}
        style={active ? { zIndex: 12 } : {}}
        onMouseEnter={() => { this.onToggle(true); }}
        onMouseLeave={() => { this.onToggle(false); }}
        onClick={() => this.onToggle(!this.state.hover)}
        onKeyPress={(e) => e.key === 'Enter' && this.onToggle(!this.state.hover)}
        className="relative inline-block"
      >
        {content}
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
