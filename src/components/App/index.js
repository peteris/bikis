import React, { Component } from 'react';
import { provideHooks } from 'redial';

import {
  asyncFetchInstagramPhotos,
  asyncFetchCyclingData,
  asyncFetchSiteContent,
} from '../../actions';

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
        <div className="cover top-0 left-0 right-0 bottom-0 fixed" />
        <div className="app h-full">{this.props.children}</div>
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
