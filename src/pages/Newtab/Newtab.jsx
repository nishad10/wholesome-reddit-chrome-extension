import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { Wrapper } from './NewtabStyled.js';
import { SubRedditListContext } from '../SubredditListContext.jsx';

const Newtab = () => {
  const [urlList, setUrlList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [tabID, setTabID] = useState(0);
  const [state, dispatch] = useContext(SubRedditListContext);
  console.log(state.subredditList);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    setTabID(tabs[0].id);
  });
  const getRedditData = useCallback(async () => {
    const redditData = await axios.get(
      `https://www.reddit.com/r/${
        state.subredditListCHECKED[
          Math.floor(Math.random() * (state.subredditListCHECKED.length - 1))
        ]
      }/.json?count=15`
    );
    const items = redditData?.data?.data?.children;
    const urlList = items
      .map((item) => item.data.url ?? '')
      .filter(
        (item) =>
          item !== '' &&
          !item.includes('gfycat') &&
          /\.(jpe?g|tiff?|png|webp|bmp)$/i.test(item)
      );
    setUrlList(urlList);
  }, [state.subredditList]);
  useEffect(() => {
    if (tabID !== 0) {
      getRedditData();
    }
  }, [getRedditData, tabID]);
  const rand = Math.floor(Math.random() * (urlList.length - 1));
  return (
    <Wrapper className="App">
      <header className="App-header">
        {
          <img
            style={
              loaded
                ? {
                    width: '60vh',
                    height: 'auto',
                    borderRadius: '25px',
                  }
                : { display: 'none' }
            }
            alt="⊙▂⊙"
            src={urlList[urlList.length === 1 ? 0 : rand]}
            onLoad={() => setLoaded(true)}
          />
        }
      </header>
    </Wrapper>
  );
};

export default Newtab;
