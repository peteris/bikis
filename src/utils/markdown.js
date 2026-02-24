import * as R from 'ramda';
import SimpleMarkdown from 'simple-markdown';

export const parseMd = R.compose(SimpleMarkdown.defaultReactOutput, SimpleMarkdown.defaultBlockParse);
