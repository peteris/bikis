import SimpleMarkdown from 'simple-markdown';

// Patch for React 19 compatibility: simple-markdown uses the old
// Symbol.for('react.element') internally. React 19 changed this to
// 'react.transitional.element'. Override reactElement to use the correct symbol.
const TYPE_SYMBOL =
  (typeof Symbol === 'function' &&
    Symbol.for &&
    (Symbol.for('react.transitional.element') || Symbol.for('react.element'))) ||
  0xeac7;

SimpleMarkdown.reactElement = function (type, key, props) {
  return {
    $$typeof: TYPE_SYMBOL,
    type: type,
    key: key == null ? undefined : key,
    ref: null,
    props: props,
    _owner: null,
  };
};

export default SimpleMarkdown;
