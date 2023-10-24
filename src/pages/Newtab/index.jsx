import React from 'react';
import { render } from 'react-dom';

import Newtab from './Newtab';
import { SubRedditListContextProvider } from '../SubredditListContext';
import './index.css';

render(
  <SubRedditListContextProvider>
    <Newtab />
  </SubRedditListContextProvider>,
  window.document.querySelector('#app-container')
);
