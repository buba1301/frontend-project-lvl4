import React from 'react';
import { useSelector } from 'react-redux';
import ChannelsBox from './components/ChannelsBox';
import Dialog from './components/Dialog';
import Header from './components/Header';
import Form from './components/LoginForm';
import MessageInput from './components/MessageInput';

import Context from './context';
import { useCookies } from './utils/user';

import './index.css';

const App = () => {
  const sessionUser = useCookies.get();

  const currentUser = useSelector((state) => state.currentUser);

  return (
    <div className="container">
      <Context.Provider value={currentUser}>
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
      </Context.Provider>
      {!sessionUser && <Form />}
    </div>
  );
};

export default App;
