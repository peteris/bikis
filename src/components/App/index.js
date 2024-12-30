import React, { Component } from 'react';
import { provideHooks } from 'redial';

import {
  asyncFetchInstagramPhotos,
  asyncFetchCyclingData,
  asyncFetchSiteContent,
} from '../../actions';

import styles from './styles.module.css';

const GREETING = `
s▄▄▄▄xxw▄▄▄,                                                                   
▓▓▓     ╙▓▓▌                                                                  
▀▓▓      █▓▓  ▄▄▄▄▄▄▄▄µ  ▄▄▄▄▄▄▄▄▄▄ :▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄,     ▄▄▄▄▄    ▄▄▄▄    
 ▐▓▓      ▓▓▓  ▀▓▓▌▀▀▀▓▄ ^▓█▀▀▓▓▀▀█▓ ^▀▓▓▀▀▀█▓  \`▀▓▓▀└▀▀▓▄   \`▀▓▓█   ,▓█└▀▓▌  
╓▓▓▀,,;▄▄█▀└   ▄▓▀  ▄ └  .   ▓▓¬   ^  ▓▓¬ ╓µ .   ▓▓\`   ▄▓▀    ▄▓▀   ╫▓▌,  ▀~  
▓▓▌ └.,        ▓▓▀▀▓▌       ╟▓.      ▐▓▀▀▀▓     ▐▓▓▀▓▓▌└     ▐▓▌     ▀▀▓▓▓▄   
└▓▓▄           ╙▓▄  ▀▄       █▓⌐      █▓⌐ └█     ▀▓▄ ▀▓▓      ▀▓▄       └▀▓▓  
 ▐▓▓\`╒▄▄▄▄wx▄▄▄▄▄▓▌    ▄      ▓▓       ▓▓    ,▄   ▓▓   ▀▓▄     ▓▓\`   ▓\`    ▓▓ 
@▓▓▓▓▓▓µ▓▓▓    ▀▓▓▓▓▄▄▓▓▌    ▄▓▓▓▄    ▄▓▓▓▄▄▄▓▓¬ ┌▓▓▓▄   ▀▓▓▄ ╒▄▓▓▄   ▀█▄▄▄█▀  
       ▐▓▓     ▓▓▓                                  ,,                        
       ▐▓▓▌   ,▓▓▀    ^▀▓▓▀  └▀▓▓▀  ▐▓▀▀  └▀▓▓▀   ▄▓▀▀▀▓─                     
       ▄▓▓▀▀▀█▓▓▄▄     ╓▓▀    ▄▓▀,▄▀▀      ▄▓▀   ▐▓▄   ▀                      
      ▐▓▓~     ▐▓▓▌   ╒▓▌    ▐▓█▓▓,       ▐▓▌    '▀█▓▓▄                       
      ▐▓▓      ▐▓▓▌   ▐▓▌    ▐▓▌ ▀▓▓      ▐▓▌   ╓▄   \`▓▓                      
       ▀▓▓µ     ▓▓▓    ╙▓▄    ▀▓▄  ▀▓▄     ▀▓▄   ▓▄    ▀▓                     
     Å▀▀▀▀▀▀▀▀▀▀\`.    ¥▀▀▀L  M▀▀▀L  ^██▀─ M▀▀▀L  \`▀█RR▀▀.                     
`;

class App extends Component {
  render() {
    return (
      <div>
        <div className={styles.cover} />
        <div className={styles.app}>{this.props.children}</div>
      </div>
    );
  }

  componentDidMount() {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    console.log(`%c ${GREETING}`, 'color: lime');
  }
}

const hooks = {
  fetch: ({ dispatch }) => dispatch(asyncFetchSiteContent()),
  defer: ({ dispatch }) => [
    dispatch(asyncFetchInstagramPhotos()),
    dispatch(asyncFetchCyclingData()),
  ],
};

export default provideHooks(hooks)(App);
