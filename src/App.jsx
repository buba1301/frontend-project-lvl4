import React from 'react';
import { useDispatch } from 'react-redux';
import ChannelsBox from './components/ChannelsBox';
import Dialog from './components/Dialog';
import Header from './components/Header';
import Form from './components/LoginForm';
import MessageInput from './components/MessageInput';

import { actions } from './slices';
import { useCookies } from './utils/user';

import './index.css';

const App = () => {
  const sessionUser = useCookies.get();

  const dispatch = useDispatch();

  if (sessionUser) {
    dispatch(actions.setCurrentUser(sessionUser));
  }

  return (
    <div className="container">
      <Header />
      <div className="main">
        <div className="chats">
          <ChannelsBox />
        </div>
        <div className="dialogWrap">
          <Dialog />
          <MessageInput />
        </div>
      </div>
      {!sessionUser && <Form />}
    </div>
  );
};

export default App;
