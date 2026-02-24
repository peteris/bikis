import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimpleMarkdown from 'simple-markdown';
import classNames from 'classnames';
import * as R from 'ramda';

import assignToEmpty from './../../utils/assign';
import Toggle from './../Toggle';
import DistortedTextContainer from './../../containers/DistortedTextContainer';

class Bio extends Component {
  handleTap = () => {
    const { handleToggle } = this.props;
    handleToggle(false);
  };

  render() {
    const {
      className = '',
      content,
      handleToggle,
      handleRelease,
      handleOffset,
      dragging,
      activeToggle,
    } = this.props;
    const toggleProps = { handleToggle, handleRelease, handleOffset };

    const isToggleDisabled = (url) => dragging && activeToggle && url !== activeToggle;
    const isToggleActive = (url) => url === activeToggle;

    const rules = getRules(
      SimpleMarkdown.defaultRules,
      isToggleDisabled,
      isToggleActive,
      toggleProps,
    );
    const reactContent = parseMarkdown(content, rules);

    const coverClassName = classNames('bio-cover transition-opacity fixed top-0 left-0 right-0', {
      'pointer-events-none': activeToggle === '/',
    });

    return (
      <div className={classNames('lh3 mt0 h1', className)}>
        {reactContent}
        <div
          className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
          style={{ zIndex: 11 }}
        >
          {this.props.children}
        </div>
        <div
          role="button"
          tabIndex={0}
          className={coverClassName}
          onClick={this.handleTap}
          onKeyPress={(e) => e.key === 'Enter' && this.handleTap()}
          style={{ cursor: 'pointer' }}
        />
      </div>
    );
  }
}

Bio.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string.isRequired,
  handleRelease: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleOffset: PropTypes.func.isRequired,
  activeToggle: PropTypes.string,
  dragging: PropTypes.bool,
};

/* Helpers */

const getRules = (defaultRules, isToggleDisabled, isToggleActive, toggleProps) =>
  assignToEmpty(defaultRules, {
    em: assignToEmpty(defaultRules.em, {
      match: (source) => /^\*([\s\S]+?)\*/.exec(source),
      react: (node, recurseOutput, state) => {
        const { key, ...restState } = state;
        return <span key={key} {...restState}>{recurseOutput(node.content)}</span>;
      },
    }),
    link: assignToEmpty(defaultRules.link, {
      react: (node, output, state) => {
        const { key, ...restState } = state;
        // Extract text string from content nodes (Toggle requires a string label)
        const label = node.content.map(n => n.content || '').join('');
        const url = node.target;

        return (
          <Toggle
            key={key}
            label={label}
            url={url}
            active={isToggleActive(url)}
            disabled={isToggleDisabled(url)}
            {...restState}
            {...toggleProps}
          />
        );
      },
    }),
    u: assignToEmpty(defaultRules.u, {
      react: (node, output, state) => {
        const { key, ...restState } = state;
        return (
          <DistortedTextContainer
            key={key}
            id="name"
            className="large-text text-pb block center right pointer-events-none"
            turbulence={0.005}
            animated={false}
            content={R.head(output(node.content, state)).replace(' ', '<br />')}
            {...restState}
          />
        );
      },
    }),
  });

const parseMarkdown = (src, rules) => {
  const parser = SimpleMarkdown.parserFor(rules);
  const reactOutput = SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, 'react'));
  const parseTree = parser && parser(src + '\n\n', { inline: true });

  return reactOutput && reactOutput(parseTree);
};

export default Bio;
