import React from 'react';
import Dialog from './components/Dialog';
import Header from './components/Header';
import MessageInput from './components/MessageInput';

import './index.css';

const App = () => (
  <div className="container">
    <Header />
    <Dialog />
    <MessageInput />
  </div>
);

export default App;
