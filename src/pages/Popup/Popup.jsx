import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';
import { SubRedditListContext } from '../SubredditListContext';
import { Wrapper, List } from './PopupStyled';

const Popup = () => {
  const [state, dispatch] = useContext(SubRedditListContext);
  const [checked, setChecked] = useState(state.subredditListCHECKED);
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
  useEffect(() => {
    dispatch({
      type: 'SET_LIST',
      payload: { id: Math.random() * 1000, checked },
    });
  }, [checked, dispatch]);
  console.log(state);
  return (
    <Wrapper className="App">
      <header className="App-header">
        <div className="title">Your CheckList:</div>
        <List className="list-container">
          {state.subredditListDEFAULT?.map((item, index) => (
            <div key={index}>
              <input
                value={item}
                type="checkbox"
                checked={checked.indexOf(item) !== -1}
                onChange={handleCheck}
              />
              {item}
            </div>
          ))}
        </List>
      </header>
    </Wrapper>
  );
};

export default Popup;
