import React from 'react';
import Dialog from './components/Dialog';
import Header from './components/Header';
import MessageInput from './components/MessageInput';

import './index.css';

const App = () => (
  <div className="container">
    <Header />
    <div className="main">
      <div className="chats"></div>
      <div className="dialogWrap">
        <Dialog />
        <MessageInput />
      </div>
    </div>
  </div>
);

export default App;
