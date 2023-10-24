import React, { createContext, useReducer } from 'react';

export const SubRedditListContext = createContext();

const initialState = {
  subredditListDEFAULT: [
    'wholesomememes',
    'Eyebleach',
    'aww',
    'rarepuppers',
    'tuckedinkitties',
  ],
  subredditListCHECKED: [
    'wholesomememes',
    'Eyebleach',
    'aww',
    'rarepuppers',
    'tuckedinkitties',
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        subredditListDEFAULT: [...state.subredditListDEFAULT, action.payload],
      };
    case 'DELETE_ITEM':
      return {
        subredditListDEFAULT: state.subredditListDEFAULT.filter(
          (i) => i !== action.payload
        ),
      };
    case 'SET_CHECKED':
      return { subredditListCHECKED: action.payload };
    default:
      return {
        state,
      };
  }
};

export const SubRedditListContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SubRedditListContext.Provider value={[state, dispatch]}>
      {props.children}
    </SubRedditListContext.Provider>
  );
};
